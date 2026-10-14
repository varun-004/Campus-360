import { cn } from "../../utils/cn";

const sizes = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-[3px]",
  xl: "h-10 w-10 border-4",
};

const variants = {
  primary: "border-brand-600 border-t-transparent",
  muted: "border-slate-300 border-t-transparent",
  white: "border-white/30 border-t-white",
};

const Spinner = ({
  size = "md",
  variant = "primary",
  label = "Loading",
  className,
}) => {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
    >
      <div
        className={cn(
          "animate-spin rounded-full",
          sizes[size],
          variants[variant],
        )}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
};

export const PageLoader = ({ label = "Loading page" }) => (
  <div
    className="flex min-h-[50vh] items-center justify-center"
    role="status"
    aria-label={label}
  >
    <Spinner size="xl" label={label} />
  </div>
);

export const FullPageLoader = ({ label = "Loading application" }) => (
  <div
    className="flex h-screen items-center justify-center bg-surface-muted"
    role="status"
    aria-label={label}
  >
    <Spinner size="xl" label={label} />
  </div>
);

export default Spinner;
