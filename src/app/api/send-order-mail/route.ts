import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const {
    name,
    phone,
    street,
    landmark,
    city,
    taluka,
    district,
    pincode,
    qty,
    payment,
    product,
    image,
  } = await req.json();

  // Configure your SMTP transport (use environment variables in production!)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: "New Order - Graduate Chai",
      text: `
        New Order Details:
        Product: ${product}
        Quantity: ${qty}
        Payment Method: ${payment}
        
        Customer Details:
        Name: ${name}
        Phone: ${phone}
        Street: ${street}
        Landmark: ${landmark}
        City: ${city}
        Taluka: ${taluka}
        District: ${district}
        Pincode: ${pincode}
      `,
      html: `
        <h2>New Order - Graduate Chai</h2>
        <h3>Product Details:</h3>
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Quantity:</strong> ${qty}</p>
        <p><strong>Payment Method:</strong> ${payment}</p>
        ${image ? `<p><strong>Product Image:</strong> <img src="${image}" alt="${product}" style="max-width: 100px;" /></p>` : ""}
        
        <h3>Customer Details:</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Street:</strong> ${street}</p>
        <p><strong>Landmark:</strong> ${landmark}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Taluka:</strong> ${taluka}</p>
        <p><strong>District:</strong> ${district}</p>
        <p><strong>Pincode:</strong> ${pincode}</p>
      `,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    // Log error to your error monitoring service in production
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { ok: false, error: errorMessage },
      { status: 500 },
    );
  }
}
