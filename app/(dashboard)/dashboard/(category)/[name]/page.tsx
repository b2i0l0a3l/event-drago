import { getCategoryByName } from "@/features/dashboard/actions/getCategoryByName";
import { getEvents } from "@/features/dashboard/actions/getEvents";
import { getApiKey } from "@/features/api-keys/actions/getApiKey";
import CategoryClient from "@/features/category/components/CategoryClient";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  
  const category = await getCategoryByName({ name });

  if (!category) {
    return notFound();
  }

  const events = await getEvents({ categoryId: category.id });
  const apiKey = await getApiKey();

  return (
    <div className="flex flex-col w-full">
      <CategoryClient 
        category={category} 
        events={events || []}  
      />
    </div>
  );
}
