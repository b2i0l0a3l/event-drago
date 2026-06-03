import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function DeleveryRate({deliveryRate}: {deliveryRate: number}) {
    return (
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
    );
}