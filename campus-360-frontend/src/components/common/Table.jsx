import { forwardRef } from "react";

import { cn } from "../../utils/cn";

const Table = forwardRef(function Table({ className, children, ...props }, ref) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table
          ref={ref}
          className={cn("min-w-full divide-y divide-slate-200 text-sm", className)}
          {...props}
        >
          {children}
        </table>
      </div>
    </div>
  );
});

export default Table;
