import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    /* ---------------- AUTH ---------------- */
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    /* ---------------- BODY ---------------- */
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message required" },
        { status: 400 }
      );
    }

    /* ---------------- CLERK DATA ---------------- */
    const email = user.primaryEmailAddress?.emailAddress;
    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();

    /* ---------------- MAIL ---------------- */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"DoctorDesk Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // admin
      replyTo: email,
      subject: "📩 New Contact Message",
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <blockquote>${message}</blockquote>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
