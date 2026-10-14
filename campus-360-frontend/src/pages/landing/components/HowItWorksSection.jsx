import {
  Building2,
  CalendarCheck2,
  TrendingUp,
  BrainCircuit,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";

const STEPS = [
  {
    step: "01",
    title: "Configure & Organize",
    role: "Administrators",
    description:
      "Set up campus departments, create accredited course modules, enroll student rosters, and assign designated faculty instructors in a structured system.",
    points: [
      "Create courses with instructor assignments",
      "Manage student rosters and faculty credentials",
      "Establish institutional academic grading scales"
    ],
    icon: Building2,
  },
  {
    step: "02",
    title: "Teach & Record Seamlessly",
    role: "Teachers & Faculty",
    description:
      "Instructors conduct classes, mark roll-call attendance in seconds with real-time tallying, and enter assessment marks with instant grade calculation.",
    points: [
      "1-click daily attendance marking per class",
      "Fast marks entry with automated validation",
      "Access student roster performance histories"
    ],
    icon: CalendarCheck2,
  },
  {
    step: "03",
    title: "Track Progress & Excel",
    role: "Students",
    description:
      "Students log in to view their up-to-the-minute attendance rates, individual assignment scores, overall semester GPA, and curriculum announcements 24/7.",
    points: [
      "Real-time visibility into attendance thresholds",
      "Clear feedback on coursework and exam marks",
      "Continuous GPA progress tracking across terms"
    ],
    icon: TrendingUp,
  },
  {
    step: "04",
    title: "Intervene Proactively with AI",
    role: "Advisors & Department Heads",
    description:
      "Campus 360's predictive machine learning identifies early signs of academic struggles, flagging students for targeted advising before exams approach.",
    points: [
      "Early warning flags for attendance drop-offs",
      "Explainable metrics highlighting contributing factors",
      "Prescriptive student improvement checklists"
    ],
    icon: BrainCircuit,
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50/70 border-y border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-semibold text-slate-700 shadow-xs">
            Simple 4-Step Academic Workflow
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How Campus 360 Works for Your Institution
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            Designed for simplicity and speed. From setting up the semester to graduation day, every stakeholder has a clear, intuitive path.
          </p>
        </div>

        {/* Step Cards Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition hover:border-brand-200 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-lg">
                      Step {s.step}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </div>

                  <span className="mt-4 inline-block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Primary: {s.role}
                  </span>
                  <h3 className="mt-1 text-base font-bold text-slate-900">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {s.description}
                  </p>
                </div>

                <div className="mt-4 border-t border-slate-100 pt-3">
                  <ul className="space-y-1.5 text-[11px] text-slate-600">
                    {s.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Link */}
        <div className="mt-10 text-center">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            Ready to experience the workflow? Create an account now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
