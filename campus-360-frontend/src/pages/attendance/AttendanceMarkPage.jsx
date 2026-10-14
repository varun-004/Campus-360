import { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

import { getAllCourses, getCourseById } from "../../services/courseService";
import { markAttendanceBulk } from "../../services/attendanceService";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import notify from "../../utils/toast";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  EmptyState,
  ListSkeleton,
  PageHeader,
  PageHeaderSkeleton,
  Select,
} from "../../components/ui";

const AttendanceMarkPage = () => {
  useDocumentTitle("Mark Attendance");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [students, setStudents] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const [attendanceData, setAttendanceData] = useState({});



  
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data.content || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCourses(false);
      }
    };

    loadCourses();
  }, []);

  const handleCourseChange = async (courseId) => {
    setSelectedCourse(courseId);

    if (!courseId) {
      setStudents([]);
      return;
    }

    try {
      setLoadingStudents(true);
      const course = await getCourseById(courseId);
      setStudents(course.students || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleAttendance = (studentId, present) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: present,
    }));
  };

  const handleSaveAttendance = async () => {
    if (!selectedCourse) {
      notify.error("Please select a course.");
      return;
    }

    if (Object.keys(attendanceData).length === 0) {
      notify.error("Please mark attendance before saving.");
      return;
    }

    try {
      const bulkPayload = students.map((student) => ({
        studentId: student.id,
        courseId: Number(selectedCourse),
        attendanceDate,
        present: attendanceData[student.id] ?? false,
      }));

      await markAttendanceBulk(bulkPayload);

      notify.success("Attendance saved successfully");

      setAttendanceData({});
    } catch (error) {
      console.error(error);

      notify.error(
        error?.response?.data?.message || "Failed to save attendance",
      );
    }
  };

  if (loadingCourses) {
    return (
      <div className="space-y-6">
        <PageHeaderSkeleton />
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <ListSkeleton rows={1} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Attendance"
        title="Mark Attendance"
        description="Select a course and mark each student as present or absent."
      />

      <Card>
        <CardHeader>
          <CardTitle>Select course</CardTitle>
          <CardDescription>
            Choose the course to mark attendance for.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            label="Course"
            value={selectedCourse}
            onChange={(e) => handleCourseChange(e.target.value)}
          >
            <option value="">Select Course</option>

            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.courseName}
              </option>
            ))}
          </Select>

          <label className="block text-sm font-medium text-slate-700">
            Attendance Date
          </label>

          <input
            type="date"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </CardContent>
      </Card>

      <div className="flex justify-end mt-6">
        <Button onClick={handleSaveAttendance} disabled={students.length === 0}>
          Save Attendance
        </Button>
      </div>

      {loadingStudents ? (
        <ListSkeleton rows={6} />
      ) : !selectedCourse ? (
        <EmptyState
          title="Select a course"
          description="Choose a course above to view the student list."
        />
      ) : students.length === 0 ? (
        <EmptyState
          title="No students enrolled"
          description="This course has no enrolled students yet."
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Student list</CardTitle>
            <CardDescription>
              {students.length} student{students.length !== 1 ? "s" : ""}{" "}
              enrolled
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="flex flex-col gap-3 px-6 py-4 transition-colors hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {student.name}
                    </h3>
                    <p className="text-sm text-slate-500">{student.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={
                        attendanceData[student.id] === true
                          ? "success"
                          : "outline"
                      }
                      size="sm"
                      leftIcon={CheckCircle2}
                      onClick={() => handleAttendance(student.id, true)}
                    >
                      Present
                    </Button>
                    <Button
                      variant={
                        attendanceData[student.id] === false
                          ? "danger"
                          : "outline"
                      }
                      size="sm"
                      leftIcon={XCircle}
                      onClick={() => handleAttendance(student.id, false)}
                    >
                      Absent
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AttendanceMarkPage;
