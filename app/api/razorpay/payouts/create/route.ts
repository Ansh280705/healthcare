import { auth } from "@clerk/nextjs/server";
import Razorpay from "razorpay";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface CreatePayoutRequestBody {
  payoutId: string; // ID from your db payout request
  amount: number;
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const admin = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!admin || admin.role !== "ADMIN") return new NextResponse("Forbidden", { status: 403 });

    const body: CreatePayoutRequestBody = await req.json();
    const { payoutId, amount } = body;

    const payoutRecord = await db.payout.findUnique({ where: { id: payoutId } });
    if (!payoutRecord) return new NextResponse("Payout request not found", { status: 404 });

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    // Create payout order
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `payout_${payoutId.slice(0, 10)}_${Date.now() % 1000000}`,
      notes: {
        payoutId,
        doctorId: payoutRecord.doctorId,
      },
    });

    return NextResponse.json(order);
  } catch (err) {
    console.error("Error creating payout order:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
