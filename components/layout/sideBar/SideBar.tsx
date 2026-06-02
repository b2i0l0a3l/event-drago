import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Diamond, Home, Key, Settings } from "lucide-react";
import Link from "next/link";
import UserButtonWithName from "./userButtonWithName";


export default function SideBar() {  
    return (
        <aside className="w-64 border-r border-border h-screen bg-background flex flex-col shadow-sm">
            <div className="px-6 py-5">
                <h1 className="text-2xl font-bold tracking-tight">Drago<span className="text-blue-600">Event</span></h1>
            </div>
            
            <Separator className="w-full" />
            
            <div className="flex flex-col gap-8 p-4 overflow-y-auto">
                <div className="flex flex-col gap-1">
                    <h3 className="px-2 pb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">Overview</h3>
                    <Link href={"/dashboard"} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">
                        <Home className="h-4 w-4" /> 
                        Dashboard
                    </Link> 
                </div>
                
                <div className="flex flex-col gap-1">
                    <h3 className="px-2 pb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">Account</h3>
                    <Link href={"/dashboard/upgrade"} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground text-muted-foreground">
                        <Diamond className="h-4 w-4" /> 
                        Upgrade
                    </Link>
                </div>
                
                 <div className="flex flex-col gap-1">
                    <h3 className="px-2 pb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">Settings</h3>
                    <Link href={"/dashboard/settings"} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground text-muted-foreground">
                        <Key className="h-4 w-4" />
                        Api Keys
                    </Link>
                    <Link href={"/dashboard/settings"} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground text-muted-foreground">
                        <Settings className="h-4 w-4" />
                        Account Settings
                    </Link>
                </div>
            </div>

            <div className="flex gap-3 flex-1 items-end justify-start p-4">
                <UserButtonWithName />  
            </div>
        </aside>
    );
}