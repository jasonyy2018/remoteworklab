import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '请填写所有必填字段' },
        { status: 400 }
      );
    }

    // Console log contact submission (SMTP or Resend hook)
    console.log(`[Contact Form Received] Name: ${name}, Email: ${email}, Message: ${message}`);

    // Standard SMTP simulation/handling using configured environment variables
    // In production, nodemailer.transporter.sendMail() or resend.emails.send() can be called here.

    return NextResponse.json({
      success: true,
      message: '感谢您的留言！我们已收到您的信息，会尽快与您联系。',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: '提交失败，请稍后重试。' },
      { status: 500 }
    );
  }
}
