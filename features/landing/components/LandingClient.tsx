import {  Bell, Zap, Shield } from "lucide-react";
import Image from "next/image";
import DiscordMockup from "./DiscordMockup";
import GoToDashboardButton from "./GoToDashboardButton";



export default function LandingClient() {

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0A0A0A] overflow-x-hidden">
      <div className="absolute top-0 left-0 right-0 h-[500px] w-full bg-linear-to-b from-blue-500/10 via-purple-500/5 to-transparent pointer-events-none" />
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
          Monitor your <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-600">Events</span> in Real-Time
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed">
          DragoEvent is a powerful, lightweight event monitoring platform. Track user activities, sales, and system alerts instantly with our seamless Discord integration.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <GoToDashboardButton />
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
