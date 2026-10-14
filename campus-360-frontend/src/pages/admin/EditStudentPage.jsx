import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentById, updateStudent } from "../../services/studentService";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import notify from "../../utils/toast";
import { Button, Card, CardContent, CardHeader, CardTitle, Input, PageHeader } from "../../components/ui";

function EditStudentPage() {
  useDocumentTitle("Edit Student");
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const data = await getStudentById(id);
        setFormData({
          name: data.name || "",
          email: data.email || "",
        });
      } catch (error) {
        console.error(error);
        notify.error("Failed to load student details");
        navigate("/admin/students");
      } finally {
        setLoading(false);
      }
    };
    loadStudent();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateStudent(id, formData);
      notify.success("Student updated successfully");
      navigate("/admin/students");
    } catch (error) {
      console.error(error);
      notify.error(error.response?.data?.message || "Failed to update student");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Student"
        description="Update student profile details."
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
              <Button type="submit">Update Student</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditStudentPage;
