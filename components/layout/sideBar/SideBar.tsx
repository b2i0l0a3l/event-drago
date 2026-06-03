import { Separator } from "@/components/ui/separator";
import { CreditCard, Home, Key, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import UserButtonWithName from "./userButtonWithName";
import SidebarLinks from "./SidebarLinks";
  

export default function SideBar() {
  return (
    <aside className="min-w-64 border-r border-border h-screen bg-background flex flex-col shadow-sm">
      <div className="px-6 py-5 flex items-center gap-3">
        <Image
          src="/icon.png"
          alt="DragoEvent" 
          width={32}
          height={32}
          className="rounded-lg"
        />
        <h1 className="text-xl font-bold tracking-tight">
          Drago<span className="bg-linear-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Event</span>
        </h1>
      </div>

      <Separator className="w-full" />

      <div className="flex flex-col gap-6 p-4 overflow-y-auto flex-1">
        <SidebarLinks />
      </div>

      <Separator className="w-full" />

      <div className="flex gap-3 items-center justify-start p-4">
        <UserButtonWithName />
      </div>
    </aside>
  );
}
