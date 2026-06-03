"use client";

import { useState, useEffect } from "react";
import PageTitle from "@/components/pageTitle";
import { Category, Event } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Copy, 
  Check, 
  ChevronRight, 
  ChevronDown, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Layers, 
  Inbox 
} from "lucide-react";
import { toast } from "sonner";
import Container from "@/components/layout/container/Container";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../../dashboard/actions/getEvents";
import NoEvent from "./no-event";
import RecentActivity from "./RecentActivity";
import TotalEventCard from "./TotalEventCard";
import DeleveryRate from "./DeleveryRate";
import FieldsTracked from "./FieldsTracked";

interface CategoryClientProps {
  category: Category;
  events: Event[];
} 

export default function CategoryClient({ category, events: initialEvents }: CategoryClientProps) {

  const { data: events } = useQuery({
    queryKey: ["events", category.id],
    queryFn: async () => {
      const result = await getEvents({ categoryId: category.id });
      return result || [];
    },
    initialData: initialEvents,
    refetchInterval: 5000,
  });


  const totalEvents = events.length;
  const deliveredEvents = events.filter((e) => e.deliveryStatus === "DELIVERED").length;
  const deliveryRate = totalEvents > 0 ? Math.round((deliveredEvents / totalEvents) * 100) : 100;

  const uniqueKeys = new Set<string>();
  events.forEach((event) => {
    if (event.fields && typeof event.fields === "object" && !Array.isArray(event.fields)) {
      Object.keys(event.fields).forEach((key) => uniqueKeys.add(key));
    }
  });

  if (events.length === 0) {
    return (
      <NoEvent category={category} />
    );
  }

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-80px)] bg-slate-50/50 dark:bg-slate-900/10">
      <PageTitle title={`${category.icon} ${category.name}`} />
      
      <Container className="py-8 flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TotalEventCard totalEvents={totalEvents} />
            <DeleveryRate deliveryRate={deliveryRate} />
            <FieldsTracked uniqueKeys={uniqueKeys.size} />
        </div>
        <RecentActivity events={events}/>
      </Container>
    </div>
  );
}
