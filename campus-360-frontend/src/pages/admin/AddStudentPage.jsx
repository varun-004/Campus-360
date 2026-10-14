import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStudent } from "../../services/studentService";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import notify from "../../utils/toast";
import { Button, Card, CardContent, CardHeader, CardTitle, Input, PageHeader } from "../../components/ui";

function AddStudentPage() {
  useDocumentTitle("Add Student");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createStudent(formData);
      notify.success("Student added successfully");
      navigate("/admin/students");
    } catch (error) {
      console.error(error);
      notify.error(error.response?.data?.message || "Failed to add student");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add Student"
        description="Create a new student profile."
      />

      <Card>
        <CardHeader>
          <CardTitle>Student details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <Input label="Name" name="name" value={formData.name} onChange={handleChange} required />
            <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            <div className="md:col-span-2 flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={() => navigate("/admin/students")}>
                Cancel
              </Button>
              <Button type="submit">Save Student</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddStudentPage;
