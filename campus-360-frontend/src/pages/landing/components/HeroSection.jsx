import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Users,
  CalendarCheck2,
  GraduationCap,
  BrainCircuit,
  CheckCircle2,
  Search,
  BookOpen
} from "lucide-react";
import useAuth from "../../../auth/useAuth";

const HeroSection = () => {
  const { user } = useAuth();

  const handleScrollToPreview = (e) => {
    e.preventDefault();
    const element = document.querySelector("#preview");
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-28">
      {/* Subtle Background Radial Gradients */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-brand-100/40 via-indigo-50/30 to-purple-50/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-brand-50/80 px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-xs backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
            <span>Next-Generation Academic Management Platform</span>
          </div>

          {/* Main Headline */}
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-[1.12]">
            One Unified Platform for Academic Excellence &amp; Student Success.
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8">
            Campus 360 brings together student records, courses, real-time attendance, grade tracking, and predictive AI risk analytics in one fast, intuitive workspace designed for students, teachers, and administrators.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            {user ? (
              <Link
                to="/dashboard"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-brand-600/20 transition-all hover:bg-brand-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 active:bg-brand-800 sm:w-auto"
              >
                Go to Your Dashboard
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-brand-600/20 transition-all hover:bg-brand-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 active:bg-brand-800 sm:w-auto"
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 active:bg-slate-100 sm:w-auto"
                >
                  Sign In to Account
                </Link>
              </>
            )}

            <a
              href="#preview"
              onClick={handleScrollToPreview}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 sm:w-auto"
            >
              Explore Live Preview
            </a>
          </div>

          {/* Quick Value Indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
              Role-Based Access Control (RBAC)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
              1-Click Attendance Roll Call
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
              Integrated AI Academic Risk Radar
            </span>
          </div>
        </div>

        {/* Realistic Dashboard Preview Frame */}
        <div className="mt-12 sm:mt-16">
          <div className="relative mx-auto max-w-5xl rounded-2xl border border-slate-200/80 bg-white p-2 shadow-2xl ring-1 ring-slate-900/5 sm:rounded-3xl sm:p-3">
            {/* Window Top Bar / Controls */}
            <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2.5 sm:px-4">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1 text-xs text-slate-600 font-mono">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                https://campus360.edu/dashboard
              </div>
              <div className="text-[11px] font-medium text-slate-500 hidden sm:block">
                Academic Session: Active
              </div>
            </div>

            {/* Dashboard Mockup Content */}
            <div className="overflow-hidden rounded-xl bg-slate-50/70 p-4 sm:p-6">
              {/* Header inside Mockup */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200/80 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                      Campus 360 Workspace
                    </span>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                      Live
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                    Executive Academic Overview
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600 shadow-xs">
                    <Search className="h-3.5 w-3.5 text-slate-400" />
                    <span>Quick lookup...</span>
                  </div>
                  <span className="rounded-lg bg-brand-600 px-3 py-1 text-xs font-medium text-white">
                    Export Report
                  </span>
                </div>
              </div>

              {/* 4 Metric Cards */}
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-medium">Total Students</span>
                    <Users className="h-4 w-4 text-brand-600" />
                  </div>
                  <p className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">1,248</p>
                  <p className="mt-0.5 text-[11px] text-emerald-600 font-medium">↑ Active Roster</p>
                </div>

                <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-medium">Attendance Rate</span>
                    <CalendarCheck2 className="h-4 w-4 text-emerald-600" />
                  </div>
                  <p className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">94.2%</p>
                  <p className="mt-0.5 text-[11px] text-emerald-600 font-medium">↑ Healthy range</p>
                </div>

                <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-medium">Average Marks</span>
                    <GraduationCap className="h-4 w-4 text-brand-600" />
                  </div>
                  <p className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">82.4%</p>
                  <p className="mt-0.5 text-[11px] text-brand-600 font-medium">↑ Stable trend</p>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3.5 shadow-xs">
                  <div className="flex items-center justify-between text-amber-700">
                    <span className="text-xs font-semibold">AI Risk Alerts</span>
                    <BrainCircuit className="h-4 w-4 text-amber-600" />
                  </div>
                  <p className="mt-1 text-xl font-bold text-amber-800 sm:text-2xl">3 Flagged</p>
                  <p className="mt-0.5 text-[11px] text-amber-700 font-medium">Proactive review</p>
                </div>
              </div>

              {/* Dual Panels in Mockup */}
              <div className="mt-4 grid gap-4 lg:grid-cols-3">
                {/* Courses & Activity */}
                <div className="lg:col-span-2 rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-brand-600" />
                      <span className="text-sm font-semibold text-slate-800">
                        Top Active Modules
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">Fall Semester</span>
                  </div>

                  <div className="mt-3 space-y-2.5">
                    {[
                      { name: "Computer Architecture", students: 120, avg: "88%", state: "Full" },
                      { name: "Database Engineering", students: 95, avg: "84%", state: "Enrolling" },
                      { name: "Data Structures & Algorithms", students: 110, avg: "81%", state: "Active" },
                    ].map((c) => (
                      <div key={c.name} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs">
                        <div>
                          <p className="font-semibold text-slate-800">{c.name}</p>
                          <p className="text-[11px] text-slate-500">{c.students} enrolled students</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-slate-700">{c.avg} avg</span>
                          <span className="rounded bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
                            {c.state}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Risk Quick Panel */}
                <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <BrainCircuit className="h-4 w-4 text-brand-600" />
                    <span className="text-sm font-semibold text-slate-800">
                      Predictive Radar
                    </span>
                  </div>
                  <div className="mt-3 space-y-2.5 text-xs">
                    <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-2.5">
                      <div className="flex justify-between font-semibold text-amber-800">
                        <span>Marcus Vance</span>
                        <span className="rounded bg-amber-200/80 px-1.5 py-0.2 text-[10px]">Moderate</span>
                      </div>
                      <p className="mt-1 text-[11px] text-amber-700">
                        Attendance dropped to 68% in Database Systems.
                      </p>
                    </div>

                    <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-2.5">
                      <div className="flex justify-between font-semibold text-emerald-800">
                        <span>Elena Rostova</span>
                        <span className="rounded bg-emerald-200/80 px-1.5 py-0.2 text-[10px]">Top 5%</span>
                      </div>
                      <p className="mt-1 text-[11px] text-emerald-700">
                        98% attendance, 3.92 GPA. Recommended for TA role.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
