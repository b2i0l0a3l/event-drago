"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { syncUserAction } from "../actions/syncUser";

export default function WelcomeClient() {
  const router = useRouter();

  useEffect(() => {
    async function syncUser() {
      try {
        await syncUserAction();
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } catch (error) {
        console.error("Failed to sync user:", error);
        router.push("/dashboard");
      }
    }

    syncUser();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] w-full">
      <div className="relative flex flex-col items-center justify-center p-8 overflow-hidden rounded-2xl bg-white/5 dark:bg-slate-900/50 backdrop-blur-xl border border-white/10 dark:border-slate-800 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50" />
        
        <div className="relative z-10 flex flex-col items-center space-y-6">
          <div className="p-4 bg-blue-500/10 rounded-full dark:bg-blue-500/20">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          </div>
          
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Setting up your account
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[250px]">
              We are preparing your dashboard and configuring your settings. Please wait a moment...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
