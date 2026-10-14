import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Search, Users2 } from "lucide-react";

import { getTeacherByEmail, getTeacherCourses } from "../../services/teacherService";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardGridSkeleton,
  EmptyState,
  Input,
  PageHeader,
  StatCard,
} from "../../components/ui";

function TeacherCourses() {
  useDocumentTitle("My Courses");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const teacher = await getTeacherByEmail(user.email);
        const data = await getTeacherCourses(teacher.id);
        setCourses(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const filteredCourses = useMemo(
    () =>
      courses.filter(
        (course) =>
          course.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.courseCode?.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [courses, searchTerm],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Teaching"
        title="My Courses"
        description="Browse your assigned courses and manage classroom activities."
      />

      {!loading && (
        <div className="grid gap-4 sm:grid-cols-2">
          <StatCard
            label="Assigned Courses"
            value={courses.length}
            icon={BookOpen}
            description="Courses in your roster"
            trend="up"
            trendLabel="Active"
          />
          <StatCard
            label="Showing"
            value={filteredCourses.length}
            icon={Search}
            description="Results matching search"
            trend="neutral"
            trendLabel="Filtered"
          />
        </div>
      )}

      <div className="max-w-md">
        <Input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={Search}
        />
      </div>

      {loading ? (
        <CardGridSkeleton count={6} />
      ) : filteredCourses.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No courses found"
          description={
            searchTerm
              ? "Try a different search term."
              : "You don't have any assigned courses yet."
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="group cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => navigate(`/teacher/course/${course.id}`)}
            >
              <CardContent>
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <BookOpen className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <Badge variant="brand">{course.courseCode}</Badge>
                </div>
                <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                  {course.courseName}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                  {course.description || "Tap to view course details and manage students."}
                </p>
                {(course.studentCount != null || course.totalStudents != null) && (
                  <div className="mt-4 flex items-center gap-1.5 text-sm text-slate-500">
                    <Users2 className="h-4 w-4" aria-hidden="true" />
                    <span>{course.studentCount ?? course.totalStudents ?? 0} students</span>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="secondary"
                  className="w-full"
                  rightIcon={ArrowRight}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/teacher/course/${course.id}`);
                  }}
                >
                  Open Course
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeacherCourses;
