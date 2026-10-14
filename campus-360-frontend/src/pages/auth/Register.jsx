import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../services/authService";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import notify from "../../utils/toast";
import { ArrowLeft } from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Select } from "../../components/ui";

const Register = () => {
  useDocumentTitle("Register");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await registerUser(formData);
      notify.success("Registration successful");
      navigate("/login");
    } catch (error) {
      console.log(error);
      notify.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.12),_transparent_35%),linear-gradient(135deg,_#f8fafc,_#f0fdf4)] px-4 py-10">
      <Card className="w-full max-w-md border-slate-200/80 shadow-xl">
        <CardHeader className="px-8 pt-8">
          <Link
            to="/"
            className="mb-2 inline-flex items-center text-xs font-semibold text-slate-500 transition hover:text-brand-600 w-fit"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            Back to Campus 360
          </Link>
          <CardTitle className="text-center text-2xl">Create account</CardTitle>
          <p className="text-center text-sm text-slate-500">Join Campus 360 in a few quick steps.</p>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" required />
            <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" required />
            <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" required />
            {/* SECURITY FIX: ADMIN option removed from public registration */}
            <Select label="Role" name="role" value={formData.role} onChange={handleChange}>
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
            </Select>
            <Button type="submit" className="w-full" loading={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
