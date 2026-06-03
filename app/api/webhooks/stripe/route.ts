import { db } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY || "sk_dummy_123";
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

const stripe = new Stripe(stripeKey, {
  apiVersion: "2024-11-20.acacia" as any,
});

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature || !webhookSecret) {
      return new NextResponse("Webhook Secret or Signature Missing", { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error: any) {
      console.error("Webhook signature verification failed:", error.message);
      return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
      const userId = session.client_reference_id;

      if (!userId) {
        console.error("No userId found in session");
        return new NextResponse("Webhook Error: No user ID", { status: 400 });
      }

      await db.user.update({
        where: { id: userId },
        data: { plan: "PRO" },
      });

      console.log(`Successfully upgraded user ${userId} to PRO`);
    }

    return new NextResponse("Webhook handled successfully", { status: 200 });
  } catch (error) {
    console.error("Webhook handler failed:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
