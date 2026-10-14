import { Link } from "react-router-dom";
import { Home } from "lucide-react";

import useDocumentTitle from "../hooks/useDocumentTitle";
import { Button } from "../components/ui";

const NotFound = () => {
  useDocumentTitle("Page Not Found");

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100/80 px-4">
      <div className="max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">404</p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">Page not found</h1>
        <p className="mt-2 text-sm text-slate-500">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/login" className="mt-6 inline-block">
          <Button leftIcon={Home}>Back to sign in</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
