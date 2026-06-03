import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from "@prisma/client";
import { ChevronDown, ChevronRight, CheckCircle2, XCircle, AlertCircle, Calendar } from "lucide-react";
import { useState } from "react";

interface RecentActivityProps {
    events: Event[];
}
export default function RecentActivity({events}:RecentActivityProps) {
    const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
    const toggleRow = (id: string) => {
        setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
    };
  return (
<Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Recent activity</CardTitle>
            <CardDescription className="text-sm text-slate-500">
              History of events triggered inside this category. Click a row to inspect its custom field values.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto rounded-lg border border-slate-100 dark:border-slate-800">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="w-10 px-4 py-3"></th>
                    <th className="px-4 py-3">Event Message</th>
                    <th className="px-4 py-3 w-40">Status</th>
                    <th className="px-4 py-3 w-52">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {events.map((event) => {
                    const isExpanded = !!expandedRows[event.id];
                    return (
                      <>
                        <tr 
                          key={event.id} 
                          onClick={() => toggleRow(event.id)}
                          className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer"
                        >
                          <td className="px-4 py-4 text-center">
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4 text-slate-400" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-slate-400" />
                            )}
                          </td>
                          <td className="px-4 py-4 font-medium text-slate-900 dark:text-slate-100">
                            {event.formattedMessage.split("\n\n")[1] || event.formattedMessage}
                          </td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                              event.deliveryStatus === "DELIVERED"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30"
                                : event.deliveryStatus === "FAILED"
                                ? "bg-red-50 text-red-700 border-red-100 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30"
                                : "bg-yellow-50 text-yellow-700 border-yellow-100 dark:bg-yellow-950/20 dark:text-yellow-400 dark:border-yellow-900/30"
                            }`}>
                              {event.deliveryStatus === "DELIVERED" ? (
                                <CheckCircle2 className="w-3 h-3" />
                              ) : event.deliveryStatus === "FAILED" ? (
                                <XCircle className="w-3 h-3" />
                              ) : (
                                <AlertCircle className="w-3 h-3" />
                              )}
                              {event.deliveryStatus}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-slate-500 dark:text-slate-400 flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5 text-slate-400" />
                            {new Date(event.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true
                            })}
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr className="bg-slate-50/30 dark:bg-slate-900/20">
                            <td colSpan={4} className="px-8 py-4 border-t border-b border-slate-100 dark:border-slate-800">
                              <div className="flex flex-col gap-2">
                                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Custom Fields</span>
                                <pre className="p-4 bg-slate-900 dark:bg-black rounded-lg text-xs font-mono text-[#f8f8f2] border border-slate-800 overflow-x-auto max-w-xl shadow-inner">
                                  {JSON.stringify(event.fields, null, 2)}
                                </pre>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
    )
}