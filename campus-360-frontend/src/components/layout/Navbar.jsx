import { useLocation } from "react-router-dom";
import { Bell, Menu } from "lucide-react";

import useAuth from "../../auth/useAuth";

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();
  const location = useLocation();

  const pageTitle = {
    "/dashboard": "Dashboard",
    "/courses": "Courses",
    "/attendance/mark": "Mark Attendance",
    "/attendance/history": "Attendance History",
    "/attendance/report": "Attendance Report",
    "/marks/entry": "Marks Entry",
    "/marks/report": "Marks Report",
    "/marks/top-performers": "Top Performers",
    "/analytics/risk": "Student Risk Analytics",
    "/teacher/courses": "My Courses",
    "/teacher/dashboard": "Teacher Dashboard",
    "/admin/teachers": "Teachers",
  }[location.pathname] || "Overview";

  const pageSubtitle = {
    "/dashboard": "Welcome back",
    "/courses": "Manage learning modules",
    "/attendance/mark": "Record student attendance",
    "/attendance/history": "Review attendance history",
    "/attendance/report": "Track attendance records",
    "/marks/entry": "Enter student marks",
    "/marks/report": "View marks reports",
    "/marks/top-performers": "Spot outstanding learners",
    "/analytics/risk": "Monitor student risk signals",
    "/teacher/courses": "Manage your teaching courses",
    "/teacher/dashboard": "Teacher overview",
    "/admin/teachers": "Manage staff members",
  }[location.pathname] || "Campus 360";

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 px-4 py-3 shadow-sm backdrop-blur sm:px-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm md:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-900">{pageTitle}</h1>
            <p className="text-sm text-slate-500">{pageSubtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:text-slate-900"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600/10 text-sm font-semibold text-brand-700">
              {user?.email?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-800">{user?.email || "User"}</p>
              <p className="text-xs text-slate-500">{user?.role || "Member"}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;