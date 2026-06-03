import { Plan } from "@prisma/client";
import EventUsage from "./EventUsage";
import SimplePlan from "./SimplePlan";
import ProPlan from "./proPlan/ProPlan";
import ProPlanActive from "./ProPlanActive";

interface PricingClientProps {
  currentPlan?: Plan;
  eventCount?: number;
}

export default function PricingClient({
  currentPlan = "FREE",
  eventCount,
}: PricingClientProps) {
  
  const isPro = currentPlan === "PRO";
  const showUsage = eventCount !== undefined;

  return (
    <div className="flex flex-col max-w-5xl mx-auto px-4 py-8">
      <EventUsage isPro={isPro} showUsage={showUsage} eventCount={eventCount} />

      <ProPlanActive isPro={isPro} showUsage={showUsage} eventCount={eventCount} />

      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Unlock the full potential of DragoEvent with our PRO plan.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <SimplePlan isPro={isPro} />

        <div className="flex flex-col p-8 bg-gradient-to-b from-blue-900/5 to-purple-900/5 dark:from-blue-500/10 dark:to-purple-500/10 rounded-3xl border-2 border-blue-500 dark:border-blue-600 shadow-xl relative overflow-hidden">
          <ProPlan isPro={isPro} />
        </div>
      </div>
    </div>
  );
}
