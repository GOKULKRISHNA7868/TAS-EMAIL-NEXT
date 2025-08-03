import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 🔁 Enable CORS for all origins (for local dev)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ⚠️ Handle preflight (OPTIONS) request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gokultupakula9494@gmail.com",
      pass: "vjvw dept gzig daeu",
    },
  });

  const { to, subject, message } = req.body;

  try {
    await transporter.sendMail({
      from: `"My App" <your@gmail.com>`,
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
