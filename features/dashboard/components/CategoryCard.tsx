import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Category, Event } from "@prisma/client";
import { ChartColumn, Timer } from "lucide-react";
import { getEvents } from "../actions/getEvents";

export default async function CategoryCard({category}: {category: Category}) {
    const events = await getEvents({categoryId: category.id})
    return (
        <Card className="min-w-[250px] ">
            <CardHeader>
                <div className=" flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                           <div className={cn(`aspect-square rounded-full w-10 h-10  flex items-center justify-center`)} style={{backgroundColor: category.color || "#98FB98"}}>{category.icon}</div>
                            <div className="flex flex-col">
                                <CardTitle className="flex items-center gap-2"> {category.name}</CardTitle>
                                <CardDescription>{category.createdAt.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}</CardDescription> 
                            </div>
                    </div>
                    
                </div>
                </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-1.5 mt-2">
                        <div className="w-full flex flex-col gap-3">
                            <div className="flex items-center gap-4">
                                <Timer className="h-4 w-4 text-muted-foreground"/>
                                <span className="text-sm">Last ping: {category.updatedAt?.toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                })}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <ChartColumn className="h-4 w-4 text-muted-foreground"/>
                                <span className="text-sm">Events this month: {events?.length || 0}</span>
                            </div>
                        </div>
                </div>
            </CardContent>
        </Card>
    );
}