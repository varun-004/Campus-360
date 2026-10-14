import { Sparkles, ArrowUp, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const LandingFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm shadow-brand-500/20">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Campus 360
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              The modern academic operations platform unifying student records, course administration, 1-click attendance roll call, transparent gradebooks, and early ML risk analytics.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Campus 360 Academic Engine • Operational</span>
            </div>
          </div>

          {/* Navigation Links Column 1 */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Platform
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <a
                  href="#features"
                  onClick={(e) => handleNavClick(e, "#features")}
                  className="hover:text-white transition"
                >
                  Features Overview
                </a>
              </li>
              <li>
                <a
                  href="#preview"
                  onClick={(e) => handleNavClick(e, "#preview")}
                  className="hover:text-white transition"
                >
                  Interactive Preview
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleNavClick(e, "#how-it-works")}
                  className="hover:text-white transition"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#ai-intelligence"
                  onClick={(e) => handleNavClick(e, "#ai-intelligence")}
                  className="hover:text-white transition"
                >
                  AI Risk Radar
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleNavClick(e, "#faq")}
                  className="hover:text-white transition"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Role Solutions Column 2 */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Workspaces
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <a
                  href="#roles"
                  onClick={(e) => handleNavClick(e, "#roles")}
                  className="hover:text-white transition"
                >
                  Student Portal
                </a>
              </li>
              <li>
                <a
                  href="#roles"
                  onClick={(e) => handleNavClick(e, "#roles")}
                  className="hover:text-white transition"
                >
                  Teacher Command Center
                </a>
              </li>
              <li>
                <a
                  href="#roles"
                  onClick={(e) => handleNavClick(e, "#roles")}
                  className="hover:text-white transition"
                >
                  Institutional Admin
                </a>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition">
                  Course Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Access Column 3 */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Authentication
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link to="/login" className="hover:text-white transition">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition">
                  My Dashboard
                </Link>
              </li>
              <li className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Role-Based Access Control
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 sm:flex-row text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Campus 360. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">React • Vite • Tailwind CSS • Spring Boot</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-800/80 px-2.5 py-1 text-slate-300 transition hover:bg-slate-700 hover:text-white"
              aria-label="Scroll to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
