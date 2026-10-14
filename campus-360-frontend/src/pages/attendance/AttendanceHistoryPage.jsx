import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Download, Search, Edit } from "lucide-react";

import { getAllCourses } from "../../services/courseService";
import {
  getAttendanceByCourse,
  exportAttendanceCsv,
  updateAttendance,
} from "../../services/attendanceService";

import Table from "../../components/common/Table";
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
  PageHeader,
  Select,
  TableSkeleton,
} from "../../components/ui";

const AttendanceHistoryPage = () => {
  useDocumentTitle("Attendance History");

  const { courseId: routeCourseId } = useParams();

  const [courses, setCourses] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(routeCourseId || "");

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [editingAttendance, setEditingAttendance] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // -------------------------
  // Load Courses
  // -------------------------

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data.content || []);
      } catch (err) {
        console.error(err);
        notify.error("Failed to load courses");
      }
    };

    loadCourses();
  }, []);

  // -------------------------
  // Auto-select course from route
  // -------------------------

  useEffect(() => {
    if (routeCourseId) {
      setSelectedCourse(routeCourseId);
      handleCourseChange(routeCourseId, selectedDate);
    }
  }, [routeCourseId]);

  // -------------------------
  // Load Attendance
  // -------------------------

  const handleCourseChange = async (courseId, targetDate = selectedDate) => {
    try {
      setLoading(true);

      setSelectedCourse(courseId);

      if (!courseId) {
        setAttendance([]);
        return;
      }

      const data = await getAttendanceByCourse(courseId);

      const filtered = data.filter(
        (item) => item.attendanceDate === targetDate
      );

      setAttendance(filtered);

      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load attendance records");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Export CSV
  // -------------------------

  const handleExport = async () => {
    if (!selectedCourse) {
      notify.error("Please select a course first.");
      return;
    }

    try {
      const file = await exportAttendanceCsv(selectedCourse);

      const url = window.URL.createObjectURL(file);

      const link = document.createElement("a");

      link.href = url;
      link.download = "attendance.csv";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      notify.success("CSV exported successfully");
    } catch (err) {
      console.error(err);
      notify.error("Failed to export CSV");
    }
  };

  // -------------------------
  // Search Filter
  // -------------------------

  const filteredAttendance = attendance.filter((record) =>
    record.studentName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Records"
        title="Attendance History"
        description="Review attendance records and export them."
      >
        <Button
          variant="outline"
          leftIcon={Download}
          onClick={handleExport}
          disabled={!selectedCourse}
        >
          Export CSV
        </Button>
      </PageHeader>

      {/* Filters */}

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>

          <CardDescription>
            Select course, date and search student.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Select
              label="Course"
              value={selectedCourse}
              onChange={(e) => handleCourseChange(e.target.value)}
              disabled={Boolean(routeCourseId)}
            >
              <option value="">Select Course</option>

              {routeCourseId &&
                !courses.some(
                  (c) => String(c.id) === String(routeCourseId)
                ) && (
                  <option value={routeCourseId}>
                    Course #{routeCourseId}
                  </option>
                )}

              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.courseName}
                </option>
              ))}
            </Select>

            <Input
              label="Date"
              type="date"
              value={selectedDate}
              onChange={(e) => {
                const newDate = e.target.value;
                setSelectedDate(newDate);

                if (selectedCourse) {
                  handleCourseChange(selectedCourse, newDate);
                }
              }}
            />

            <Input
              label="Search Student"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Error */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      {/* Loading */}

      {loading ? (
        <TableSkeleton rows={6} cols={5} />
      ) : !selectedCourse ? (
        <EmptyState
          icon={Search}
          title="Select a Course"
          description="Choose a course to view attendance."
        />
      ) : filteredAttendance.length === 0 ? (
        <EmptyState
          title="No Attendance Found"
          description="No attendance records available."
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Course</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredAttendance.map((record) => (
                  <tr key={record.id}>
                    <td className="px-4 py-3 font-medium">
                      {record.studentName}
                    </td>

                    <td className="px-4 py-3">{record.courseName}</td>

                    <td className="px-4 py-3">
                      {record.attendanceDate}
                    </td>

                    <td className="px-4 py-3">
                      <Badge
                        variant={record.present ? "success" : "danger"}
                      >
                        {record.present ? "Present" : "Absent"}
                      </Badge>
                    </td>

                    <td className="px-4 py-3">
                      <Button
                        size="sm"
                        variant="outline"
                        leftIcon={Edit}
                        onClick={() => setEditingAttendance(record)}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Edit Attendance */}

      {editingAttendance && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Attendance</CardTitle>

            <CardDescription>
              Update attendance status for the selected student.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button
                variant={
                  editingAttendance.present ? "success" : "outline"
                }
                onClick={() =>
                  setEditingAttendance({
                    ...editingAttendance,
                    present: true,
                  })
                }
              >
                Present
              </Button>

              <Button
                variant={
                  editingAttendance.present === false
                    ? "danger"
                    : "outline"
                }
                onClick={() =>
                  setEditingAttendance({
                    ...editingAttendance,
                    present: false,
                  })
                }
              >
                Absent
              </Button>

              <Button
                onClick={async () => {
                  try {
                    await updateAttendance({
                      studentId: editingAttendance.studentId,
                      courseId: editingAttendance.courseId,
                      attendanceDate:
                        editingAttendance.attendanceDate,
                      present: editingAttendance.present,
                    });

                    notify.success("Attendance Updated");

                    setEditingAttendance(null);

                    handleCourseChange(selectedCourse);
                  } catch (err) {
                    console.error(err);
                    notify.error("Failed to update attendance");
                  }
                }}
              >
                Update
              </Button>

              <Button
                variant="outline"
                onClick={() => setEditingAttendance(null)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AttendanceHistoryPage;
