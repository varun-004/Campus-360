import { TrendingDown, TrendingUp } from "lucide-react";

import { cn } from "../../utils/cn";
import { Card, CardContent } from "./Card";

const trendStyles = {
  up: "text-emerald-600 bg-emerald-50",
  down: "text-red-600 bg-red-50",
  neutral: "text-slate-600 bg-slate-100",
};

const StatCard = ({
  label,
  value,
  icon: Icon,
  description,
  trend,
  trendLabel,
  className,
}) => {
  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : null;

  return (
    <Card className={cn("overflow-hidden transition-shadow duration-200 hover:shadow-md", className)}>
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-500">{label}</p>

              <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                {value ?? "—"}
              </p>

              {description && (
                <p className="mt-1.5 text-sm leading-6 text-slate-500">{description}</p>
              )}
            </div>

            {Icon && (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
            )}
          </div>

          {trend && trendLabel && (
            <div className="mt-4 flex items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
                  trendStyles[trend] || trendStyles.neutral,
                )}
              >
                {TrendIcon && <TrendIcon className="h-3 w-3" aria-hidden="true" />}
                {trendLabel}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
