import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getTeacherById, updateTeacher } from "../../services/adminTeacherService";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import notify from "../../utils/toast";
import { Button, Card, CardContent, CardHeader, CardTitle, Input, PageHeader } from "../../components/ui";

function EditTeacherPage() {
  useDocumentTitle("Edit Teacher");
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    department: "",
    designation: "",
  });

  useEffect(() => {
    const loadTeacher = async () => {
      try {
        const teacher = await getTeacherById(id);

        setFormData({
          firstName: teacher.firstName,
          lastName: teacher.lastName,
          department: teacher.department,
          designation: teacher.designation,
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadTeacher();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateTeacher(id, formData);
      notify.success("Teacher updated successfully");
      navigate("/admin/teachers");
    } catch (error) {
      console.error(error);
      notify.error(error.response?.data?.message || "Failed to update teacher");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Teacher"
        description="Update teacher details while keeping their existing assignments intact."
      />

      <Card>
        <CardHeader>
          <CardTitle>Profile update</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
            <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
            <Input label="Department" name="department" value={formData.department} onChange={handleChange} required />
            <Input label="Designation" name="designation" value={formData.designation} onChange={handleChange} required />
            <div className="md:col-span-2 flex justify-end">
              <Button type="submit">Update Teacher</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditTeacherPage;