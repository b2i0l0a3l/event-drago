"use client";

import { Button } from "@/components/ui/button";
import { Trash2Icon, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../actions/deleteCategory";
import { toast } from "sonner";

export default function DeleteCategoryButton({ categoryId }: { categoryId: string }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete category");
      console.error(error);
    },
  });

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={isPending}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        mutate();
      }}
    >
      {isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Trash2Icon className="size-4" />
      )}
    </Button>
  );
}