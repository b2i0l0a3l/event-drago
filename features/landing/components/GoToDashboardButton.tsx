"use client";
import { useUser } from "@clerk/nextjs";
import { ArrowRight, Shield, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GoToDashboardButton() {
  const { isLoaded, isSignedIn } = useUser();
 
    return (<>
     {!isLoaded ? (
            <Button disabled className="w-full sm:w-auto h-12 px-8 rounded-full">
              Loading...
            </Button>
          ) : isSignedIn ? (
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-105">
                Go to Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/sign-up">
                <Button size="lg" className="w-full sm:w-auto h-12 px-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-lg transition-all hover:scale-105">
                  Get Started for Free
                  <ChevronRight className="ml-1 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 rounded-full border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                  Sign In
                </Button>
              </Link>
            </>
          )}
    
    </>
    );
}