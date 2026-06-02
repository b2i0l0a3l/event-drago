"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import CategoryDialog from "./categoryDialog";

export default function AddCategoryButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
        className="gap-2 px-6 py-5 cursor-pointer rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
        variant="default"
      >
        Add Category <PlusIcon className="w-4 h-4" />
      </Button>
      {isOpen && <CategoryDialog isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}
