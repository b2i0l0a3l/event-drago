"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function getCategories() {
  const { userId } = await auth();
  if (!userId) return [];
  const categories = await db.category.findMany({
    where: {
      userId: userId,
    },
  });
  return categories;
}
