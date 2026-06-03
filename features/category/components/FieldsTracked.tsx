import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Inbox } from "lucide-react";

export default function FieldsTracked({uniqueKeys}: {uniqueKeys: number}) {
    return (
         <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-semibold text-slate-500 dark:text-slate-400">Fields Tracked</CardTitle>
                    <Inbox className="h-4 w-4 text-indigo-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">{uniqueKeys}</div>
                    <p className="text-xs text-slate-400 mt-1">Unique custom event keys</p>
                </CardContent>
            </Card>
    );
}