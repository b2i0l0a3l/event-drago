"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function deleteCategory(categoryId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const category = await db.category.findFirst({
    where: {
      id: categoryId,
      userId: userId,
    },
  });

  if (!category) throw new Error("Category not found");

  await db.category.delete({
    where: {
      id: categoryId,
    },
  });

  return { success: true };
}
