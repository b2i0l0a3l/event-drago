import { AlertTriangle } from "lucide-react";

const FREE_LIMIT = 100;

export default function EventUsage({isPro,showUsage,eventCount}: {isPro: boolean,showUsage: boolean,eventCount?: number}) {
    if(eventCount === undefined){
        return;
    }
    
    const usagePercent = isPro || !showUsage ? 0 : Math.min((eventCount / FREE_LIMIT) * 100, 100);
    const isOverLimit = !isPro && showUsage && eventCount >= FREE_LIMIT;

  return (
    <div>
      {!isPro && showUsage && (
        <div
          className={`mb-10 p-6 rounded-2xl border ${
            isOverLimit
              ? "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800"
              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {isOverLimit && (
                <AlertTriangle className="w-5 h-5 text-red-500" />
              )}
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {isOverLimit ? "Event Limit Reached!" : "Monthly Usage"}
              </h3>
            </div>
            <span
              className={`text-sm font-semibold ${
                isOverLimit
                  ? "text-red-600 dark:text-red-400"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              {eventCount} / {FREE_LIMIT} events
            </span>
          </div>

          <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                usagePercent >= 90
                  ? "bg-red-500"
                  : usagePercent >= 70
                    ? "bg-amber-500"
                    : "bg-blue-500"
              }`}
              style={{ width: `${usagePercent}%` }}
            />
          </div>

          {isOverLimit && (
            <p className="mt-3 text-sm text-red-600 dark:text-red-400">
              You have exceeded the free event limit. Upgrade to PRO for
              unlimited events.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
