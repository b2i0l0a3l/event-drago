"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import CategoryDialog from "./categoryDialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

export default function AddCategoryButton() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div>
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
        className={cn("gap-2 px-6 py-5 cursor-pointer rounded-lg font-semibold shadow-md hover:shadow-lg transition-all", isMobile ? "w-full" : "")} 
        variant="default"
      >
       {!isMobile ? "Add Category" : ""} <PlusIcon className="w-4 h-4" />
      </Button>
      {isOpen && <CategoryDialog isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}
