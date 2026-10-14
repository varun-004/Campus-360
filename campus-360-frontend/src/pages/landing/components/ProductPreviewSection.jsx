import { useState } from "react";
import {
  GraduationCap,
  Users,
  BookOpen,
  CalendarCheck2,
  BrainCircuit,
  CheckCircle2,
  Award,
  FileText
} from "lucide-react";

const TABS = [
  { id: "student", label: "Student Experience", icon: GraduationCap, badge: "Portal" },
  { id: "teacher", label: "Teacher Workflow", icon: CalendarCheck2, badge: "Roll Call & Marks" },
  { id: "admin", label: "Admin Oversight", icon: Users, badge: "Directory & Catalog" },
  { id: "ai", label: "AI Academic Radar", icon: BrainCircuit, badge: "Early Risk Detection" },
];

const ProductPreviewSection = () => {
  const [activeTab, setActiveTab] = useState("student");

  // Interactive Attendance Simulation for Teacher Tab
  const [attendanceList, setAttendanceList] = useState([
    { id: 1, name: "Alexander Wright", rollNo: "CS-2024-01", status: "PRESENT" },
    { id: 2, name: "Sophia Chen", rollNo: "CS-2024-02", status: "PRESENT" },
    { id: 3, name: "David Kim", rollNo: "CS-2024-03", status: "LATE" },
    { id: 4, name: "Maya Patel", rollNo: "CS-2024-04", status: "PRESENT" },
    { id: 5, name: "Lucas Martinez", rollNo: "CS-2024-05", status: "ABSENT" },
  ]);

  const toggleStudentStatus = (id, newStatus) => {
    setAttendanceList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const presentCount = attendanceList.filter((s) => s.status === "PRESENT").length;
  const attendanceRate = Math.round((presentCount / attendanceList.length) * 100);

  return (
    <section id="preview" className="relative bg-slate-50/60 py-16 sm:py-24 border-y border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-semibold text-slate-700 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
            Interactive Product Preview
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Experience Campus 360 in Action
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            Explore genuine workflows tailored for each role. Test the interactive elements below to see how students, teachers, and administrators stay aligned.
          </p>
        </div>

        {/* Tab Selection Navigation */}
        <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3" role="tablist" aria-label="Interactive preview modules">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
                  isActive
                    ? "bg-brand-600 text-white shadow-md shadow-brand-600/20"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-xs"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-brand-600"}`} aria-hidden="true" />
                <span>{tab.label}</span>
                <span
                  className={`hidden sm:inline-block rounded-md px-1.5 py-0.5 text-[10px] font-medium ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Preview Container Frame */}
        <div className="mt-8 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xl sm:rounded-3xl sm:p-6 lg:p-8">
          {/* TAB 1: STUDENT EXPERIENCE */}
          {activeTab === "student" && (
            <div
              id="tabpanel-student"
              role="tabpanel"
              aria-labelledby="tab-student"
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
                    Student Portal Experience
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    Academic Summary &amp; Progress Radar
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Dean&apos;s Honor Roll Standing
                </span>
              </div>

              {/* Student KPI Row */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4">
                  <span className="text-xs font-medium text-slate-500">Cumulative GPA</span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-slate-900">3.82</span>
                    <span className="text-xs font-semibold text-emerald-600">/ 4.00</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">Top 5% of department</p>
                </div>

                <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4">
                  <span className="text-xs font-medium text-slate-500">Attendance Rate</span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-slate-900">96.4%</span>
                  </div>
                  <p className="mt-1 text-[11px] text-emerald-600">Above 85% requirement</p>
                </div>

                <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4">
                  <span className="text-xs font-medium text-slate-500">Average Marks</span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-slate-900">89.5%</span>
                  </div>
                  <p className="mt-1 text-[11px] text-brand-600">Across 5 modules</p>
                </div>

                <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4">
                  <span className="text-xs font-medium text-slate-500">Enrolled Courses</span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-slate-900">5</span>
                    <span className="text-xs text-slate-500">Active</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">Fall Semester 2026</p>
                </div>
              </div>

              {/* Assessment Breakdown & AI Recommendation */}
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                  <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <Award className="h-4 w-4 text-brand-600" />
                    Recent Coursework &amp; Exam Results
                  </h4>
                  <div className="space-y-3">
                    {[
                      { subject: "Data Structures & Algorithms", code: "CS-201", score: 94, grade: "A" },
                      { subject: "Database Management Systems", code: "CS-302", score: 91, grade: "A" },
                      { subject: "Operating Systems Principles", code: "CS-305", score: 86, grade: "B+" },
                      { subject: "Computer Network Architecture", code: "CS-401", score: 88, grade: "A-" },
                    ].map((course) => (
                      <div key={course.code} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/80 p-3 text-sm">
                        <div>
                          <p className="font-semibold text-slate-800">{course.subject}</p>
                          <p className="text-xs text-slate-500">{course.code} • Final Assessment</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold text-slate-700">{course.score}%</span>
                          <span className="rounded-md bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700 ring-1 ring-inset ring-brand-200">
                            {course.grade}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-brand-200/80 bg-brand-50/40 p-5 shadow-xs">
                  <div className="flex items-center gap-2 text-brand-800 font-bold text-sm mb-2">
                    <BrainCircuit className="h-4 w-4 text-brand-600" />
                    AI Academic Recommendation
                  </div>
                  <p className="text-xs leading-relaxed text-slate-700">
                    &quot;Your theoretical assessment scores are exceptional. In Operating Systems, consistent attendance at weekly hands-on labs will solidify top-tier performance heading into finals.&quot;
                  </p>
                  <div className="mt-4 border-t border-brand-100 pt-3">
                    <span className="text-[11px] font-semibold text-brand-900 uppercase tracking-wider">
                      Suggested Actions
                    </span>
                    <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        Complete OS Memory Allocation lab
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        Maintain attendance in CS-401
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TEACHER WORKFLOW */}
          {activeTab === "teacher" && (
            <div
              id="tabpanel-teacher"
              role="tabpanel"
              aria-labelledby="tab-teacher"
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
                    Interactive Teacher Tool
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    Course Roll Call &amp; Marks Entry
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-lg bg-slate-100 px-3 py-1 font-semibold text-slate-700">
                    CS-302: Database Systems
                  </span>
                  <span className="rounded-lg bg-emerald-50 px-2.5 py-1 font-bold text-emerald-700">
                    Rate: {attendanceRate}%
                  </span>
                </div>
              </div>

              {/* Interactive Attendance Roll Call Table */}
              <div className="rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-600 flex justify-between items-center">
                  <span>Student Name &amp; ID (Click status to test live interaction)</span>
                  <span>Attendance Status Toggle</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {attendanceList.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3.5 hover:bg-slate-50/70 transition-colors">
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{student.name}</p>
                        <p className="text-xs text-slate-500">{student.rollNo}</p>
                      </div>

                      <div className="flex items-center gap-1.5" role="group" aria-label={`Attendance status for ${student.name}`}>
                        <button
                          type="button"
                          onClick={() => toggleStudentStatus(student.id, "PRESENT")}
                          className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                            student.status === "PRESENT"
                              ? "bg-emerald-600 text-white shadow-xs"
                              : "border border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          Present
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleStudentStatus(student.id, "LATE")}
                          className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                            student.status === "LATE"
                              ? "bg-amber-500 text-white shadow-xs"
                              : "border border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          Late
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleStudentStatus(student.id, "ABSENT")}
                          className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                            student.status === "ABSENT"
                              ? "bg-red-600 text-white shadow-xs"
                              : "border border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          Absent
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fast Marks Entry Preview */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-brand-600" />
                    <span className="text-sm font-semibold text-slate-800">
                      Midterm Marks Entry Workflow
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">Maximum: 100 Marks</span>
                </div>
                <p className="text-xs text-slate-600">
                  Teachers enter student scores once; Campus 360 automatically computes grade curves, flags anomalous scores, and updates student GPAs across the platform.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: ADMIN OVERSIGHT */}
          {activeTab === "admin" && (
            <div
              id="tabpanel-admin"
              role="tabpanel"
              aria-labelledby="tab-admin"
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
                    Institutional Management
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    Campus Roster &amp; Catalog Administration
                  </h3>
                </div>
                <div className="flex gap-2">
                  <span className="rounded-lg bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                    48 Active Courses
                  </span>
                  <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    42 Faculty Members
                  </span>
                </div>
              </div>

              {/* Admin Department Catalog Preview */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 p-4 shadow-xs">
                  <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-brand-600" />
                    Course Roster &amp; Instructor Allocations
                  </h4>
                  <div className="space-y-2.5 text-xs">
                    {[
                      { code: "CS-101", title: "Introduction to Computing", teacher: "Dr. Evelyn Reed", capacity: "120/120" },
                      { code: "CS-205", title: "Object-Oriented Architecture", teacher: "Prof. Alan Vance", capacity: "85/90" },
                      { code: "CS-310", title: "Cloud Systems & DevOps", teacher: "Dr. Sarah Jenkins", capacity: "64/70" },
                    ].map((item) => (
                      <div key={item.code} className="rounded-lg bg-slate-50 p-2.5 flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-slate-900">{item.title}</p>
                          <p className="text-slate-500">{item.code} • {item.teacher}</p>
                        </div>
                        <span className="rounded bg-white px-2 py-0.5 font-mono text-[11px] border border-slate-200 text-slate-700">
                          {item.capacity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 p-4 shadow-xs">
                  <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <Award className="h-4 w-4 text-emerald-600" />
                    Campus Top Academic Performers
                  </h4>
                  <div className="space-y-2.5 text-xs">
                    {[
                      { rank: "#1", name: "Elena Rostova", gpa: "3.98", program: "Computer Science" },
                      { rank: "#2", name: "Kavita Rao", gpa: "3.94", program: "Information Technology" },
                      { rank: "#3", name: "Liam O'Connor", gpa: "3.91", program: "Software Engineering" },
                    ].map((top) => (
                      <div key={top.name} className="rounded-lg bg-slate-50 p-2.5 flex justify-between items-center">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600/10 text-xs font-bold text-brand-700">
                            {top.rank}
                          </span>
                          <div>
                            <p className="font-semibold text-slate-900">{top.name}</p>
                            <p className="text-slate-500">{top.program}</p>
                          </div>
                        </div>
                        <span className="font-bold text-emerald-700">{top.gpa} GPA</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AI ACADEMIC RADAR */}
          {activeTab === "ai" && (
            <div
              id="tabpanel-ai"
              role="tabpanel"
              aria-labelledby="tab-ai"
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
                    Predictive Machine Learning Engine
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    Proactive Student Risk Analytics Radar
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-200">
                  <BrainCircuit className="h-3.5 w-3.5 text-brand-600" />
                  ML Ensemble v1.4
                </span>
              </div>

              {/* AI Risk Table */}
              <div className="rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-600 grid grid-cols-4">
                  <span>Student Name</span>
                  <span>Attendance %</span>
                  <span>Marks Avg</span>
                  <span>Risk Classification</span>
                </div>
                <div className="divide-y divide-slate-100 text-sm">
                  {[
                    { name: "Jordan Bailey", att: "61.2%", marks: "52.4%", level: "HIGH RISK", color: "bg-red-50 text-red-700 border-red-200" },
                    { name: "Maya Sterling", att: "74.0%", marks: "64.8%", level: "MODERATE", color: "bg-amber-50 text-amber-700 border-amber-200" },
                    { name: "Devon Clark", att: "94.5%", marks: "86.0%", level: "LOW RISK", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                    { name: "Priya Sharma", att: "98.0%", marks: "93.5%", level: "SAFE", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                  ].map((row) => (
                    <div key={row.name} className="px-4 py-3 grid grid-cols-4 items-center">
                      <span className="font-medium text-slate-900">{row.name}</span>
                      <span className="text-slate-600">{row.att}</span>
                      <span className="text-slate-600">{row.marks}</span>
                      <div>
                        <span className={`inline-block rounded-md border px-2.5 py-0.5 text-xs font-bold ${row.color}`}>
                          {row.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Explainability Callout */}
              <div className="rounded-xl border border-slate-900 bg-slate-900 text-white p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BrainCircuit className="h-4 w-4 text-brand-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Why does Campus 360 flag students?
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The model analyzes correlated factors — principally attendance consistency (weight 45%) and assessment trend stability (weight 35%). By detecting drop-offs weeks before semester exams, academic advisors can intervene with personalized support before academic standing is harmed.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductPreviewSection;
