import { forwardRef } from "react";

import { cn } from "../../utils/cn";

const fieldStyles =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 transition-colors focus:border-brand-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-60";

const Input = forwardRef(function Input(
  {
    className,
    label,
    hint,
    error,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    id,
    required,
    ...props
  },
  ref,
) {
  const inputId = id || props.name;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          {label}
          {required && (
            <span className="ml-0.5 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        {LeftIcon && (
          <LeftIcon
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
        )}

        <input
          ref={ref}
          id={inputId}
          required={required}
          className={cn(
            fieldStyles,
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/20 focus-visible:ring-offset-0",
            LeftIcon && "pl-10",
            RightIcon && "pr-10",
            error && "border-red-300 focus:border-red-500 focus-visible:ring-red-500/20",
            className,
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...props}
        />

        {RightIcon && (
          <RightIcon
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
        )}
      </div>

      {hint && !error && (
        <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-slate-500">
          {hint}
        </p>
      )}

      {error && (
        <p id={`${inputId}-error`} className="mt-1.5 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export const Select = forwardRef(function Select(
  {
    className,
    label,
    hint,
    error,
    id,
    required,
    children,
    ...props
  },
  ref,
) {
  const selectId = id || props.name;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          {label}
          {required && (
            <span className="ml-0.5 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <select
        ref={ref}
        id={selectId}
        required={required}
        className={cn(
          fieldStyles,
          "appearance-none bg-size-[16px] bg-position-[right_12px_center] bg-no-repeat pr-10",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/20",
          error && "border-red-300 focus:border-red-500 focus-visible:ring-red-500/20",
          className,
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
        }}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={
          error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined
        }
        {...props}
      >
        {children}
      </select>

      {hint && !error && (
        <p id={`${selectId}-hint`} className="mt-1.5 text-xs text-slate-500">
          {hint}
        </p>
      )}

      {error && (
        <p id={`${selectId}-error`} className="mt-1.5 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export const Textarea = forwardRef(function Textarea(
  { className, label, hint, error, id, required, rows = 4, ...props },
  ref,
) {
  const textareaId = id || props.name;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          {label}
          {required && (
            <span className="ml-0.5 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        required={required}
        className={cn(
          fieldStyles,
          "min-h-25 resize-y",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/20",
          error && "border-red-300 focus:border-red-500 focus-visible:ring-red-500/20",
          className,
        )}
        aria-invalid={error ? "true" : undefined}
        {...props}
      />

      {hint && !error && (
        <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
      )}

      {error && (
        <p className="mt-1.5 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
