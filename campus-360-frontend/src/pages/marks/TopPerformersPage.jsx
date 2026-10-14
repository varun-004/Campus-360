import { useEffect, useMemo, useState } from "react";
import { Award, Medal, Search, Sparkles, Trophy } from "lucide-react";

import { getTopPerformers } from "../../services/marksService";
import AnimatedTableRow from "../../components/common/AnimatedTableRow";
import Table from "../../components/common/Table";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import {
  Badge,
  Card,
  CardContent,
  EmptyState,
  Input,
  PageHeader,
  PageHeaderSkeleton,
  StatCard,
  StatCardSkeleton,
  TableSkeleton,
} from "../../components/ui";

const getRankBadge = (index) => {
  if (index === 0) return { variant: "warning", label: "Gold" };
  if (index === 1) return { variant: "default", label: "Silver" };
  if (index === 2) return { variant: "info", label: "Bronze" };
  return null;
};

const TopPerformersPage = () => {
  useDocumentTitle("Top Performers");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getTopPerformers();
        setStudents(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load top performers");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredStudents = useMemo(() => {
    const query = searchTerm.toLowerCase();
    if (!query) return students;
    return students.filter((s) => s.studentName?.toLowerCase().includes(query));
  }, [students, searchTerm]);

  const topScore = students[0]?.averageMarks;
  const avgScore =
    students.length > 0
      ? students.reduce((sum, s) => sum + s.averageMarks, 0) / students.length
      : 0;

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeaderSkeleton />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
        <TableSkeleton rows={8} cols={4} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Academic excellence"
        title="Top Performers"
        description="Celebrate students with the highest average marks across all courses."
      />

      {students.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            label="Top Score"
            value={topScore?.toFixed(2) ?? "—"}
            icon={Trophy}
            description="Highest average marks"
            trend="up"
            trendLabel="Leader"
          />
          <StatCard
            label="Students Ranked"
            value={students.length}
            icon={Award}
            description="On the leaderboard"
            trend="neutral"
            trendLabel="Total"
          />
          <StatCard
            label="Class Average"
            value={avgScore.toFixed(2)}
            icon={Sparkles}
            description="Mean of top performers"
            trend="up"
            trendLabel="Benchmark"
          />
        </div>
      )}

      {students.length > 0 && (
        <div className="max-w-md">
          <Input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={Search}
          />
        </div>
      )}

      {filteredStudents.length === 0 ? (
        <EmptyState
          icon={Medal}
          title="No performers found"
          description={
            searchTerm
              ? "No students match your search."
              : "Top performer data is not available yet."
          }
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <tr>
                  <th className="px-4 py-3">Rank</th>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Average Marks</th>
                  <th className="px-4 py-3">Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredStudents.map((student, index) => {
                  const originalIndex = students.findIndex(
                    (s) => s.studentId === student.studentId,
                  );
                  const rankBadge = getRankBadge(originalIndex);

                  return (
                    <AnimatedTableRow key={student.studentId} index={index} className="hover:bg-slate-50/70">
                      <td className="px-4 py-3">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700 ring-1 ring-brand-100">
                          #{originalIndex + 1}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {student.studentName}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-lg font-semibold text-slate-900">
                          {student.averageMarks.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {rankBadge ? (
                          <Badge variant={rankBadge.variant}>{rankBadge.label}</Badge>
                        ) : (
                          <Badge variant="default">Ranked</Badge>
                        )}
                      </td>
                    </AnimatedTableRow>
                  );
                })}
              </tbody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TopPerformersPage;
