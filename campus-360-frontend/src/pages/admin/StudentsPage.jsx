import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Users2, GraduationCap } from "lucide-react";

import { getAllStudents, deleteStudent } from "../../services/studentService";
import AnimatedTableRow from "../../components/common/AnimatedTableRow";
import ConfirmModal from "../../components/common/ConfirmModal";
import Table from "../../components/common/Table";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import notify from "../../utils/toast";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  EmptyState,
  Input,
  PageHeader,
  StatCard,
  TableSkeleton,
} from "../../components/ui";

function StudentsPage() {
  useDocumentTitle("Students Management");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await getAllStudents();
        setStudents(data);
      } catch (error) {
        console.error(error);
        notify.error("Failed to load students");
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    const query = searchTerm.toLowerCase();
    return students.filter((student) => {
      const matchesSearch =
        !query ||
        student.name?.toLowerCase().includes(query) ||
        student.email?.toLowerCase().includes(query);
      return matchesSearch;
    });
  }, [students, searchTerm]);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      await deleteStudent(deleteTarget.id);
      setStudents((prev) => prev.filter((student) => student.id !== deleteTarget.id));
      notify.success("Student deleted successfully");
    } catch (error) {
      console.error(error);
      notify.error(error.response?.data?.message || "Failed to delete student");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Administration"
        title="Students Management"
        description="Manage student accounts and profiles from one place."
      >
        <Link to="/admin/students/add">
          <Button leftIcon={Plus}>Add Student</Button>
        </Link>
      </PageHeader>

      {!loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          <StatCard
            label="Total Students"
            value={students.length}
            icon={GraduationCap}
            description="Active students in the system"
            trend="neutral"
            trendLabel="Enrolled"
          />
          <StatCard
            label="Showing"
            value={filteredStudents.length}
            icon={Search}
            description="Results matching your filters"
            trend="neutral"
            trendLabel="Filtered"
          />
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-md">
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={Search}
            />
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <TableSkeleton rows={6} cols={3} />
      ) : filteredStudents.length === 0 ? (
        <EmptyState
          icon={Users2}
          title="No students found"
          description={
            searchTerm
              ? "Try adjusting your search criteria."
              : "Get started by adding your first student."
          }
          action={
            !searchTerm ? (
              <Link to="/admin/students/add">
                <Button leftIcon={Plus}>Add Student</Button>
              </Link>
            ) : null
          }
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Student Roster</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredStudents.map((student, index) => (
                  <AnimatedTableRow key={student.id} index={index} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {student.name}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{student.email}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Link to={`/admin/students/edit/${student.id}`}>
                          <Button variant="secondary" size="sm">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => setDeleteTarget(student)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </AnimatedTableRow>
                ))}
              </tbody>
            </Table>
          </CardContent>
        </Card>
      )}

      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete student"
        message={`Remove ${deleteTarget?.name || "this student"}? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={deleting}
      />
    </div>
  );
}

export default StudentsPage;
