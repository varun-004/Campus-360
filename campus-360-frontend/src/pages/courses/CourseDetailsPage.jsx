import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { BookOpen, GraduationCap, Search, UserPlus, Users2 } from "lucide-react";

import {
  getCourseById,
  assignStudentToCourse,
  removeStudentFromCourse,
} from "../../services/courseService";
import EnrollStudentModal from "../../components/courses/EnrollStudentsModal";
import ConfirmModal from "../../components/common/ConfirmModal";
import Table from "../../components/common/Table";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useAuth from "../../auth/useAuth";
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
  StatCard,
  TableSkeleton,
} from "../../components/ui";

const CourseDetailsPage = () => {
  useDocumentTitle("Course Details");
  const { user } = useAuth();
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removeTarget, setRemoveTarget] = useState(null);
  const [removing, setRemoving] = useState(false);

  const fetchCourse = async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);
      setError("");
      const data = await getCourseById(id);
      setCourse(data);
    } catch (err) {
      setError(err?.message || "Failed to load course");
      setCourse(null);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadCourse = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getCourseById(id);
        if (isMounted) setCourse(data);
      } catch (err) {
        if (isMounted) {
          setError(err?.message || "Failed to load course");
          setCourse(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadCourse();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const filteredStudents = useMemo(
    () =>
      course?.students?.filter((student) =>
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()),
      ) || [],
    [course?.students, searchTerm],
  );

  const handleEnrollStudent = async (studentId) => {
    try {
      setEnrollLoading(true);
      await assignStudentToCourse(id, studentId);
      notify.success("Student enrolled successfully");
      await fetchCourse(false);
      setIsEnrollModalOpen(false);
    } catch (err) {
      console.error(err);
      notify.error(err?.response?.data?.message || "Student already enrolled");
    } finally {
      setEnrollLoading(false);
    }
  };

  const handleRemoveStudent = async () => {
    if (!removeTarget) return;

    try {
      setRemoving(true);
      await removeStudentFromCourse(id, removeTarget.id);
      await fetchCourse(false);
      notify.success("Student removed from course");
    } catch (err) {
      console.error(err);
      notify.error("Failed to remove student");
    } finally {
      setRemoving(false);
      setRemoveTarget(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-28 animate-pulse rounded-2xl bg-slate-200/80" />
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-slate-200/80" />
          ))}
        </div>
        <TableSkeleton rows={5} cols={3} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (!course) {
    return (
      <EmptyState
        icon={BookOpen}
        title="Course not found"
        description="The course you're looking for doesn't exist or was removed."
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Course details"
        title={course.courseName}
        description={course.description || "Course overview and enrolled students."}
      >
        {user?.role === "ADMIN" && (
          <Button leftIcon={UserPlus} onClick={() => setIsEnrollModalOpen(true)}>
            Enroll Student
          </Button>
        )}
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Course Code"
          value={course.courseCode}
          icon={BookOpen}
          description="Unique identifier"
        />
        <StatCard
          label="Credits"
          value={course.credits}
          icon={GraduationCap}
          description="Academic credit hours"
        />
        <StatCard
          label="Instructor"
          value={course.teacherName || "Unassigned"}
          icon={Users2}
          description="Assigned teacher"
        />
        <StatCard
          label="Enrolled"
          value={course.students?.length ?? 0}
          icon={Users2}
          description="Students in this course"
          trend="up"
          trendLabel="Active"
        />
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Enrolled students</CardTitle>
            <CardDescription>Manage the roster for this course.</CardDescription>
          </div>
          <div className="w-full max-w-xs">
            <Input
              type="text"
              placeholder="Search student..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={Search}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredStudents.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={Users2}
                title="No students found"
                description={
                  searchTerm
                    ? "No students match your search."
                    : "Enroll students to build this course roster."
                }
                action={
                  !searchTerm && user?.role === "ADMIN" ? (
                    <Button leftIcon={UserPlus} onClick={() => setIsEnrollModalOpen(true)}>
                      Enroll Student
                    </Button>
                  ) : null
                }
              />
            </div>
          ) : (
            <Table>
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3 font-medium text-slate-900">{student.name}</td>
                    <td className="px-4 py-3 text-slate-600">{student.email}</td>
                    <td className="px-4 py-3">
                      <Badge variant="success" dot>
                        Enrolled
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end">
                        {user?.role === "ADMIN" && (
                          <Button variant="danger" size="sm" onClick={() => setRemoveTarget(student)}>
                            Remove
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </CardContent>
      </Card>

      <EnrollStudentModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        onEnroll={handleEnrollStudent}
        loading={enrollLoading}
      />

      <ConfirmModal
        isOpen={Boolean(removeTarget)}
        onClose={() => setRemoveTarget(null)}
        onConfirm={handleRemoveStudent}
        title="Remove student"
        message={`Remove ${removeTarget?.name || "this student"} from the course roster?`}
        confirmLabel="Remove"
        loading={removing}
      />
    </div>
  );
};

export default CourseDetailsPage;
