"use client";

import { useState } from "react";
import SideBar from "./sideBar/SideBar";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden bg-background">
      {!isMobile && <SideBar />}

      {isMobile && isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="relative z-50 w-64 h-full bg-background shrink-0 animate-in slide-in-from-left-0 duration-300">
             <SideBar />
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto bg-slate-50/40 dark:bg-slate-950/20">
        {isMobile && (
          <header className="flex items-center p-4 border-b bg-background sticky top-0 z-40">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="ml-4 text-lg font-bold">
              Drago<span className="text-blue-600">Event</span>
            </h1>
          </header>
        )}
        
        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
