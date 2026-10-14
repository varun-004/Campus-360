import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  BarChart3,
  BookOpen,
  CalendarCheck2,
  FileText,
  GraduationCap,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Users2,
} from "lucide-react";

import useAuth from "../../auth/useAuth";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { DashboardSkeleton } from "../../components/ui";
import TopCoursesChart from "../../components/analytics/TopCoursesChart";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";
import { getDashboardStats } from "../../services/dashboardService";
import { getStudentAverage, getStudentGPA, getStudentMarks } from "../../services/marksService";
import { getStudentByEmail } from "../../services/studentService";
import { getTeacherByEmail, getTeacherDashboard } from "../../services/teacherService";

function Dashboard() {
  useDocumentTitle("Dashboard");
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      try {
        const role = user?.role;

        if (role === "TEACHER") {
          const teacherProfile = await getTeacherByEmail(user?.email);
          const teacherData = await getTeacherDashboard(teacherProfile.id);
          if (isMounted) setStats(teacherData);
          return;
        }

        if (role === "STUDENT") {
          const studentProfile = await getStudentByEmail(user?.email);
          const marks = await getStudentMarks(studentProfile.id);
          const average = await getStudentAverage(studentProfile.id);
          const gpa = await getStudentGPA(studentProfile.id);

          if (isMounted) {
            setStudentData({
              studentProfile,
              marks: marks || [],
              average: average ?? 0,
              gpa: gpa ?? 0,
            });
          }
          return;
        }

        const data = await getDashboardStats();
        if (isMounted) setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (user?.role) {
      loadDashboard();
    } else {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [user?.email, user?.role]);

  const adminMetrics = useMemo(() => {
    const topCourses = Array.isArray(stats?.topCourses)
      ? stats.topCourses
      : Array.isArray(stats?.courses)
        ? stats.courses
        : [];

    const riskSummary = stats?.studentRiskSummary ?? stats?.riskSummary ?? null;

    return {
      totalStudents: stats?.totalStudents ?? 0,
      totalTeachers: stats?.totalTeachers ?? 0,
      totalCourses: stats?.totalCourses ?? 0,
      // FIX: averageAttendance comes from analytics API - no hardcoded fallback
      attendancePercentage: stats?.averageAttendance ?? stats?.attendancePercentage ?? stats?.attendance?.percentage ?? 0,
      averageMarks: stats?.averageMarks ?? stats?.avgMarks ?? 0,
      topCourses,
      riskCount: riskSummary?.atRiskStudents ?? stats?.atRiskStudents ?? 0,
      riskLabel: riskSummary?.label ?? "Needs attention",
    };
  }, [stats]);

  const teacherMetrics = useMemo(() => {
    const assignedCourses = Array.isArray(stats?.courses)
      ? stats.courses
      : Array.isArray(stats?.assignedCourses)
        ? stats.assignedCourses
        : [];

    const courseAnalytics = assignedCourses.map((course) => ({
      name: course?.courseName || course?.name || "Course",
      students: course?.studentCount ?? course?.totalStudents ?? 0,
    }));

    return {
      totalCourses: stats?.totalCourses ?? assignedCourses.length,
      totalStudents: stats?.totalStudents ?? 0,
      attendanceRecords: stats?.totalAttendanceRecords ?? 0,
      marksRecords: stats?.totalMarksRecords ?? 0,
      attendanceRate: stats?.attendanceRate ?? stats?.attendancePercentage ?? 0,
      averageMarks: stats?.averageMarks ?? stats?.avgMarks ?? 0,
      assignedCourses,
      courseAnalytics,
    };
  }, [stats]);

  const studentMetrics = useMemo(() => {
    const marks = Array.isArray(studentData?.marks) ? studentData.marks : [];
    const courseNames = [...new Set(marks.map((item) => item.courseName || item.course || "General"))];

    return {
      gpa: studentData?.gpa ?? 0,
      averageMarks: studentData?.average ?? 0,
      attendance: studentData?.attendancePercentage ?? 0,
      enrolledCourses: courseNames.length,
      marks,
      performanceData: marks.slice(0, 6).map((item) => ({
        name: item.subject || item.courseName || "Subject",
        score: item.score ?? 0,
      })),
    };
  }, [studentData]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (user?.role === "TEACHER") {
    return (
      <div className="space-y-6">
        <PageHeader
          eyebrow="Campus 360 Workspace"
          title="Teacher Dashboard"
          description="A focused overview of your courses, attendance, and marks."
        >
          <Button variant="secondary" leftIcon={FileText} onClick={() => navigate("/teacher/courses")}>View Courses</Button>
          <Button leftIcon={CalendarCheck2} onClick={() => navigate("/attendance/mark")}>Mark Attendance</Button>
        </PageHeader>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Assigned Courses" value={teacherMetrics.totalCourses} icon={BookOpen} description="Courses in your roster" trend="up" trendLabel="Active" />
          <StatCard label="Students" value={teacherMetrics.totalStudents} icon={Users2} description="Students under your care" trend="up" trendLabel="Growing" />
          <StatCard label="Attendance Records" value={teacherMetrics.attendanceRecords} icon={CalendarCheck2} description="Attendance entries recorded" trend="neutral" trendLabel="Updated" />
          <StatCard label="Marks Records" value={teacherMetrics.marksRecords} icon={GraduationCap} description="Marks submissions in progress" trend="up" trendLabel="On track" />
        </motion.div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="overflow-hidden">
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
              {teacherMetrics.assignedCourses.length > 0 ? teacherMetrics.assignedCourses.map((course, index) => (
                <div key={`${course?.courseName || course?.name || "course"}-${index}`} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
                  <div>
                    <p className="font-medium text-slate-800">{course?.courseName || course?.name || "Course"}</p>
                    <p className="text-sm text-slate-500">{course?.studentCount ?? course?.totalStudents ?? 0} learners enrolled</p>
                  </div>
                  <Badge variant="success">Open</Badge>
                </div>
              )) : <p className="text-sm text-slate-500">No course data available yet.</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
              <CardDescription>These are the next priorities for your classroom.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Review attendance for today", meta: "2 pending" },
                { label: "Finalize marks for midterm", meta: "4 pending" },
                { label: "Follow up with at-risk students", meta: "1 pending" },
              ].map((task) => (
                <div key={task.label} className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm">
                  <p className="font-medium text-slate-800">{task.label}</p>
                  <p className="mt-1 text-sm text-slate-500">{task.meta}</p>
                </div>
              ))}
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
                <TopCoursesChart courses={teacherMetrics.courseAnalytics.map((course) => ({ courseName: course.name, totalStudents: course.students }))} title="Course analytics" description="Learner distribution by course" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Recent classroom milestones and updates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: "Attendance updated", detail: "12 records were marked today" },
                { title: "Marks published", detail: "3 assessment results shared" },
                { title: "Course review", detail: "Weekly progress review completed" },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3">
                  <p className="font-medium text-slate-800">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (user?.role === "STUDENT") {
    return (
      <div className="space-y-6">
        <PageHeader eyebrow="Campus 360" title="Welcome back" description="Track your academic progress and stay on top of your goals.">
          <Button variant="secondary" leftIcon={BarChart3} onClick={() => navigate("/marks/report")}>View Marks</Button>
          <Button leftIcon={CalendarCheck2} onClick={() => navigate("/attendance/report")}>My Attendance</Button>
        </PageHeader>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="GPA" value={studentMetrics.gpa.toFixed(2)} icon={TrendingUp} description="Current academic standing" trend="up" trendLabel="Strong" />
          <StatCard label="Attendance" value={`${studentMetrics.attendance}%`} icon={CalendarCheck2} description="Attendance consistency" trend="up" trendLabel="Steady" />
          <StatCard label="Average Marks" value={studentMetrics.averageMarks.toFixed(2)} icon={GraduationCap} description="Across all recent assessments" trend="neutral" trendLabel="Stable" />
          <StatCard label="Enrolled Courses" value={studentMetrics.enrolledCourses} icon={BookOpen} description="Active learning paths" trend="up" trendLabel="Live" />
        </motion.div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Your recent subject performance.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <TopCoursesChart courses={studentMetrics.performanceData.map((entry) => ({ courseName: entry.name, totalStudents: entry.score }))} title="Performance" description="Recent subject scores" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Results</CardTitle>
              <CardDescription>Your latest assessment highlights.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {studentMetrics.marks.length > 0 ? studentMetrics.marks.slice(0, 4).map((mark, index) => (
                <div key={`${mark.subject || "subject"}-${index}`} className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50/70 px-4 py-3">
                  <div>
                    <p className="font-medium text-slate-800">{mark.subject || mark.courseName || "Subject"}</p>
                    <p className="text-sm text-slate-500">{mark.courseName || "Course"}</p>
                  </div>
                  <Badge variant="success">{mark.score ?? 0}%</Badge>
                </div>
              )) : <p className="text-sm text-slate-500">No recent results available yet.</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Campus 360 Operations"
        title="Admin Dashboard"
        description="A modern snapshot of your Campus 360 ecosystem, from student activity to academic performance."
      >
        <Button variant="secondary" leftIcon={FileText} onClick={() => navigate("/attendance/report")}>Export Summary</Button>
        <Button leftIcon={Sparkles} onClick={() => navigate("/analytics/risk")}>View Risk Analytics</Button>
      </PageHeader>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total Students" value={adminMetrics.totalStudents} icon={Users2} description="Registered learners" trend="up" trendLabel="Growing" />
        <StatCard label="Total Teachers" value={adminMetrics.totalTeachers} icon={Users2} description="Active educators" trend="up" trendLabel="Stable" />
        <StatCard label="Total Courses" value={adminMetrics.totalCourses} icon={BookOpen} description="Current course catalog" trend="neutral" trendLabel="Updated" />
        <StatCard label="Attendance %" value={`${adminMetrics.attendancePercentage}%`} icon={CalendarCheck2} description="Overall participation" trend="up" trendLabel="Healthy" />
        <StatCard label="Average Marks" value={adminMetrics.averageMarks.toFixed(2)} icon={GraduationCap} description="Academic performance" trend="up" trendLabel="Positive" />
      </motion.div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle>Top Courses</CardTitle>
                <CardDescription>See which programs are attracting the most learners.</CardDescription>
              </div>
              <Badge variant="brand" dot>Live</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <TopCoursesChart courses={adminMetrics.topCourses} title="Top Courses" description="Enrollment intensity by course" />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Risk Summary</CardTitle>
              <CardDescription>Monitor students that may need intervention.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-amber-600" />
                  <p className="text-sm font-semibold text-amber-700">{adminMetrics.riskCount} students flagged</p>
                </div>
                <p className="mt-2 text-sm text-amber-700">{adminMetrics.riskLabel}</p>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
                <div className="flex items-center gap-2 text-slate-700">
                  <Activity className="h-4 w-4" />
                  <p className="text-sm font-semibold">Engagement is trending positively</p>
                </div>
                <p className="mt-2 text-sm text-slate-500">Attendance and participation indicators remain healthy this week.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Jump directly to the pages you use most.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <Button variant="secondary" leftIcon={BookOpen} onClick={() => navigate("/courses")}>Manage Courses</Button>
              <Button variant="secondary" leftIcon={Users2} onClick={() => navigate("/admin/teachers")}>Manage Teachers</Button>
              <Button variant="secondary" leftIcon={GraduationCap} onClick={() => navigate("/admin/students")}>Manage Students</Button>
              <Button variant="secondary" leftIcon={ShieldAlert} onClick={() => navigate("/analytics/risk")}>Risk Analytics</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;