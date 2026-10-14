import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart3,
  BookOpen,
  CalendarCheck2,
  FileText,
  GraduationCap,
  Users2,
} from "lucide-react";

import useDocumentTitle from "../../hooks/useDocumentTitle";
import { DashboardSkeleton, EmptyState } from "../../components/ui";
import TopCoursesChart from "../../components/analytics/TopCoursesChart";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";
import { getTeacherByEmail, getTeacherDashboard } from "../../services/teacherService";

function TeacherDashboard() {
  useDocumentTitle("Teacher Dashboard");
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const teacher = await getTeacherByEmail(user.email);
        const data = await getTeacherDashboard(teacher.id);
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const metrics = useMemo(() => {
    const assignedCourses = Array.isArray(stats?.courses)
      ? stats.courses
      : Array.isArray(stats?.assignedCourses)
        ? stats.assignedCourses
        : [];

    return {
      totalCourses: stats?.totalCourses ?? assignedCourses.length,
      totalStudents: stats?.totalStudents ?? 0,
      attendanceRecords: stats?.totalAttendanceRecords ?? 0,
      marksRecords: stats?.totalMarksRecords ?? 0,
      attendanceRate: stats?.attendanceRate ?? stats?.attendancePercentage ?? 0,
      averageMarks: stats?.averageMarks ?? stats?.avgMarks ?? 0,
      assignedCourses,
      courseAnalytics: assignedCourses.map((course) => ({
        name: course?.courseName || course?.name || "Course",
        students: course?.studentCount ?? course?.totalStudents ?? 0,
      })),
    };
  }, [stats]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Teacher workspace" title="Teacher Dashboard" description="A focused overview of your courses, attendance, and marks.">
        <Button variant="secondary" leftIcon={FileText} onClick={() => navigate("/teacher/courses")}>View Courses</Button>
        <Button leftIcon={CalendarCheck2} onClick={() => navigate("/attendance/mark")}>Mark Attendance</Button>
      </PageHeader>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Assigned Courses" value={metrics.totalCourses} icon={BookOpen} description="Courses in your roster" trend="up" trendLabel="Active" />
        <StatCard label="Students" value={metrics.totalStudents} icon={Users2} description="Students under your care" trend="up" trendLabel="Growing" />
        <StatCard label="Attendance Records" value={metrics.attendanceRecords} icon={CalendarCheck2} description="Attendance entries recorded" trend="neutral" trendLabel="Updated" />
        <StatCard label="Marks Records" value={metrics.marksRecords} icon={GraduationCap} description="Marks submissions in progress" trend="up" trendLabel="On track" />
      </motion.div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle>Assigned Courses</CardTitle>
                <CardDescription>Keep an eye on the courses you are actively teaching.</CardDescription>
              </div>
              <Badge variant="brand" dot>Live</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {metrics.assignedCourses.length > 0 ? metrics.assignedCourses.map((course, index) => (
              <button
                key={`${course?.courseName || course?.name || "course"}-${index}`}
                type="button"
                onClick={() => course?.id && navigate(`/teacher/course/${course.id}`)}
                className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-left transition hover:border-brand-200 hover:bg-brand-50/50"
              >
                <div>
                  <p className="font-medium text-slate-800">{course?.courseName || course?.name || "Course"}</p>
                  <p className="text-sm text-slate-500">{course?.studentCount ?? course?.totalStudents ?? 0} learners enrolled</p>
                </div>
                <Badge variant="success">Open</Badge>
              </button>
            )) : (
              <EmptyState
                inline
                icon={BookOpen}
                title="No courses assigned"
                description="Your assigned courses will appear here once they are available."
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Summary</CardTitle>
            <CardDescription>How your class participation is tracking.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
              <p className="text-sm font-medium text-slate-500">Attendance rate</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{metrics.attendanceRate}%</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
              <p className="text-sm font-medium text-slate-500">Average marks</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{metrics.averageMarks.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Course Analytics</CardTitle>
            <CardDescription>Student distribution across your active courses.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <TopCoursesChart courses={metrics.courseAnalytics.map((course) => ({ courseName: course.name, totalStudents: course.students }))} title="Course analytics" description="Learner distribution by course" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Move quickly between the most-used teaching pages.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <Button variant="secondary" leftIcon={BookOpen} onClick={() => navigate("/teacher/courses")}>My Courses</Button>
            <Button variant="secondary" leftIcon={CalendarCheck2} onClick={() => navigate("/attendance/mark")}>Mark Attendance</Button>
            <Button variant="secondary" leftIcon={GraduationCap} onClick={() => navigate("/marks/entry")}>Enter Marks</Button>
            <Button variant="secondary" leftIcon={BarChart3} onClick={() => navigate("/teacher/dashboard")}>Teacher Overview</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default TeacherDashboard;