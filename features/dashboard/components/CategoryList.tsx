import { Category } from "@prisma/client";
import CategoryCard from "./CategoryCard";
import { Event } from "@prisma/client";

export default function CategoryList({
  categories,
}: {
  categories: Category[];
}) {

   
  return (
    
    <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-2 md:grid-cols-3 ">
      {categories.length === 0 && (
        <p className="text-muted-foreground">No categories found</p>
      )}
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category}  />
      ))} 
    </div>
  );
}
