import Container from "@/components/layout/container/Container";
import PageTitle from "@/components/pageTitle";
import { Category } from "@prisma/client";
import CodeSnippet from "./CodeSnippet";
import { useEffect, useState } from "react";

export default function NoEvent({category}: {category: Category}) {
  const [origin, setOrigin] = useState(process.env.NEXT_PUBLIC_BASE_URL || "");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);
  
  return (
        <div className="flex flex-col w-full min-h-[calc(100vh-80px)] bg-slate-50/50 dark:bg-slate-900/10">
               <PageTitle title={`${category.icon} ${category.name}`} />
               <Container className="flex-1 flex flex-col justify-center items-center py-16">
                 <div className="text-center max-w-xl mx-auto mb-10">
                   <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                     Create your first {category.name} event
                   </h2>
                   <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm md:text-base">
                     Get started by sending a request to our tracking API:
                   </p>
                 </div>
       
                 <CodeSnippet 
                   categoryName={category.name} 
                   origin={origin} 
                 />
               </Container>
             </div>
    );
}