import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart3,
  CalendarCheck2,
  GraduationCap,
  TrendingUp,
  Users2,
} from "lucide-react";

import { getCourseAnalytics } from "../../services/teacherService";
import TopCoursesChart from "../../components/analytics/TopCoursesChart";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  EmptyState,
  PageHeader,
  PageHeaderSkeleton,
  StatCard,
  StatCardSkeleton,
} from "../../components/ui";

function TeacherAnalytics() {
  useDocumentTitle("Course Analytics");
  const { courseId } = useParams();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await getCourseAnalytics(courseId);
        setAnalytics(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [courseId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeaderSkeleton />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <StatCardSkeleton />
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <StatCardSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <EmptyState
        icon={BarChart3}
        title="No analytics available"
        description="Analytics data for this course is not available yet."
      />
    );
  }

  const chartData = [
    { courseName: "Students", totalStudents: analytics.studentCount ?? 0 },
    { courseName: "Avg Marks", totalStudents: Math.round(analytics.averageMarks ?? 0) },
    { courseName: "Attendance", totalStudents: Math.round(analytics.attendancePercentage ?? 0) },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Insights"
        title="Course Analytics"
        description="Performance metrics and engagement data for this course."
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <StatCard
          label="Students"
          value={analytics.studentCount}
          icon={Users2}
          description="Enrolled in this course"
          trend="up"
          trendLabel="Enrolled"
        />
        <StatCard
          label="Average Marks"
          value={analytics.averageMarks?.toFixed(2) ?? "—"}
          icon={GraduationCap}
          description="Class performance average"
          trend="up"
          trendLabel="Performance"
        />
        <StatCard
          label="Attendance"
          value={`${analytics.attendancePercentage?.toFixed(1) ?? 0}%`}
          icon={CalendarCheck2}
          description="Overall attendance rate"
          trend={
            (analytics.attendancePercentage ?? 0) >= 75 ? "up" : "down"
          }
          trendLabel={
            (analytics.attendancePercentage ?? 0) >= 75 ? "Healthy" : "Low"
          }
        />
      </motion.div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance overview</CardTitle>
            <CardDescription>Key metrics at a glance.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">Attendance rate</span>
                  <span className="font-semibold text-slate-900">
                    {analytics.attendancePercentage?.toFixed(1)}%
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-brand-600 transition-all"
                    style={{ width: `${Math.min(analytics.attendancePercentage ?? 0, 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">Average marks</span>
                  <span className="font-semibold text-slate-900">
                    {analytics.averageMarks?.toFixed(1)} / 100
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all"
                    style={{ width: `${Math.min(analytics.averageMarks ?? 0, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Metrics chart</CardTitle>
            <CardDescription>Visual breakdown of course data.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <TopCoursesChart
                courses={chartData}
                title="Course metrics"
                description="Students, marks, and attendance"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trend summary</CardTitle>
          <CardDescription>Quick interpretation of course health.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: Users2,
              label: "Enrollment",
              value: `${analytics.studentCount} students`,
              detail: "Currently enrolled",
            },
            {
              icon: TrendingUp,
              label: "Academic",
              value: `${analytics.averageMarks?.toFixed(1)} avg`,
              detail: "Class average marks",
            },
            {
              icon: CalendarCheck2,
              label: "Engagement",
              value: `${analytics.attendancePercentage?.toFixed(1)}%`,
              detail: "Attendance participation",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4"
            >
              <div className="flex items-center gap-2 text-slate-600">
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <p className="mt-2 text-xl font-semibold text-slate-900">{item.value}</p>
              <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default TeacherAnalytics;
