import { cn } from "../../utils/cn";

const PageHeader = ({
  title,
  description,
  eyebrow,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "mb-8 rounded-2xl border border-slate-200/80 bg-white/90 px-6 py-5 shadow-sm backdrop-blur sm:flex sm:items-start sm:justify-between sm:gap-6",
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
            {eyebrow}
          </p>
        )}

        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h1>

        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            {description}
          </p>
        )}
      </div>

      {children && (
        <div className="mt-4 flex shrink-0 flex-wrap items-center gap-2 sm:mt-0">
          {children}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
