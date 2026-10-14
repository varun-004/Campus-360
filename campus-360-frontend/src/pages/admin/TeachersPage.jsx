import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Users2 } from "lucide-react";

import { getAllTeachers, deleteTeacher } from "../../services/adminTeacherService";
import AnimatedTableRow from "../../components/common/AnimatedTableRow";
import ConfirmModal from "../../components/common/ConfirmModal";
import Table from "../../components/common/Table";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import notify from "../../utils/toast";
import {
  Badge,
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

function TeachersPage() {
  useDocumentTitle("Teachers Management");
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const data = await getAllTeachers();
        setTeachers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadTeachers();
  }, []);

  const departments = useMemo(
    () => [...new Set(teachers.map((t) => t.department).filter(Boolean))],
    [teachers],
  );

  const filteredTeachers = useMemo(() => {
    const query = searchTerm.toLowerCase();
    return teachers.filter((teacher) => {
      const matchesSearch =
        !query ||
        `${teacher.firstName} ${teacher.lastName}`.toLowerCase().includes(query) ||
        teacher.email?.toLowerCase().includes(query) ||
        teacher.department?.toLowerCase().includes(query);
      const matchesDept = !departmentFilter || teacher.department === departmentFilter;
      return matchesSearch && matchesDept;
    });
  }, [teachers, searchTerm, departmentFilter]);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      await deleteTeacher(deleteTarget.id);
      setTeachers((prev) => prev.filter((teacher) => teacher.id !== deleteTarget.id));
      notify.success("Teacher deleted successfully");
    } catch (error) {
      console.error(error);
      notify.error(error.response?.data?.message || "Failed to delete teacher");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Administration"
        title="Teachers Management"
        description="Manage teacher accounts, departments, and assignments from one place."
      >
        <Link to="/admin/teachers/add">
          <Button leftIcon={Plus}>Add Teacher</Button>
        </Link>
      </PageHeader>

      {!loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            label="Total Teachers"
            value={teachers.length}
            icon={Users2}
            description="Active educators in the system"
            trend="neutral"
            trendLabel="Roster"
          />
          <StatCard
            label="Departments"
            value={departments.length}
            icon={Users2}
            description="Unique academic departments"
            trend="neutral"
            trendLabel="Organized"
          />
          <StatCard
            label="Showing"
            value={filteredTeachers.length}
            icon={Search}
            description="Results matching your filters"
            trend="neutral"
            trendLabel="Filtered"
          />
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Search &amp; filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-[1fr_220px]">
            <Input
              type="text"
              placeholder="Search by name, email, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={Search}
            />
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
            >
              <option value="">All departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <TableSkeleton rows={6} cols={4} />
      ) : filteredTeachers.length === 0 ? (
        <EmptyState
          icon={Users2}
          title="No teachers found"
          description={
            searchTerm || departmentFilter
              ? "Try adjusting your search or filter criteria."
              : "Get started by adding your first teacher to the roster."
          }
          action={
            !searchTerm && !departmentFilter ? (
              <Link to="/admin/teachers/add">
                <Button leftIcon={Plus}>Add Teacher</Button>
              </Link>
            ) : null
          }
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Teacher roster</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredTeachers.map((teacher, index) => (
                  <AnimatedTableRow key={teacher.id} index={index} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {teacher.firstName} {teacher.lastName}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{teacher.email}</td>
                    <td className="px-4 py-3">
                      <Badge variant="brand">{teacher.department}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Link to={`/admin/teachers/edit/${teacher.id}`}>
                          <Button variant="secondary" size="sm">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => setDeleteTarget(teacher)}
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
        title="Delete teacher"
        message={`Remove ${deleteTarget?.firstName || "this teacher"} from the roster? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={deleting}
      />
    </div>
  );
}

export default TeachersPage;
