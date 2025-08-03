import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // ✅ Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle OPTIONS preflight request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // ✅ Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gokultupakula9494@gmail.com",
      pass: "vjvw dept gzig daeu", // 🔒 Use .env in production
    },
  });

  const { to, subject, message } = req.body;
  console.log("📩 Received email data:", { to, subject, message });

  try {
    await transporter.sendMail({
      from: `"My App" <gokultupakula9494@gmail.com>`,
      to,
      subject,
      html: `<p>${message}</p>`,
    });

    return res.status(200).json({ message: "✅ Email sent!" });
  } catch (error: any) {
    console.error("Email error:", error);
    return res
      .status(500)
      .json({ message: "❌ Failed to send email", error: error.message });
  }
}
