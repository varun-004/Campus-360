import { cn } from "../../utils/cn";

export function Card({ className, children, hover = false, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-shadow duration-200",
        hover && "hover:border-slate-300/80 hover:shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div
      className={cn("flex flex-col gap-1 border-b border-slate-100 px-6 py-5", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3
      className={cn("text-base font-semibold tracking-tight text-slate-900", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }) {
  return (
    <p className={cn("text-sm leading-6 text-slate-500", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn("px-6 py-5", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border-t border-slate-100 px-6 py-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
