"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { ChartColumn, Timer, ArrowRight, Trash2Icon } from "lucide-react";
import { getEvents } from "../actions/getEvents";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DeleteCategoryButton from "./DeleteCategoryButton";

function formatRelativeTime(date: Date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 5) return "just now";
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

export default function CategoryCard({
  category,
}: {
  category: Category;
}) {
  const { data: events } = useQuery({
    queryKey: ["events", category.id],
    queryFn: async () => {
      const result = await getEvents({ categoryId: category.id });
      return result || [];
    },
  });
  
  

  const eventsThisMonth = events?.length || 0;
  const lastEvent = events?.[0];

  return (
    <div className="block group relative">
      <Card className="h-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 rounded-xl overflow-hidden cursor-default">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "aspect-square rounded-xl w-11 h-11 flex items-center justify-center text-xl shadow-sm bg-opacity-10"
                )}
                style={{ 
                  backgroundColor: category.color ? `${category.color}20` : "#98FB9820",
                  border: `1px solid ${category.color || "#98FB98"}40`
                }}
              >
                <span style={{ color: category.color || "#22c55e" }}>
                  {category.icon || "📂"}
                </span>
              </div>
              <div className="flex flex-col">
                <CardTitle className="text-lg font-bold group-hover:text-blue-600 transition-colors duration-200">
                  {category.name}
                </CardTitle>
                <CardDescription className="text-xs">
                  Created {category.createdAt.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </CardDescription>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
          </div>
        </CardHeader>
        <CardContent className="pt-2 pb-6 border-t border-slate-50 dark:border-slate-800/60 mt-2">
          <div className="flex flex-col space-y-3 mt-4">
            <div className="w-full flex flex-col gap-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
                  <Timer className="h-4 w-4 text-slate-400" />
                  <span>Last ping</span>
                </div>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {lastEvent ? formatRelativeTime(new Date(lastEvent.createdAt)) : "Never"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
                  <ChartColumn className="h-4 w-4 text-slate-400" />
                  <span>Events this month</span>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">
                  {eventsThisMonth}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <DeleteCategoryButton categoryId={category.id} />
          <Link href={`/dashboard/${category.name}`} className="block group">
            <Button
              type="button"
              className="gap-2 px-3 py-4 cursor-pointer rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              variant="outline"
            > 
              View<ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
