import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, ShieldCheck, LayoutDashboard } from "lucide-react";
import useAuth from "../../../auth/useAuth";

const CtaSection = () => {
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-white via-brand-50/30 to-brand-50/70 border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-4xl rounded-3xl border border-brand-200/80 bg-white p-8 sm:p-12 shadow-xl text-center overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div
            className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-64 w-96 -translate-x-1/2 rounded-full bg-brand-400/15 blur-3xl"
            aria-hidden="true"
          />

          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1 text-xs font-semibold text-brand-700 shadow-xs mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Get Started with Campus 360
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {user
              ? "Continue to Your Campus 360 Workspace"
              : "Ready to Modernize Your Academic Experience?"}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {user
              ? `You are currently signed in as ${user.email} (${user.role}). Jump right back into your courses, attendance records, and evaluations.`
              : "Whether you are a student tracking your GPA and attendance, or an instructor managing daily classroom operations, Campus 360 brings everything together."}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            {user ? (
              <Link
                to="/dashboard"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-brand-600/20 transition hover:bg-brand-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 sm:w-auto"
              >
                <LayoutDashboard className="h-4 w-4" />
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-brand-600/20 transition hover:bg-brand-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 sm:w-auto"
                >
                  Create Your Account
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 sm:w-auto"
                >
                  Sign In to Existing Account
                </Link>
              </>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 border-t border-slate-100 pt-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              JWT Secure Authentication
            </span>
            <span>•</span>
            <span>Instant Role Provisioning</span>
            <span>•</span>
            <span>Zero Configuration Required</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
