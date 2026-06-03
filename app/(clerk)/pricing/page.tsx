import PricingClient from "@/features/pricing/components/PricingClient";
import PageTitle from "@/components/pageTitle";

export default function PublicPricingPage() {
  return (
    <div className="flex flex-col gap-5 w-full p-4 mt-16 max-w-7xl mx-auto">
      <PricingClient />
    </div>
  );
}
