import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { discord } from "@/lib/discord-client";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Missing API Key" }, { status: 401 });
  }
  const apiKey = authHeader.split(" ")[1];
  const user = await db.user.findUnique({ where: { apiKey } });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  if (user.apiKey !== apiKey)
    return NextResponse.json({ error: "Invalid API Key" }, { status: 401 });

  if (user.plan === "FREE") {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const eventCount = await db.event.count({
      where: {
        userId: user.id,
        createdAt: { gte: startOfMonth },
      },
    });

    if (eventCount >= 100) {
      return NextResponse.json(
        { error: "Monthly event limit reached. Upgrade to PRO for unlimited events." },
        { status: 429 },
      );
    }
  }

  const body = await req.json();
  const { name, fields, formattedMessage } = body;

  if (!name)
    return NextResponse.json({ error: "Missing event name" }, { status: 400 });

  try {
    const category = await db.category.findUnique({
      where: {
        name_userId: {
          name: name,
          userId: user.id,
        },
      },
    });

    if (!category)
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 },
      );

    const event = await db.event.create({
      data: {
        name: name,
        userId: user.id,
        eventCategoryId: category.id,
        formattedMessage: formattedMessage || `New event: ${name}`,
        fields: fields || {},
        deliveryStatus: "PENDING",
      },
    });

    try {
      if (user.discordId) {
        const dmChannelId = await discord.createDM(user.discordId);
        if (dmChannelId) {
          await discord.sendEmbed(dmChannelId, {
            title: `🔔 New Event: ${category.icon} ${category.name}`,
            description: formattedMessage || `You have received a new event.`,
            color: parseInt((category.color || "#3498db").replace("#", ""), 16),
            fields: Object.entries(fields || {}).map(([key, value]) => ({
              name: key,
              value: String(value),
              inline: true,
            })),
            timestamp: new Date().toISOString(),
          });

          await db.event.update({
            where: { id: event.id },
            data: { deliveryStatus: "DELIVERED" },
          });
        }
      }
    } catch (discordError) {
      console.error("Discord Delivery Error:", discordError);
      await db.event.update({
        where: { id: event.id },
        data: { deliveryStatus: "FAILED" },
      });
    }

    return NextResponse.json({ message: "Created" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
