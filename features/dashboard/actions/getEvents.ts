import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function getEvents({categoryId}: {categoryId?: string|null}) {
    const {userId} = await auth();
    if (!userId) {
        return null;
    }
    try {
        const response = await db.event.findMany({
            where: {
                userId: userId,
                ...(categoryId && {eventCategoryId: categoryId}),
            },
            include: {
                eventCategory: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return response;
    } catch(error) {
        console.error(error);
        return null;
    }
}