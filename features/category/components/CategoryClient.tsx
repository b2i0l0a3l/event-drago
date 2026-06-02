"use client";

import { useState, useEffect } from "react";
import PageTitle from "@/components/pageTitle";
import { Category, Event } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Copy, 
  Check, 
  ChevronRight, 
  ChevronDown, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Layers, 
  Inbox 
} from "lucide-react";
import { toast } from "sonner";
import Container from "@/components/layout/container/Container";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../../dashboard/actions/getEvents";

interface CategoryClientProps {
  category: Category;
  events: Event[];
  apiKey: string;
} 

export default function CategoryClient({ category, events: initialEvents, apiKey }: CategoryClientProps) {
  const [origin, setOrigin] = useState(process.env.NEXT_PUBLIC_BASE_URL || "");
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const { data: events } = useQuery({
    queryKey: ["events", category.id],
    queryFn: async () => {
      const result = await getEvents({ categoryId: category.id });
      return result || [];
    },
    initialData: initialEvents,
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalEvents = events.length;
  const deliveredEvents = events.filter((e) => e.deliveryStatus === "DELIVERED").length;
  const deliveryRate = totalEvents > 0 ? Math.round((deliveredEvents / totalEvents) * 100) : 100;

  const uniqueKeys = new Set<string>();
  events.forEach((event) => {
    if (event.fields && typeof event.fields === "object" && !Array.isArray(event.fields)) {
      Object.keys(event.fields).forEach((key) => uniqueKeys.add(key));
    }
  });

  if (events.length === 0) {
    return (
      <div className="flex flex-col w-full min-h-[calc(100vh-80px)] bg-slate-50/50 dark:bg-slate-900/10">
        <PageTitle title={`${category.icon} ${category.name}`} />
        <Container className="flex-1 flex flex-col justify-center items-center py-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              Create your first {category.name} event
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm md:text-base">
              Get started by sending a request to our tracking API:
            </p>
          </div>

          <CodeSnippet 
            categoryName={category.name} 
            apiKey={apiKey} 
            origin={origin} 
          />
        </Container>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-80px)] bg-slate-50/50 dark:bg-slate-900/10">
      <PageTitle title={`${category.icon} ${category.name}`} />
      
      <Container className="py-8 flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Events</CardTitle>
                    <Layers className="h-4 w-4 text-blue-600" />
                </CardHeader> 
                <CardContent>
                    <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">{totalEvents}</div>
                    <p className="text-xs text-slate-400 mt-1">Events recorded overall</p>
                </CardContent>
            </Card>

          <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-semibold text-slate-500 dark:text-slate-400">Delivery Rate</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">{deliveryRate}%</div>
              <p className="text-xs text-slate-400 mt-1">Successfully sent alerts</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-semibold text-slate-500 dark:text-slate-400">Fields Tracked</CardTitle>
              <Inbox className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">{uniqueKeys.size}</div>
              <p className="text-xs text-slate-400 mt-1">Unique custom event keys</p>
            </CardContent>
          </Card>
        </div>

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
      </Container>
    </div>
  );
}

function CodeSnippet({ 
  categoryName, 
  apiKey, 
  origin 
}: { 
  categoryName: string; 
  apiKey: string; 
  origin: string; 
}) {
  const [copied, setCopied] = useState(false);
  
  const code = `await fetch('${origin}/api/v1/events', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${apiKey}'
  },
  body: JSON.stringify({
    category: '${categoryName}',
    fields: {
      field1: 'value1', // for example: user id
      field2: 'value2' // for example: user email
    }
  })
})`;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Code snippet copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-[#1e1e2e] dark:bg-[#15151f]">
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#181824] dark:bg-[#0f0f15] border-b border-slate-800/60">
        <div className="flex gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-xs font-mono text-slate-400 select-none">your-first-event.js</span>
        <Button
          onClick={handleCopy}
          size="sm"
          variant="ghost"
          className="h-8 px-3 text-xs text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500 animate-in fade-in zoom-in-75 duration-200" />
              <span className="text-emerald-500 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </Button>
      </div>
      <pre className="p-6 md:p-8 overflow-x-auto text-left text-sm font-mono leading-relaxed text-[#f8f8f2] bg-[#1e1e2e] dark:bg-[#12121a]">
        <code>
          <span className="text-[#ff79c6]">await</span> <span className="text-[#50fa7b]">fetch</span>(<span className="text-[#f1fa8c]">{`'`}</span><span className="text-[#8be9fd]">{origin}</span><span className="text-[#f1fa8c]">{`/api/v1/events'`}</span>, &#123;{"\n"}
          {"  "}method: <span className="text-[#f1fa8c]">'POST'</span>,{"\n"}
          {"  "}headers: &#123;{"\n"}
          {"    "}<span className="text-[#f1fa8c]">'Authorization'</span>: <span className="text-[#f1fa8c]">{`'`}</span><span className="text-[#ffb86c]">Bearer {apiKey}</span><span className="text-[#f1fa8c]">{`'`}</span>{"\n"}
          {"  "}&#125;,{"\n"}
          {"  "}body: <span className="text-[#66d9ef]">JSON</span>.<span className="text-[#50fa7b]">stringify</span>(&#123;{"\n"}
          {"    "}category: <span className="text-[#f1fa8c]">{`'`}</span><span className="text-[#50fa7b]">{categoryName}</span><span className="text-[#f1fa8c]">{`'`}</span>,{"\n"}
          {"    "}fields: &#123;{"\n"}
          {"      "}field1: <span className="text-[#f1fa8c]">'value1'</span>, <span className="text-[#6272a4]">// for example: user id</span>{"\n"}
          {"      "}field2: <span className="text-[#f1fa8c]">'value2'</span> <span className="text-[#6272a4]">// for example: user email</span>{"\n"}
          {"    "}&#125;{"\n"}
          {"  "}&#125;){"\n"}
          &#125;)
        </code>
      </pre>
    </div>
  );
}