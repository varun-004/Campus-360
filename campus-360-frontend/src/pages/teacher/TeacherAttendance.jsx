import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2, Save, Users2, XCircle } from "lucide-react";

import { getCourseStudents } from "../../services/teacherService";
import { markAttendanceBulk } from "../../services/attendanceService";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import notify from "../../utils/toast";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  EmptyState,
  Input,
  ListSkeleton,
  PageHeader,
  PageHeaderSkeleton,
  StatCard,
  StatCardSkeleton,
} from "../../components/ui";

function TeacherAttendance() {
  useDocumentTitle("Mark Attendance");
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  useEffect(() => {
    let active = true;

    const fetchStudents = async () => {
      try {
        const data = await getCourseStudents(courseId);
        if (!active) return;
        setStudents(data);
      } catch (error) {
        console.error(error);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchStudents();

    return () => {
      active = false;
    };
  }, [courseId]);

  const presentCount = useMemo(
    () => Object.values(attendanceData).filter(Boolean).length,
    [attendanceData],
  );

  const handleCheckboxChange = (studentId, checked) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: checked,
    }));
  };

  const handleSaveAttendance = async () => {
    try {
      setSaving(true);
      const bulkPayload = students.map((student) => ({
        studentId: student.id,
        courseId: Number(courseId),
        attendanceDate,
        present: attendanceData[student.id] || false,
      }));
      await markAttendanceBulk(bulkPayload);
      notify.success("Attendance saved successfully");
    } catch (error) {
      console.error(error);
      notify.error(error?.response?.data?.message || "Failed to save attendance");
    } finally {
      setSaving(false);
    }
  };

  const markAll = (present) => {
    const next = {};
    students.forEach((s) => {
      next[s.id] = present;
    });
    setAttendanceData(next);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeaderSkeleton />
        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
        <ListSkeleton rows={6} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Attendance"
        title="Mark Attendance"
        description="Record attendance for the selected course and date."
      >
        <Button leftIcon={Save} onClick={handleSaveAttendance} loading={saving}>
          Save Attendance
        </Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Students"
          value={students.length}
          icon={Users2}
          description="In this course"
        />
        <StatCard
          label="Present"
          value={presentCount}
          icon={CheckCircle2}
          description="Marked present today"
          trend="up"
          trendLabel="Present"
        />
        <StatCard
          label="Absent"
          value={students.length - presentCount}
          icon={XCircle}
          description="Marked absent today"
          trend="down"
          trendLabel="Absent"
        />
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <CardTitle>Session details</CardTitle>
            <CardDescription>Select the date and mark each student's status.</CardDescription>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <Input
              label="Attendance Date"
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="w-full sm:w-auto"
            />
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => markAll(true)}>
                All Present
              </Button>
              <Button variant="secondary" size="sm" onClick={() => markAll(false)}>
                All Absent
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {students.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={Users2}
                title="No students enrolled"
                description="There are no students in this course to mark attendance for."
              />
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {students.map((student) => {
                const isPresent = attendanceData[student.id] || false;
                return (
                  <div
                    key={student.id}
                    className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-slate-50/70"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-sm font-semibold text-slate-600">
                        {student.name?.charAt(0)?.toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{student.name}</h3>
                        <p className="text-sm text-slate-500">{student.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={isPresent ? "success" : "danger"}>
                        {isPresent ? "Present" : "Absent"}
                      </Badge>
                      <input
                        type="checkbox"
                        checked={isPresent}
                        onChange={(e) => handleCheckboxChange(student.id, e.target.checked)}
                        className="h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-600"
                        aria-label={`Mark ${student.name} present`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default TeacherAttendance;
