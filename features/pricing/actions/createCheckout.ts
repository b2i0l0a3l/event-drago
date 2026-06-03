"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY || "sk_dummy_123";
const stripe = new Stripe(stripeKey, {
  apiVersion: "2024-11-20.acacia" as any, 
});

export async function createCheckout() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "Unauthorized" };
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return { error: "Stripe is not configured. Please add STRIPE_SECRET_KEY to your .env file." };
    }

    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return { error: "User not found" };
    }

    if (user.plan === "PRO") {
      return { error: "Already on PRO plan" };
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment", 
      client_reference_id: userId,
      customer_email: user.email,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/pricing?canceled=true`,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "DragoEvent PRO",
              description: "Lifetime access to PRO features",
            },
            unit_amount: 999, 
          },
          quantity: 1,
        },
      ],
    });

    if (!session.url) {
      return { error: "Failed to create checkout session" };
    }

    return { url: session.url };
  } catch (error) {
    console.error("Stripe Error:", error);
    return { error: "Internal server error" };
  }
}
