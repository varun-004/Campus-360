import { useEffect, useState } from "react";

import { addMarks } from "../../services/marksService";
import { getAllCourses, getCourseById } from "../../services/courseService";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import notify from "../../utils/toast";
import { Button, Card, CardContent, CardHeader, CardTitle, Input, PageHeader, Select } from "../../components/ui";

const MarksEntryPage = () => {
  useDocumentTitle("Marks Entry");
  const [formData, setFormData] = useState({
    subject: "",
    score: "",
    studentId: "",
    courseId: "",
  });
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data.content || []);
      } catch (err) {
        console.error(err);
      }
    };

    loadCourses();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCourseChange = async (e) => {
    const courseId = e.target.value;

    setFormData({
      ...formData,
      courseId,
      studentId: "",
    });

    try {
      const course = await getCourseById(courseId);
      setStudents(course.students || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addMarks({
        subject: formData.subject,
        score: Number(formData.score),
        studentId: Number(formData.studentId),
        courseId: Number(formData.courseId),
      });

      notify.success("Marks added successfully");

      setFormData({
        subject: "",
        score: "",
        studentId: "",
        courseId: "",
      });
      setStudents([]);
    } catch (err) {
      console.error(err);
      notify.error(err?.response?.data?.message || "Marks already exist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Marks Entry" description="Record student performance quickly for any enrolled course." />

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>New marks submission</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Select label="Course" value={formData.courseId} onChange={handleCourseChange} required>
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.courseName}
                </option>
              ))}
            </Select>

            <Select label="Student" name="studentId" value={formData.studentId} onChange={handleChange} required>
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </Select>

            <Input label="Subject" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
            <Input label="Score" type="number" name="score" placeholder="Score" value={formData.score} onChange={handleChange} required />

            <div className="flex justify-end">
              <Button type="submit" loading={loading}>
                {loading ? "Saving..." : "Save Marks"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarksEntryPage;
