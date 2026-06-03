import PricingClient from "@/features/pricing/components/PricingClient";
import PageTitle from "@/components/pageTitle";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function PricingPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { plan: true },
  });

  if (!user) redirect("/welcome");

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const eventCount = await db.event.count({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth,
      },
    },
  });

  return (
    <div className="flex flex-col gap-5 w-full p-4">
      <PageTitle title="Pricing & Plans" />
      <PricingClient currentPlan={user.plan} eventCount={eventCount} />
    </div>
  );
}
