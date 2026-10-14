import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

import { cn } from "../../utils/cn";

const variants = {
  primary:
    "bg-brand-600 text-white shadow-sm hover:bg-brand-700 active:bg-brand-800",
  secondary:
    "border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 active:bg-slate-100",
  ghost:
    "text-slate-600 shadow-none hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200",
  danger:
    "bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800",
  outline:
    "border border-brand-200 bg-brand-50/80 text-brand-700 shadow-sm hover:bg-brand-100 active:bg-brand-200",
};

const sizes = {
  sm: "h-8 gap-1.5 rounded-lg px-3 text-xs",
  md: "h-10 gap-2 rounded-xl px-4 text-sm",
  lg: "h-11 gap-2 rounded-xl px-5 text-sm",
  icon: "h-10 w-10 rounded-xl p-0",
};

const Button = forwardRef(function Button(
  {
    children,
    className,
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    type = "button",
    ...props
  },
  ref,
) {
  const isDisabled = disabled || loading;
  const isIconOnly = size === "icon";

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap font-semibold leading-none transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/20 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />
      ) : (
        LeftIcon && (
          <LeftIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
        )
      )}

      {!isIconOnly && <span className="truncate">{children}</span>}

      {!loading && RightIcon && (
        <RightIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
      )}
    </button>
  );
});

export default Button;
