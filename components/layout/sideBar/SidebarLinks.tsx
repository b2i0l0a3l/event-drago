"use client";
import Link from "next/link";
import { CreditCard, Home, Key, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
export default function SidebarLinks() {
    const pathname=usePathname();
    return (
       <>
       <div className="flex flex-col gap-1">
                 <h3 className="px-2 pb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                   Overview
                 </h3>
                 <Link
                   href={"/dashboard"}
                   className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground ", pathname === "/dashboard" ? "bg-accent text-accent-foreground" : "text-muted-foreground")}
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
                   className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground ", pathname === "/dashboard/pricing" ? "bg-accent text-accent-foreground" : "text-muted-foreground")}
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
                   className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground", pathname === "/dashboard/api-key" ? "bg-accent text-accent-foreground" : "text-muted-foreground")}
                 >
                   <Key className="h-4 w-4" />
                   API Keys
                 </Link>
                 <Link
                   href={"/dashboard/settings"}
                   className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground", pathname === "/dashboard/settings" ? "bg-accent text-accent-foreground" : "text-muted-foreground")}
                 >
                   <Settings className="h-4 w-4" />
                   Account Settings
                 </Link>
               </div>
       </>
    )
}