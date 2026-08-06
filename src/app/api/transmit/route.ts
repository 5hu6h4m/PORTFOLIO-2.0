import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { message, from } = await req.json();

    if (!message || message.trim().length < 10) {
      return NextResponse.json({ error: 'Transmission too short.' }, { status: 400 });
    }

    // In production: integrate with Resend, SendGrid, or Nodemailer here.
    // For now: log the transmission and return success.
    console.log('📡 TRANSMISSION RECEIVED');
    console.log('FROM:', from || 'Anonymous');
    console.log('MESSAGE:', message);

    // TODO: Add your email service here, e.g.:
    // await resend.emails.send({ from: 'portfolio@yourdomain.com', to: 'shubhamjadhav.dev@gmail.com', subject: 'New Transmission', text: message });

    return NextResponse.json({ success: true, received: new Date().toISOString() });
  } catch {
    return NextResponse.json({ error: 'Transmission failed.' }, { status: 500 });
  }
}
