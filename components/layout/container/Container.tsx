import { cn } from "@/lib/utils";
import React from "react";

export default function Container({ children , className }: { children: React.ReactNode, className? : string }) {
 
    return (
        <div className={cn("w-full flex-1 overflow-x-hidden py-5 px-8",className)}>
            {children} 
        </div>
    )

}