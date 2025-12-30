// /api/razorpay/payouts/verify/route.ts
import crypto from "crypto";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface VerifyPayoutRequestBody {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  payoutId: string;
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const body: VerifyPayoutRequestBody = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, payoutId } = body;

    // ✅ Verify Razorpay signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, message: "Invalid signature" });
    }

    // ✅ Get payout record
    const payout = await db.payout.findUnique({
      where: { id: payoutId },
      include: { doctor: true },
    });

    if (!payout || payout.status !== "PROCESSING") {
      return NextResponse.json({ success: false, message: "Payout not found or already processed" });
    }

    // ✅ Get admin info
    const adminUser = await db.user.findUnique({ where: { clerkUserId: userId } });

    // ✅ Perform payout update and credit deduction in a transaction
    await db.$transaction(async (tx) => {
      // Update payout
      await tx.payout.update({
        where: { id: payoutId },
        data: {
          status: "PROCESSED",
          processedAt: new Date(),
          processedBy: adminUser?.id || "unknown",
          razorpayPaymentId: razorpay_payment_id,
        },
      });

      // Deduct credits from doctor
      await tx.user.update({
        where: { id: payout.doctorId },
        data: { credits: { decrement: payout.credits } },
      });

      // Log the deduction as a credit transaction
      await tx.creditTransaction.create({
        data: {
          userId: payout.doctorId,
          amount: -payout.credits,
          type: "ADMIN_ADJUSTMENT",
        },
      });
    });

    return NextResponse.json({ success: true, message: "Payout processed successfully" });
  } catch (err) {
    console.error("Error verifying payout:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
