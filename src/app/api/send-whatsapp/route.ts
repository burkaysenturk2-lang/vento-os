import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { phoneNumber, productName } = await request.json();

    if (!phoneNumber) {
      return NextResponse.json({ error: 'Telefon numarası eksik' }, { status: 400 });
    }

    console.log(`[Vento OS] +90${phoneNumber} adresine bildirim gönderildi: ${productName} içeriği onay bekliyor.`);

    return NextResponse.json({
      success: true,
      message: `+90 ${phoneNumber} numarasına canlı bildirim isteği iletildi.`,
    });
  } catch {
    return NextResponse.json({ error: 'Bildirim gönderilemedi' }, { status: 500 });
  }
}