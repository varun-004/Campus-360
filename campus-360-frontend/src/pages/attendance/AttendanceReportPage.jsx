import { useState, useEffect, useMemo } from "react";
import { BookOpen, CalendarCheck2, TrendingUp, Download } from "lucide-react";

import { getCourseWiseAttendance } from "../../services/attendanceService";
import { getStudentByEmail } from "../../services/studentService";
import api from "../../api/axios";
import notify from "../../utils/toast";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardGridSkeleton,
  EmptyState,
  PageHeader,
  PageHeaderSkeleton,
  StatCard,
  StatCardSkeleton,
} from "../../components/ui";

const getAttendanceVariant = (percentage) => {
  if (percentage >= 85) return "success";
  if (percentage >= 70) return "warning";
  return "danger";
};

const AttendanceReportPage = () => {
  useDocumentTitle("Attendance Report");
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        setError(null);
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.email) {
          setError("Not authenticated. Please log in again.");
          return;
        }

        // For ADMIN role: admin has no student profile, show appropriate message
        if (user.role === "ADMIN") {
          setError("Attendance report is available for students only.");
          setLoading(false);
          return;
        }

        const student = await getStudentByEmail(user.email);
        setStudentId(student.id);
        const data = await getCourseWiseAttendance(student.id);
        setAttendance(Array.isArray(data) ? data : []);
      } catch (err) {
        const status = err?.response?.status;
        if (status === 401) {
          setError("Session expired. Please log in again.");
        } else if (status === 403) {
          setError("You do not have permission to view this report.");
        } else if (status === 404) {
          setError("Student profile not found for your account.");
        } else {
          setError("Failed to load attendance data. Please try again.");
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAttendance();
  }, []);

  const overallPercentage = useMemo(() => {
    if (attendance.length === 0) return 0;
    const total = attendance.reduce((sum, c) => sum + (c.totalClasses || 0), 0);
    const present = attendance.reduce((sum, c) => sum + (c.present || 0), 0);
    if (total === 0) return 0;
    return (present / total) * 100;
  }, [attendance]);

  const healthyCourses = useMemo(
    () => attendance.filter((c) => c.percentage >= 85).length,
    [attendance],
  );

  const handleDownloadAttendance = async () => {
    if (!studentId) return;
    try {
      setDownloading(true);
      const response = await api.get(
        `/api/attendance/student/${studentId}/export`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = "attendance-report.csv";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      notify.success("Attendance report downloaded");
    } catch (err) {
      console.error(err);
      notify.error("Failed to download attendance report");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeaderSkeleton />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
        <CardGridSkeleton count={4} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          eyebrow="My records"
          title="Attendance Report"
          description="Track your attendance percentage across all enrolled courses."
        />
        <EmptyState
          icon={CalendarCheck2}
          title="Unable to load attendance"
          description={error}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="My records"
        title="Attendance Report"
        description="Track your attendance percentage across all enrolled courses."
      >
        {attendance.length > 0 && studentId && (
          <Button
            leftIcon={Download}
            onClick={handleDownloadAttendance}
            loading={downloading}
            variant="secondary"
          >
            Download Attendance Report
          </Button>
        )}
      </PageHeader>

      {attendance.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            label="Overall Attendance"
            value={`${overallPercentage.toFixed(1)}%`}
            icon={CalendarCheck2}
            description="Average across all courses"
            trend={overallPercentage >= 85 ? "up" : "down"}
            trendLabel={overallPercentage >= 85 ? "Healthy" : "Needs attention"}
          />
          <StatCard
            label="Courses Enrolled"
            value={attendance.length}
            icon={BookOpen}
            description="Active course enrollments"
            trend="neutral"
            trendLabel="Enrolled"
          />
          <StatCard
            label="On Track"
            value={healthyCourses}
            icon={TrendingUp}
            description="Courses with 85%+ attendance"
            trend="up"
            trendLabel="Healthy"
          />
        </div>
      )}

      {attendance.length === 0 ? (
        <EmptyState
          icon={CalendarCheck2}
          title="No attendance data"
          description="Your attendance records will appear here once they are recorded by your teacher."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {attendance.map((course) => (
            <Card key={course.courseId} hover>
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle>{course.courseName}</CardTitle>
                  <CardDescription>Course attendance summary</CardDescription>
                </div>
                <Badge variant={getAttendanceVariant(course.percentage)}>
                  {course.percentage >= 85
                    ? "Good"
                    : course.percentage >= 70
                      ? "Fair"
                      : "Low"}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between gap-4">
                  <p className="text-3xl font-semibold tracking-tight text-slate-900">
                    {course.percentage.toFixed(1)}%
                  </p>
                  <div className="text-right text-sm text-slate-500 space-y-0.5">
                    <p>
                      Present:{" "}
                      <span className="font-medium text-emerald-600">
                        {course.present ?? "—"}
                      </span>
                    </p>
                    <p>
                      Absent:{" "}
                      <span className="font-medium text-red-500">
                        {course.absent ?? "—"}
                      </span>
                    </p>
                    <p>
                      Total:{" "}
                      <span className="font-medium text-slate-700">
                        {course.totalClasses ?? "—"}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500">
                    <span>Progress</span>
                    <span>{course.percentage.toFixed(0)}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full transition-all ${
                        course.percentage >= 85
                          ? "bg-emerald-500"
                          : course.percentage >= 70
                            ? "bg-amber-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${Math.min(course.percentage, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttendanceReportPage;
