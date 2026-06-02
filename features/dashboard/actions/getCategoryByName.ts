import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function getCategoryByName({name}: {name: string}) {
  const { userId } = await auth();
  if (!userId) return null;
  const categories = await db.category.findUnique({
    where: {
      name_userId: {
        name: name,
        userId: userId,
      },
    },
  });
  return categories;
}
