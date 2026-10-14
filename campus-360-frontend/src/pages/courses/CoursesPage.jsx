import { useEffect, useMemo, useState } from "react";
import { BookOpen, Plus, Search } from "lucide-react";

import { getAllCourses, createCourse } from "../../services/courseService";
import useAuth from "../../auth/useAuth";
import CourseCard from "../../components/courses/CourseCard";
import CourseForm from "../../components/courses/CourseForm";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import notify from "../../utils/toast";
import {
  Button,
  CardGridSkeleton,
  EmptyState,
  Input,
  Modal,
  PageHeader,
  StatCard,
} from "../../components/ui";

const CoursesPage = () => {
  useDocumentTitle("Courses");
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const filteredCourses = useMemo(
    () =>
      courses.filter((course) =>
        course.courseName?.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [courses, searchTerm],
  );

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const data = await getAllCourses();
        setCourses(data.content);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const handleCreateCourse = async (formData) => {
    try {
      setCreateLoading(true);
      await createCourse(formData);
      const updatedCourses = await getAllCourses();
      setCourses(updatedCourses.content);
      setIsModalOpen(false);
      notify.success("Course created successfully");
    } catch (err) {
      console.error(err);
      notify.error("Failed to create course");
    } finally {
      setCreateLoading(false);
    }
  };

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Administration"
        title="Courses Management"
        description="Browse, search, and manage your institution's course catalog."
      >
        {user?.role === "ADMIN" && (
          <Button leftIcon={Plus} onClick={() => setIsModalOpen(true)}>
            Add Course
          </Button>
        )}
      </PageHeader>

      {!loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            label="Total Courses"
            value={courses.length}
            icon={BookOpen}
            description="Courses in the catalog"
            trend="neutral"
            trendLabel="Catalog"
          />
          <StatCard
            label="Showing"
            value={filteredCourses.length}
            icon={Search}
            description="Results matching your search"
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
              : "Create your first course to get started."
          }
          action={
            !searchTerm && user?.role === "ADMIN" ? (
              <Button leftIcon={Plus} onClick={() => setIsModalOpen(true)}>
                Add Course
              </Button>
            ) : null
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Course"
      >
        <CourseForm onSubmit={handleCreateCourse} loading={createLoading} />
      </Modal>
    </div>
  );
};

export default CoursesPage;
