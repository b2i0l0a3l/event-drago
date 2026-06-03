"use client";

import { Category } from "@prisma/client";
import CategoryCard from "./CategoryCard";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../actions/getCategories";

export default function CategoryList({
  categories: initialCategories,
}: {
  categories: Category[];
}) {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const result = await getCategories();
      return result || [];
    },
    initialData: initialCategories,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-4">
      {categories.length === 0 && (
        <div className="col-span-full py-12 text-center text-muted-foreground bg-slate-50 dark:bg-slate-900/10 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          No categories found. Click the button above to create one.
        </div>
      )}
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
