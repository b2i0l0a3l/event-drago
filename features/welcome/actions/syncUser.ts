"use server";

import { ensureUserExists } from "@/lib/ensureUser";

export async function syncUserAction() {
  try {
    const user = await ensureUserExists();
    return { success: true, user };
  } catch (error) {
    console.error("Error syncing user:", error);
    return { success: false, error: "Failed to sync user" };
  }
}
