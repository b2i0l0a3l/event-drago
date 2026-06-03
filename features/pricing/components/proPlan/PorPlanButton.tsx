"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { createCheckout } from "../../actions/createCheckout";
import { toast } from "sonner";

export default function PorPlanButton({isPro}: {isPro: boolean}){
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
    return (
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
    )
}