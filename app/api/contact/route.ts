import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    console.log(`[Contact Submission] Name: ${name}, Email: ${email}, Message: ${message}`);

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received. We will get back to you shortly.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Submission failed. Please try again later.' },
      { status: 500 }
    );
  }
}
