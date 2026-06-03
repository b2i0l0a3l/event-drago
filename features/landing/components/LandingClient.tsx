"use client";

import { useUser } from "@clerk/nextjs";
import { ArrowRight, Bell, Zap, Shield, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function DiscordMockup() {
  return (
    <div className="w-full max-w-lg mx-auto rounded-xl overflow-hidden bg-[#313338] shadow-2xl border border-[#1e1f22] overflow-x-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#2b2d31] border-b border-[#1e1f22]">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-sm font-semibold text-[#dbdee1]"># drago-events</span>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">
            DE
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-blue-400">DragoEvent</span>
              <span className="text-[10px] bg-[#5865f2] text-white px-1 rounded text-center">BOT</span>
              <span className="text-xs text-[#949ba4]">Today at 2:34 PM</span>
            </div>
            <div className="rounded-md overflow-hidden border-l-4 border-emerald-500 bg-[#2b2d31] max-w-sm">
              <div className="p-3">
                <p className="text-sm font-semibold text-white mb-1">🔔 New Event: 💰 Sales</p>
                <p className="text-xs text-[#dbdee1] mb-2">A new purchase has been completed!</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[#949ba4]">Plan</span>
                    <p className="text-white font-medium">PRO</p>
                  </div>
                  <div>
                    <span className="text-[#949ba4]">Amount</span>
                    <p className="text-white font-medium">$49.99</p>
                  </div>
                  <div>
                    <span className="text-[#949ba4]">Email</span>
                    <p className="text-white font-medium">john@doe.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">
            DE
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-blue-400">DragoEvent</span>
              <span className="text-[10px] bg-[#5865f2] text-white px-1 rounded text-center">BOT</span>
              <span className="text-xs text-[#949ba4]">Today at 2:36 PM</span>
            </div>
            <div className="rounded-md overflow-hidden border-l-4 border-blue-500 bg-[#2b2d31] max-w-sm">
              <div className="p-3">
                <p className="text-sm font-semibold text-white mb-1">🔔 New Event: 👤 User Signup</p>
                <p className="text-xs text-[#dbdee1] mb-2">A new user just registered!</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[#949ba4]">Name</span>
                    <p className="text-white font-medium">Sarah K.</p>
                  </div>
                  <div>
                    <span className="text-[#949ba4]">Source</span>
                    <p className="text-white font-medium">Google</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingClient() {
  const { isLoaded, isSignedIn } = useUser();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0A0A0A] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[500px] w-full bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-purple-500/20 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
      <div className="absolute top-20 -left-20 w-[400px] h-[400px] bg-blue-500/20 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none" />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 relative z-10">
        <div className="mb-6">
          <Image
            src="/icon.png"
            alt="DragoEvent Icon"
            width={80}
            height={80}
            className="rounded-2xl shadow-lg shadow-blue-500/20"
          />
        </div>

        <div className="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm px-3 py-1 text-sm font-medium text-slate-600 dark:text-slate-300 mb-8 transition-all hover:bg-slate-100 dark:hover:bg-slate-800 cursor-default">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
          Event Monitoring Reimagined
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mb-6">
          Monitor your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Events</span> in Real-Time
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed">
          DragoEvent is a powerful, lightweight event monitoring platform. Track user activities, sales, and system alerts instantly with our seamless Discord integration.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
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
        </div>

        <div className="mt-24 w-full max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
              See it in action
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Beautiful, formatted notifications delivered straight to your Discord DMs.
            </p>
          </div>
          <DiscordMockup />
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl text-left">
          <div className="flex flex-col p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Lightning Fast</h3>
            <p className="text-slate-600 dark:text-slate-400">Receive events instantly without any delay using our highly optimized infrastructure.</p>
          </div>

          <div className="flex flex-col p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
               <Bell className="w-24 h-24" />
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center mb-4">
              <Bell className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Discord Native</h3>
            <p className="text-slate-600 dark:text-slate-400">Get beautiful, formatted push notifications directly to your Discord server or DMs.</p>
          </div>

          <div className="flex flex-col p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Secure API</h3>
            <p className="text-slate-600 dark:text-slate-400">Your events are protected with encrypted API keys and private delivery status tracking.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
