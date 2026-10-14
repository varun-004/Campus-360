import {
  Users,
  BookOpen,
  CalendarCheck2,
  GraduationCap,
  LayoutDashboard,
  BrainCircuit,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";

const FEATURES = [
  {
    icon: Users,
    title: "Student Management",
    category: "Profiles & Rosters",
    description:
      "Maintain a centralized student directory with academic histories, enrollment status, and profile records. Fast search and filters help staff find student records instantly.",
    highlights: [
      "Full student directory with real-time search",
      "Academic record tracking by semester",
      "Easy profile updates and administrative controls"
    ],
    badgeColor: "brand"
  },
  {
    icon: BookOpen,
    title: "Course Catalog & Allocation",
    category: "Curriculum Management",
    description:
      "Organize course offerings, assign faculty members, manage learner capacities, and track syllabus modules across all university departments without conflicting schedules.",
    highlights: [
      "Modular course catalog with faculty assignments",
      "Student enrollment tracking per section",
      "Structured course details and student counts"
    ],
    badgeColor: "brand"
  },
  {
    icon: CalendarCheck2,
    title: "Real-Time Attendance Tracking",
    category: "Daily Operations",
    description:
      "Streamline daily attendance into a 1-click process for teachers. Automatic percentage computations keep students and academic advisors informed with zero delay.",
    highlights: [
      "Fast daily roll call (Present, Absent, Late)",
      "Instant attendance percentage calculations",
      "Complete historical audit trails by course"
    ],
    badgeColor: "brand"
  },
  {
    icon: GraduationCap,
    title: "Marks, Grading & GPA Engine",
    category: "Academic Evaluations",
    description:
      "Record marks by subject assessment, compute weighted course averages and GPAs automatically, and celebrate top performers on transparent merit rankings.",
    highlights: [
      "Frictionless assessment score entry for teachers",
      "Automated GPA and cumulative average metrics",
      "Top performers recognition and merit reports"
    ],
    badgeColor: "brand"
  },
  {
    icon: LayoutDashboard,
    title: "Unified Role-Based Dashboards",
    category: "Personalized Workspaces",
    description:
      "Students, faculty, and administrators each access dedicated, distraction-free workspaces tailored to their unique responsibilities, secured by JWT and role authorization.",
    highlights: [
      "Tailored student portal with GPA & attendance radar",
      "Teacher command center for assigned courses & tasks",
      "Executive institutional oversight for administrators"
    ],
    badgeColor: "brand"
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Risk Intelligence",
    category: "Predictive Analytics",
    description:
      "A machine learning engine correlates attendance drops with performance patterns, classifying risk levels and offering explainable recommendations for proactive guidance.",
    highlights: [
      "Automated classification into Low, Moderate, & High risk",
      "Feature explainability revealing underlying factors",
      "Personalized student action plans and improvement checklists"
    ],
    badgeColor: "brand"
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-brand-50/80 px-3.5 py-1 text-xs font-semibold text-brand-700 shadow-xs">
            Comprehensive Platform Capabilities
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything You Need to Run Modern Academic Operations
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            Say goodbye to disjointed spreadsheets, fragmented portals, and disconnected grading sheets. Campus 360 delivers an integrated platform built on robust engineering.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
                      {feature.category}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {feature.description}
                  </p>

                  <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600">
                    {feature.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Security / Trust Assurance */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Enterprise Security &amp; RBAC Guaranteed</h4>
              <p className="text-xs text-slate-500">Every route and database operation is protected with JWT authentication and strict role isolation.</p>
            </div>
          </div>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition"
          >
            Start Managing Today
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
