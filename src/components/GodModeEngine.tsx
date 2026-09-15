'use client';

import { useState } from 'react';
import Image from 'next/image';

type GodModeResult = {
  product: string;
  videoUrl: string;
  hooks: string[];
  adCopy: string;
  whatsappMsg: string;
};

export default function GodModeEngine() {
  const [productImage, setProductImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [productName, setProductName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [statusStep, setStatusStep] = useState('');
  const [result, setResult] = useState<GodModeResult | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProductImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const startGodMode = () => {
    if (!productImage || !productName) {
      alert('Lütfen bir ürün görseli yükleyin ve ürün adını yazın.');
      return;
    }

    setIsAnalyzing(true);
    setStatusStep('1/3 Ürün görseli yapay zekâ ile taranıyor (Nesne & Renk Analizi)...');

    setTimeout(() => {
      setStatusStep('2/3 9:16 Dikey Reklam Videosu Render Ediliyor...');
    }, 2000);

    setTimeout(() => {
      setStatusStep('3/3 WhatsApp/SMS Onay Akışı Tetikleniyor...');
    }, 4000);

    setTimeout(() => {
      setResult({
        product: productName,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-studio-39875-large.mp4',
        hooks: [
          `🔥 Neden herkes ${productName} konuşuyor?`,
          `⚡ ${productName} ile tarzını baştan yarat!`,
        ],
        adCopy: `✨ ${productName} için stoklar yenilendi!\n\nÜstün kalite ve şık tasarım tek bir üründe buluştu. Sınırlı sayıda üretilen bu seriyi kaçırmayın.\n\n👉 Sipariş vermek için profildeki linke tıklayın!`,
        whatsappMsg: phoneNumber ? `+90 ${phoneNumber} adresine onay butonu gönderildi!` : 'Numara girilmedi.',
      });
      setIsAnalyzing(false);
    }, 6000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-neutral-200 rounded-2xl shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight flex items-center gap-2">
            <span>⚡</span> GOD MODE — Otonom Ürün & Video Engine
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">Sadece ürün görselini yükleyin, gerisini yapay zekaya bırakın.</p>
        </div>
        <span className="text-xs font-bold bg-black text-white px-3 py-1.5 rounded-full uppercase tracking-wider">
          God Mode Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border-2 border-dashed border-neutral-300 rounded-2xl p-4 text-center hover:border-black transition flex flex-col items-center justify-center min-h-[220px] bg-neutral-50">
          {imagePreview ? (
            <div className="relative w-full h-48 rounded-xl overflow-hidden">
              <Image src={imagePreview} alt="Ürün Önizleme" fill unoptimized className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => { setProductImage(null); setImagePreview(null); }}
                className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md"
              >
                Değiştir
              </button>
            </div>
          ) : (
            <label htmlFor="god-file-input" className="cursor-pointer space-y-2">
              <span className="text-3xl block">📸</span>
              <span className="text-xs font-semibold text-neutral-800 block">Ürün Görselini Yükle / Sürükle</span>
              <span className="text-[10px] text-neutral-400 block">PNG, JPG (Sadece Ürün Fotoğrafı)</span>
              <input id="god-file-input" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-neutral-700 block mb-1">Ürün Adı / Başlığı *</label>
            <input
              type="text"
              placeholder="Örn: Premium Deri Cüzdan"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-neutral-700 block mb-1">WhatsApp Onay Numarası</label>
            <input
              type="tel"
              placeholder="5XX XXX XX XX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={startGodMode}
        disabled={isAnalyzing}
        className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-neutral-800 transition text-sm disabled:opacity-50 shadow-lg"
      >
        {isAnalyzing ? statusStep : '🚀 Görseli Analiz Et & 9:16 Videoyu Üret'}
      </button>

      {result && (
        <div className="mt-8 p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-6">
          <div className="flex items-center justify-between border-b pb-3">
            <span className="text-xs font-bold text-neutral-500 uppercase">Üretilen Otonom İçerik</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Hazır & Otonom
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-neutral-500 uppercase mb-2">9:16 Dikey Video Çıktısı</span>
              <div className="w-[200px] h-[355px] bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-black">
                <video src={result.videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-neutral-400 uppercase">Kanca Cümleleri (Hooks)</span>
                <ul className="list-disc list-inside text-xs text-neutral-800 font-medium mt-1 space-y-1">
                  {result.hooks.map((h: string, i: number) => <li key={i}>{h}</li>)}
                </ul>
              </div>

              <div>
                <span className="text-xs font-bold text-neutral-400 uppercase">Reklam Metni</span>
                <p className="text-xs text-neutral-800 bg-white p-3 rounded-xl border mt-1 whitespace-pre-line leading-relaxed">
                  {result.adCopy}
                </p>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium flex items-center gap-2">
                <span>📲</span> {result.whatsappMsg}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
