import { useState } from "react";

import { createTeacher } from "../../services/adminTeacherService";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import notify from "../../utils/toast";
import { Button, Card, CardContent, CardHeader, CardTitle, Input, PageHeader } from "../../components/ui";

function AddTeacherPage() {
  useDocumentTitle("Add Teacher");
  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    department: "",
    designation: "",
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
      await createTeacher(formData);
      notify.success("Teacher added successfully");
      setFormData({
        employeeId: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        department: "",
        designation: "",
      });
    } catch (error) {
      console.error(error);
      notify.error(error.response?.data?.message || "Failed to add teacher");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add Teacher"
        description="Create a new teacher profile and assign them to the right department."
      />

      <Card>
        <CardHeader>
          <CardTitle>Teacher details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <Input label="Employee ID" name="employeeId" value={formData.employeeId} onChange={handleChange} required />
            <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
            <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
            <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
            <Input label="Department" name="department" value={formData.department} onChange={handleChange} required />
            <div className="md:col-span-2">
              <Input label="Designation" name="designation" value={formData.designation} onChange={handleChange} required />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button type="submit">Save Teacher</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddTeacherPage;