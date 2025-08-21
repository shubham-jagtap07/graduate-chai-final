import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Configure SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send main email to business
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `Contact Form: ${subject} - Graduate Chai`,
      text: `
        New Contact Form Submission:
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone || "Not provided"}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <h3>Contact Details:</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${phone ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ""}
        <p><strong>Subject:</strong> ${subject}</p>
        
        <h3>Message:</h3>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${message.replace(/\n/g, "<br>")}
        </div>
      `,
      replyTo: email,
    });

    // Send auto-reply to customer
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "Thank you for contacting Graduate Chai & Products",
        html: `
          <h2>Thank you for reaching out!</h2>
          <p>Dear ${name},</p>
          <p>Thank you for contacting Graduate Chai & Products. We have received your message regarding "${subject}" and will get back to you within 24-48 hours.</p>
          <p>If your matter is urgent, please call us at <a href="tel:+919999999999">+91 99999 99999</a>.</p>
          <br>
          <p>Best regards,<br>Graduate Chai & Products Team</p>
        `,
      });
    } catch (autoReplyError) {
      // Log auto-reply error but don't fail the main request
      // console.warn('Failed to send auto-reply:', autoReplyError);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    // Log error for debugging in development
    // console.error('Contact form error:', error);
    return NextResponse.json(
      { ok: false, error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
