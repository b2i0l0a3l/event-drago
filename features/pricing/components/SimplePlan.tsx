import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";

export default function SimplePlan({isPro}: {isPro: boolean}){
    return (
        <>
        <div className="flex flex-col p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-slate-400" />
              Free
            </h3>
            <p className="text-slate-500 dark:text-slate-400">Perfect for side projects and testing.</p>
          </div>
          
          <div className="mb-8">
            <span className="text-5xl font-extrabold text-slate-900 dark:text-white">$0</span>
            <span className="text-slate-500 dark:text-slate-400">/forever</span>
          </div>

          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center text-slate-600 dark:text-slate-300">
              <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
              <span>Up to 100 events / month</span>
            </li>
            <li className="flex items-center text-slate-600 dark:text-slate-300">
              <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
              <span>Discord DM Notifications</span>
            </li>
            <li className="flex items-center text-slate-600 dark:text-slate-300">
              <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
              <span>Basic Event History</span>
            </li>
          </ul>

          <Button 
            className="w-full" 
            variant="outline" 
            disabled
          >
            {isPro ? "Included in PRO" : "Current Plan"}
          </Button>
        </div>
        </>
    )
}