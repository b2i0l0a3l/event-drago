import { Sparkles } from "lucide-react";

export default function ProPlanActive({ isPro,showUsage,eventCount }: { eventCount?: number,isPro:boolean,showUsage:boolean }) {
    return (
        <div>
            {isPro && showUsage && (
                    <div className="mb-10 p-6 rounded-2xl border bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 border-blue-200 dark:border-blue-800">
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            PRO Plan Active
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            You have unlimited events. Total events this month:{" "}
                            <strong>{eventCount ?? 0}</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
        </div>
    )
}