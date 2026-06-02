import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function getDiscordId() {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }
  const user = await db.user.findUnique({ where: { id: userId } });
  return user?.discordId || "";
}
