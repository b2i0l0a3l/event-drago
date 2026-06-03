import { Separator } from "@/components/ui/separator";
import { CreditCard, Home, Key, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import UserButtonWithName from "./userButtonWithName";

export default function SideBar() {
  return (
    <aside className="w-64 border-r border-border h-screen bg-background flex flex-col shadow-sm">
      <div className="px-6 py-5 flex items-center gap-3">
        <Image
          src="/icon.png"
          alt="DragoEvent"
          width={32}
          height={32}
          className="rounded-lg"
        />
        <h1 className="text-xl font-bold tracking-tight">
          Drago<span className="text-blue-600">Event</span>
        </h1>
      </div>

      <Separator className="w-full" />

      <div className="flex flex-col gap-6 p-4 overflow-y-auto flex-1">
        <div className="flex flex-col gap-1">
          <h3 className="px-2 pb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Overview
          </h3>
          <Link
            href={"/dashboard"}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground text-foreground"
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="px-2 pb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Account
          </h3>
          <Link
            href={"/dashboard/pricing"}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground text-muted-foreground"
          >
            <CreditCard className="h-4 w-4" />
            Pricing & Plans
          </Link>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="px-2 pb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Settings
          </h3>
          <Link
            href={"/dashboard/api-key"}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground text-muted-foreground"
          >
            <Key className="h-4 w-4" />
            API Keys
          </Link>
          <Link
            href={"/dashboard/settings"}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground text-muted-foreground"
          >
            <Settings className="h-4 w-4" />
            Account Settings
          </Link>
        </div>
      </div>

      <Separator className="w-full" />

      <div className="flex gap-3 items-center justify-start p-4">
        <UserButtonWithName />
      </div>
    </aside>
  );
}
