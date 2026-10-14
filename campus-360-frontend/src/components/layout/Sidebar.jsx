import { NavLink } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  CalendarCheck2,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Sparkles,
  Users2,
  BrainCircuit,
  FileBarChart2,
} from "lucide-react";

import useAuth from "../../auth/useAuth";

const Sidebar = ({ onClose }) => {
  const { user, logout } = useAuth();

  const baseLinkClass =
    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200";

  const linkClass = ({ isActive }) =>
    `${baseLinkClass} ${
      isActive
        ? "bg-brand-600/20 text-white shadow-sm ring-1 ring-white/10"
        : "text-slate-300 hover:bg-white/10 hover:text-white"
    }`;

  const renderMenuGroup = (title, items) => (
    <div className="space-y-1.5">
      <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
        {title}
      </p>
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink key={to} to={to} className={linkClass} onClick={onClose}>
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </NavLink>
      ))}
    </div>
  );

  const commonItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ];

  const adminItems = [
    { to: "/courses", label: "Courses", icon: BookOpen },
    { to: "/admin/students", label: "Students", icon: GraduationCap },
    { to: "/admin/teachers", label: "Teachers", icon: Users2 },
    { to: "/marks/top-performers", label: "Top Performers", icon: Sparkles },
    { to: "/analytics/risk", label: "Student Risk Analytics", icon: BarChart3 },
  ];

  const studentItems = [
    { to: "/attendance/report", label: "My Attendance", icon: ClipboardList },
    { to: "/marks/report", label: "My Marks", icon: GraduationCap },
    { to: "/student/ai-insights", label: "AI Intelligence", icon: BrainCircuit },
  ];

  const teacherItems = [
    { to: "/teacher/dashboard", label: "Teacher Dashboard", icon: LayoutDashboard },
    { to: "/teacher/courses", label: "My Courses", icon: BookOpen },
    { to: "/attendance/mark", label: "Mark Attendance", icon: CalendarCheck2 },
    { to: "/marks/entry", label: "Enter Marks", icon: GraduationCap },
  ];

  return (
    <div className="flex h-full flex-col bg-slate-950 text-white">
      <div className="px-5 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-600/20 text-brand-300 ring-1 ring-white/10">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight">Campus 360</p>
            <p className="text-sm text-slate-400">Academic Platform</p>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-3 pb-4">
        <div className="space-y-1.5">
          {commonItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={linkClass} onClick={onClose}>
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>

        {user?.role === "ADMIN" && renderMenuGroup("Administration", adminItems)}
        {user?.role === "STUDENT" && renderMenuGroup("My Records", studentItems)}
        {user?.role === "TEACHER" && renderMenuGroup("Teaching", teacherItems)}
      </div>

      <div className="border-t border-white/10 p-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600/20 text-sm font-semibold text-brand-200">
              {user?.email?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">{user?.email || "User"}</p>
              <p className="truncate text-xs text-slate-400">{user?.role || "Member"}</p>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              onClose?.();
            }}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-900"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
