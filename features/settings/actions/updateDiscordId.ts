"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateDiscordId(discordId: string) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  try {
    await db.user.update({
      where: { id: userId },
      data: { discordId: discordId || null },
    });

    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (error) {
    console.error("Failed to update Discord ID:", error);
    return { error: "Failed to update settings" };
  }
}
