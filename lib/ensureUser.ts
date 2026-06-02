import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import crypto from "crypto";


export async function ensureUserExists() {
    const { userId } = await auth();
    if (!userId) return null;

    const clerkUser = await currentUser();
    if (!clerkUser) return null;

    const user = await db.user.upsert({
        where: { id: userId },
        update: {}, 
        create: {
            id: userId,
            email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
            plan: "FREE",
            apiKey: crypto.randomUUID()
        },
    });

    return user;
}
