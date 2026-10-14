import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  BarChart3,
  CalendarCheck2,
  ClipboardList,
  GraduationCap,
  History,
  Search,
  Users2,
} from "lucide-react";

import { getCourseStudents } from "../../services/teacherService";
import Table from "../../components/common/Table";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  EmptyState,
  Input,
  PageHeader,
  StatCard,
  TableSkeleton,
} from "../../components/ui";

function TeacherCourseDetails() {
  useDocumentTitle("Course Details");
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await getCourseStudents(courseId);
        setStudents(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchStudents();
    }
  }, [courseId]);

  const filteredStudents = useMemo(
    () =>
      students.filter(
        (s) =>
          s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.email?.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [students, searchTerm],
  );

  const actionButtons = [
    {
      label: "Attendance",
      icon: CalendarCheck2,
      path: `/teacher/course/${courseId}/attendance`,
      variant: "primary",
    },
    {
      label: "Marks",
      icon: GraduationCap,
      path: `/teacher/course/${courseId}/marks`,
      variant: "secondary",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      path: `/teacher/course/${courseId}/analytics`,
      variant: "secondary",
    },
    {
      label: "Marks History",
      icon: History,
      path: `/teacher/course/${courseId}/marks-history`,
      variant: "outline",
    },
    {
      label: "Attendance History",
      icon: ClipboardList,
      path: `/teacher/course/${courseId}/attendance-history`,
      variant: "outline",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Course workspace"
        title="Course Students"
        description="View enrolled students and navigate to course management tools."
      >
        <div className="flex flex-wrap gap-2">
          {actionButtons.slice(0, 3).map(({ label, icon: Icon, path, variant }) => (
            <Button key={label} variant={variant} leftIcon={Icon} onClick={() => navigate(path)}>
              {label}
            </Button>
          ))}
        </div>
      </PageHeader>

      {!loading && (
        <StatCard
          label="Enrolled Students"
          value={students.length}
          icon={Users2}
          description="Students in this course"
          trend="up"
          trendLabel="Active"
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle>Quick actions</CardTitle>
          <CardDescription>Access all course management tools.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {actionButtons.map(({ label, icon: Icon, path, variant }) => (
            <Button key={label} variant={variant} leftIcon={Icon} onClick={() => navigate(path)}>
              {label}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Student roster</CardTitle>
            <CardDescription>All students enrolled in this course.</CardDescription>
          </div>
          <div className="w-full max-w-xs">
            <Input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={Search}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-4">
              <TableSkeleton rows={5} cols={2} />
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={Users2}
                title="No students found"
                description={
                  searchTerm
                    ? "No students match your search."
                    : "No students are enrolled in this course yet."
                }
              />
            </div>
          ) : (
            <Table>
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3 font-medium text-slate-900">{student.name}</td>
                    <td className="px-4 py-3 text-slate-600">{student.email}</td>
                    <td className="px-4 py-3">
                      <Badge variant="success" dot>
                        Enrolled
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default TeacherCourseDetails;
