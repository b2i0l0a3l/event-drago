"use client";

import { useState } from "react";
import { Check, Loader2, Sparkles, Zap, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createCheckout } from "../actions/createCheckout";
import { toast } from "sonner";
import { Plan } from "@prisma/client";

interface PricingClientProps {
  currentPlan?: Plan;
  eventCount?: number;
}

const FREE_LIMIT = 100;

export default function PricingClient({ currentPlan = "FREE", eventCount }: PricingClientProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    try {
      setIsLoading(true);
      const { url, error } = await createCheckout();
      
      if (error) {
        toast.error(error);
        return;
      }
      
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isPro = currentPlan === "PRO";
  const showUsage = eventCount !== undefined;
  const usagePercent = isPro || !showUsage ? 0 : Math.min((eventCount / FREE_LIMIT) * 100, 100);
  const isOverLimit = !isPro && showUsage && eventCount >= FREE_LIMIT;

  return (
    <div className="flex flex-col max-w-5xl mx-auto px-4 py-8">
      {!isPro && showUsage && (
        <div className={`mb-10 p-6 rounded-2xl border ${
          isOverLimit 
            ? "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800" 
            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {isOverLimit && <AlertTriangle className="w-5 h-5 text-red-500" />}
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {isOverLimit ? "Event Limit Reached!" : "Monthly Usage"}
              </h3>
            </div>
            <span className={`text-sm font-semibold ${
              isOverLimit ? "text-red-600 dark:text-red-400" : "text-slate-600 dark:text-slate-400"
            }`}>
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
              You have exceeded the free event limit. Upgrade to PRO for unlimited events.
            </p>
          )}
        </div>
      )}

      {isPro && showUsage && (
        <div className="mb-10 p-6 rounded-2xl border bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">PRO Plan Active</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">You have unlimited events. Total events this month: <strong>{eventCount}</strong></p>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Unlock the full potential of DragoEvent with our PRO plan.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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

        <div className="flex flex-col p-8 bg-gradient-to-b from-blue-900/5 to-purple-900/5 dark:from-blue-500/10 dark:to-purple-500/10 rounded-3xl border-2 border-blue-500 dark:border-blue-600 shadow-xl relative overflow-hidden">
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
            <p className="text-slate-600 dark:text-slate-300">For serious makers and businesses.</p>
          </div>
          
          <div className="mb-8">
            <span className="text-5xl font-extrabold text-slate-900 dark:text-white">$9.99</span>
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

          <Button 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transition-all hover:scale-[1.02]" 
            onClick={handleUpgrade}
            disabled={isLoading || isPro}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isPro ? (
              "You are PRO ✨"
            ) : (
              "Upgrade to PRO"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
