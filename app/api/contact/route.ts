import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vaghelaabhishek2580@gmail.com',
    pass: 'nwwrxzpiascrmjxs',
  },
});

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await transporter.sendMail({
      from: `"Dev Studio Contact" <vaghelaabhishek2580@gmail.com>`,
      to: 'vaghelaabhishek2580@gmail.com',
      replyTo: email,
      subject: `[Dev Studio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: monospace; padding: 20px; background: #0a0a0a; color: #fafafa; border-radius: 8px;">
          <h2 style="color: #a855f7; margin-bottom: 16px;">New Contact Form Submission</h2>
          <p><strong style="color: #84cc16;">Name:</strong> ${name}</p>
          <p><strong style="color: #84cc16;">Email:</strong> <a href="mailto:${email}" style="color: #06b6d4;">${email}</a></p>
          <p><strong style="color: #84cc16;">Subject:</strong> ${subject}</p>
          <hr style="border-color: #222; margin: 16px 0;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
