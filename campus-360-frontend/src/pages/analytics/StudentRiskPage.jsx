import { useEffect, useMemo, useState } from "react";
import { RefreshCw, Search, ShieldAlert, Users2 } from "lucide-react";

import { getStudentRisks } from "../../services/analyticsService";
import AnimatedTableRow from "../../components/common/AnimatedTableRow";
import Table from "../../components/common/Table";
import useDocumentTitle from "../../hooks/useDocumentTitle";
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
  PageHeaderSkeleton,
  StatCard,
  StatCardSkeleton,
  TableSkeleton,
} from "../../components/ui";

const getRiskVariant = (risk) => {
  switch (risk) {
    case "LOW":
    case "SAFE":
      return "success";
    case "MEDIUM":
    case "WARNING":
      return "warning";
    case "HIGH":
    case "CRITICAL":
      return "danger";
    default:
      return "default";
  }
};

const StudentRiskPage = () => {
  useDocumentTitle("Student Risk Analytics");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("");

  const loadData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError("");

    try {
      const data = await getStudentRisks();
      setStudents(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load student risk analytics");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchRiskData = async () => {
      try {
        const data = await getStudentRisks();
        if (isMounted) setStudents(data);
      } catch (err) {
        console.error(err);
        if (isMounted) setError("Failed to load student risk analytics");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchRiskData();

    return () => {
      isMounted = false;
    };
  }, []);

  const riskCounts = useMemo(() => {
    const counts = { high: 0, medium: 0, low: 0 };
    students.forEach((s) => {
      const level = s.riskLevel?.toUpperCase();
      if (level === "HIGH" || level === "CRITICAL") counts.high += 1;
      else if (level === "MEDIUM" || level === "WARNING") counts.medium += 1;
      else counts.low += 1;
    });
    return counts;
  }, [students]);

  const filteredStudents = useMemo(() => {
    const query = searchTerm.toLowerCase();
    return students.filter((student) => {
      const matchesSearch = !query || student.studentName?.toLowerCase().includes(query);
      const matchesRisk = !riskFilter || student.riskLevel === riskFilter;
      return matchesSearch && matchesRisk;
    });
  }, [students, searchTerm, riskFilter]);

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeaderSkeleton />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
        <TableSkeleton rows={8} cols={4} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
        <Button leftIcon={RefreshCw} onClick={() => loadData()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Analytics"
        title="Student Risk Analytics"
        description="Identify students who may need academic intervention based on attendance and marks."
      >
        <Button
          variant="secondary"
          leftIcon={RefreshCw}
          onClick={() => loadData(true)}
          loading={refreshing}
        >
          Refresh
        </Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Students"
          value={students.length}
          icon={Users2}
          description="Students analyzed"
          trend="neutral"
          trendLabel="Monitored"
        />
        <StatCard
          label="High Risk"
          value={riskCounts.high}
          icon={ShieldAlert}
          description="Requires immediate attention"
          trend="down"
          trendLabel="Critical"
        />
        <StatCard
          label="Medium Risk"
          value={riskCounts.medium}
          icon={ShieldAlert}
          description="Needs monitoring"
          trend="neutral"
          trendLabel="Warning"
        />
        <StatCard
          label="Low Risk"
          value={riskCounts.low}
          icon={ShieldAlert}
          description="On track academically"
          trend="up"
          trendLabel="Healthy"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search &amp; filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-[1fr_200px]">
            <Input
              type="text"
              placeholder="Search by student name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={Search}
            />
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
            >
              <option value="">All risk levels</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
              <option value="MEDIUM">Medium</option>
              <option value="WARNING">Warning</option>
              <option value="LOW">Low</option>
              <option value="SAFE">Safe</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {filteredStudents.length === 0 ? (
        <EmptyState
          icon={ShieldAlert}
          title="No risk data found"
          description={
            searchTerm || riskFilter
              ? "Try adjusting your search or filter."
              : "No risk analytics available yet."
          }
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <tr>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Attendance %</th>
                  <th className="px-4 py-3">Average Marks</th>
                  <th className="px-4 py-3">Risk Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredStudents.map((student, index) => (
                  <AnimatedTableRow key={student.studentId} index={index} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {student.studentName}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {student.attendance.toFixed(2)}%
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {student.marks.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={getRiskVariant(student.riskLevel)}>
                        {student.riskLevel}
                      </Badge>
                    </td>
                  </AnimatedTableRow>
                ))}
              </tbody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentRiskPage;
