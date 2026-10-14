import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

import useDocumentTitle from "../hooks/useDocumentTitle";
import { Button } from "../components/ui";

const Unauthorized = () => {
  useDocumentTitle("Unauthorized");

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100/80 px-4">
      <div className="max-w-md rounded-2xl border border-red-200/80 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-1 ring-red-100">
          <ShieldAlert className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">403</p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">Access denied</h1>
        <p className="mt-2 text-sm text-slate-500">
          You do not have permission to view this page.
        </p>
        <Link to="/dashboard" className="mt-6 inline-block">
          <Button variant="secondary">Go to dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
