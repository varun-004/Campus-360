import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { Card, CardContent } from "../ui/Card";
import Badge from "../ui/Badge";

const TopCoursesChart = ({
  courses = [],
  title = "Top Courses",
  description = "Enrollment trends by course",
}) => {
  const chartData = (courses || []).map((course) => ({
    name: course?.courseName || course?.name || "Course",
    value: course?.totalStudents ?? course?.students ?? course?.value ?? 0,
  }));

  return (
    <Card className="h-full border-0 shadow-none">
      <CardContent className="p-0">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-semibold text-slate-900">{title}</p>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          </div>
          <Badge variant="brand" dot>Live</Badge>
        </div>

        {chartData.length > 0 ? (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 8 }}>
                <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="3 3" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip cursor={{ fill: "rgba(79, 70, 229, 0.08)" }} contentStyle={{ borderRadius: "16px", borderColor: "#e2e8f0", boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)" }} />
                <Bar dataKey="value" fill="#4f46e5" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 text-sm text-slate-500">
            No chart data available yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TopCoursesChart;
