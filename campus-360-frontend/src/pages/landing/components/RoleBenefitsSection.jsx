import {
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  CalendarCheck2
} from "lucide-react";
import { Link } from "react-router-dom";

const ROLES = [
  {
    role: "Students",
    badge: "Learner Portal",
    title: "Take Control of Your Academic Journey",
    description:
      "A dedicated, transparent dashboard giving you 24/7 visibility into your grades, attendance thresholds, and personalized academic guidance.",
    icon: GraduationCap,
    accentBorder: "border-brand-200",
    buttonText: "Register as a Student",
    buttonLink: "/register",
    capabilities: [
      {
        title: "Live GPA & Marks Transparency",
        desc: "Instant access to all subject scores, assessment breakdowns, and GPA calculations."
      },
      {
        title: "Attendance Compliance Tracking",
        desc: "Monitor your attendance percentage in real-time to always meet required thresholds."
      },
      {
        title: "AI Academic Intelligence",
        desc: "Get personalized diagnostic insights, identified strengths, and improvement action items."
      },
      {
        title: "Full Mobile Optimization",
        desc: "Check your academic status on your phone between classes with zero friction."
      }
    ]
  },
  {
    role: "Teachers & Faculty",
    badge: "Instruction Hub",
    title: "Streamline Classroom Management & Grading",
    description:
      "Spend less time on administrative bureaucracy and more time teaching. Complete attendance and grading in seconds.",
    icon: CalendarCheck2,
    accentBorder: "border-indigo-200",
    buttonText: "Register as Faculty",
    buttonLink: "/register",
    capabilities: [
      {
        title: "Fast 1-Click Roll Call",
        desc: "Record daily attendance per course in seconds with automated percentage calculations."
      },
      {
        title: "Direct Marks Entry & Review",
        desc: "Enter assessment grades with instant input validation and view past submission history."
      },
      {
        title: "Assigned Courses & Roster",
        desc: "Quick access to all assigned modules, learner counts, and course syllabi."
      },
      {
        title: "Early Student Support",
        desc: "Identify learners who need extra academic assistance before midterm exams arrive."
      }
    ]
  },
  {
    role: "Administrators",
    badge: "Operations Center",
    title: "Total Institutional Oversight & Governance",
    description:
      "Comprehensive management over faculties, students, curriculum courses, and predictive institutional health analytics.",
    icon: ShieldCheck,
    accentBorder: "border-slate-300",
    buttonText: "Sign In as Administrator",
    buttonLink: "/login",
    capabilities: [
      {
        title: "Complete User & Faculty Directory",
        desc: "Add, edit, and organize students and teachers with secure role authorization."
      },
      {
        title: "Course Catalog Governance",
        desc: "Build new course modules, allocate instructors, and monitor capacity allocations."
      },
      {
        title: "Student Risk Analytics Radar",
        desc: "Filter and identify at-risk students across departments by attendance and test trends."
      },
      {
        title: "Top Performers & Honors Rankings",
        desc: "Spotlight top academic talent across programs with automated merit leaderboards."
      }
    ]
  }
];

const RoleBenefitsSection = () => {
  return (
    <section id="roles" className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-brand-50/80 px-3.5 py-1 text-xs font-semibold text-brand-700 shadow-xs">
            Role-Based Workspaces
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Tailored Experiences for Every Campus Role
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            Every persona on Campus 360 has a purpose-built workspace designed specifically around their daily responsibilities.
          </p>
        </div>

        {/* 3 Role Columns */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {ROLES.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.role}
                className={`flex flex-col justify-between rounded-2xl border ${r.accentBorder} bg-white p-6 sm:p-8 shadow-sm transition hover:shadow-lg`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {r.badge}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    For {r.role}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {r.description}
                  </p>

                  <div className="mt-6 space-y-4 border-t border-slate-100 pt-6">
                    {r.capabilities.map((cap, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-slate-800">{cap.title}</p>
                          <p className="text-[11px] text-slate-500 leading-snug mt-0.5">{cap.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-6">
                  <Link
                    to={r.buttonLink}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-3 text-xs font-bold text-slate-800 shadow-xs transition hover:bg-brand-600 hover:text-white hover:border-brand-600"
                  >
                    <span>{r.buttonText}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RoleBenefitsSection;
