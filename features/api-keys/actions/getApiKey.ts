import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function getApiKey() {
    const {userId} = await auth();
    if(!userId) {
        return { error: "Unauthorized" };
    }
    const apiKey = await db.user.findUnique({ where: { id: userId } });
    return apiKey?.apiKey;
}