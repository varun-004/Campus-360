import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import PageTransition from "../components/ui/PageTransition";

const DashboardLayout = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleMenuToggle = () => {
    setMobileSidebarOpen((prev) => !prev);
  };

  const handleSidebarClose = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100/80">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-slate-200/80 bg-slate-950 md:flex md:flex-col">
          <div className="sticky top-0 h-screen">
            <Sidebar onClose={handleSidebarClose} />
          </div>
        </aside>

        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden" onClick={handleSidebarClose} />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 shrink-0 border-r border-slate-200/80 bg-slate-950 shadow-2xl transition-transform duration-300 md:hidden ${
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar onClose={handleSidebarClose} />
        </aside>

        <div className="flex flex-1 flex-col overflow-hidden">
          <Navbar onMenuClick={handleMenuToggle} />

          <main className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <PageTransition className="mx-auto max-w-7xl space-y-6">
              {children}
            </PageTransition>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;