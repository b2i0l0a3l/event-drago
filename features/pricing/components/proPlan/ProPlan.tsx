import { Check, Sparkles } from "lucide-react";

import PorPlanButton from "./PorPlanButton";

export default function ProPlan({ isPro }: { isPro: boolean }) {
 
  return (
    <>
      <div className="absolute top-0 right-0 p-4">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Most Popular
        </span>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-2 flex items-center">
          <Sparkles className="w-5 h-5 mr-2" />
          PRO
        </h3>
        <p className="text-slate-600 dark:text-slate-300">
          For serious makers and businesses.
        </p>
      </div>

      <div className="mb-8">
        <span className="text-5xl font-extrabold text-slate-900 dark:text-white">
          $9.99
        </span>
        <span className="text-slate-500 dark:text-slate-400">/one-time</span>
      </div>

      <ul className="space-y-4 mb-8 flex-1">
        <li className="flex items-center text-slate-700 dark:text-slate-200">
          <Check className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
          <span className="font-medium">Unlimited Events</span>
        </li>
        <li className="flex items-center text-slate-700 dark:text-slate-200">
          <Check className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
          <span>Priority Discord Delivery</span>
        </li>
        <li className="flex items-center text-slate-700 dark:text-slate-200">
          <Check className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
          <span>Extended Event History</span>
        </li>
        <li className="flex items-center text-slate-700 dark:text-slate-200">
          <Check className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
          <span>Premium Support</span>
        </li>
      </ul>

     <PorPlanButton isPro={isPro} />
    </>
  );
}
