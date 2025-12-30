// /api/credits/verify/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

interface VerifyRequestBody {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export async function POST(req: Request) {
  try {
    // ✅ Authenticate user
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // ✅ Parse request
    const body: VerifyRequestBody = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    // ✅ Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, message: "Invalid signature" });
    }

    // ✅ Fetch order from Razorpay (server-side trust)
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const order = await razorpay.orders.fetch(razorpay_order_id);
    const credits = Number(order.notes?.credits);
    const packageId = order.notes?.planId || null;

    if (!credits || isNaN(credits) || credits <= 0) {
      return NextResponse.json({ success: false, message: "Invalid credits in order" });
    }

    // ✅ Check if user exists
    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    // ✅ Prevent double credit
    const exists = await db.creditTransaction.findFirst({
      where: { transactionId: razorpay_payment_id },
    });
    if (exists) {
      return NextResponse.json({ success: true, message: "Transaction already processed" });
    }

    // ✅ Atomic transaction: update credits + create transaction
    const [updatedUser] = await db.$transaction([
      db.user.update({
        where: { clerkUserId: userId },
        data: { credits: { increment: credits } },
      }),
      db.creditTransaction.create({
        data: {
          userId: user.id,
          amount: credits,
          type: "CREDIT_PURCHASE",
          transactionId: razorpay_payment_id,
          packageId,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      creditsAdded: credits,
      newBalance: updatedUser.credits,
    });
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
