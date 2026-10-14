import { useState, useEffect } from "react";
import { getAllTeachers } from "../../services/adminTeacherService";
import { Button, Input, Select, Textarea } from "../../components/ui";

const CourseForm = ({ onSubmit, loading }) => {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    courseName: "",
    courseCode: "",
    description: "",
    credits: 0,
    teacherId: "",
  });

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const data = await getAllTeachers();
        setTeachers(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadTeachers();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      teacherId: Number(formData.teacherId),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Course Name" name="courseName" value={formData.courseName} onChange={handleChange} placeholder="Enter course name" required />
      <Input label="Course Code" name="courseCode" value={formData.courseCode} onChange={handleChange} placeholder="Enter course code" required />
      <Textarea label="Description" name="description" value={formData.description} onChange={handleChange} placeholder="Enter description" rows={4} />
      <Input label="Credits" type="number" name="credits" value={formData.credits} onChange={handleChange} placeholder="Enter credits" required />
      <Select label="Teacher" name="teacherId" value={formData.teacherId} onChange={handleChange} required>
        <option value="">Select Teacher</option>
        {teachers.map((teacher) => (
          <option key={teacher.id} value={teacher.id}>
            {teacher.firstName} {teacher.lastName}
          </option>
        ))}
      </Select>

      <div className="flex justify-end">
        <Button type="submit" loading={loading}>
          {loading ? "Creating..." : "Create Course"}
        </Button>
      </div>
    </form>
  );
};

export default CourseForm;