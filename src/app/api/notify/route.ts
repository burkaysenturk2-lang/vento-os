import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { phoneNumber, productName } = await req.json();

    if (!phoneNumber) {
      return NextResponse.json({ error: 'Telefon numarası eksik' }, { status: 400 });
    }

    // Gerçek WhatsApp Business Cloud API / Twilio Webhook çağrısı buraya eklenebilir.
    console.log(`[Vento OS] +90${phoneNumber} adresine bildirim gönderildi: ${productName} içeriği onay bekliyor.`);

    return NextResponse.json({
      success: true,
      message: `+90 ${phoneNumber} numarasına canlı bildirim isteği iletildi.`,
    });
  } catch {
    return NextResponse.json({ error: 'Bildirim gönderilemedi' }, { status: 500 });
  }
}
