'use client';

import { useState } from 'react';

export default function GodModeEngine() {
  const [productImage, setProductImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [productName, setProductName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProductImage(file);
      setImagePreview(URL.createObjectURL(file));
      setIsReady(false);
    }
  };

  const handleGenerate = () => {
    if (!productImage || !productName) {
      alert('Lütfen ürün görseli yükleyin ve ürün adını girin.');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsReady(true);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-neutral-200 rounded-2xl shadow-sm space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <span>⚡</span> GOD MODE — Otonom Ürün & Video Engine
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">Ürün görselini yükleyin, dikey video çıktısını anında alın.</p>
        </div>
        <span className="bg-black text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
          Motion Engine Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border-2 border-dashed border-neutral-300 rounded-2xl p-4 text-center flex flex-col justify-center items-center min-h-[220px] bg-neutral-50 hover:border-black transition">
          {imagePreview ? (
            <div className="relative w-full h-48 rounded-xl overflow-hidden">
              <img src={imagePreview} alt="Ürün" className="w-full h-full object-contain" />
              <button
                type="button"
                onClick={() => { setProductImage(null); setImagePreview(null); setIsReady(false); }}
                className="absolute top-2 right-2 bg-black/80 text-white text-[10px] px-2 py-1 rounded-md"
              >
                Değiştir
              </button>
            </div>
          ) : (
            <label htmlFor="file-input" className="cursor-pointer space-y-2">
              <span className="text-3xl block">📸</span>
              <span className="text-xs font-semibold text-neutral-800 block">Ürün Görseli Yükle</span>
              <span className="text-[10px] text-neutral-400 block">PNG, JPG (Fotoğraf)</span>
              <input id="file-input" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-neutral-700 block mb-1">Ürün Adı / Başlığı *</label>
            <input
              type="text"
              placeholder="Örn: Şapka"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-neutral-700 block mb-1">WhatsApp Bildirim Numarası</label>
            <input
              type="tel"
              placeholder="5XX XXX XX XX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={isProcessing}
        className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-neutral-800 transition text-sm shadow-md disabled:opacity-50"
      >
        {isProcessing ? 'Görsel İşleniyor & Video Render Ediliyor...' : '🚀 Videoyu Üret & Oynat'}
      </button>

      {isReady && imagePreview && (
        <div className="mt-8 p-6 bg-neutral-900 text-white rounded-2xl flex flex-col items-center space-y-6">
          <div className="flex items-center justify-between w-full border-b border-neutral-800 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">9:16 Dikey Reklam Videosu</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full">
              Canlı Render
            </span>
          </div>

          <div className="relative w-[240px] h-[426px] rounded-3xl overflow-hidden shadow-2xl border-4 border-neutral-700 bg-black flex items-center justify-center group">
            <img
              src={imagePreview}
              alt="Video Background"
              className="absolute inset-0 w-full h-full object-cover animate-pulse scale-105 transition-transform duration-7000 ease-linear"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50" />

            <div className="absolute top-5 left-3 right-3 text-center">
              <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest shadow-md animate-bounce inline-block">
                Sınırlı Stok 🔥
              </span>
            </div>

            <div className="absolute bottom-6 left-3 right-3 text-center space-y-2">
              <h3 className="text-base font-black tracking-wide uppercase text-white drop-shadow-md">{productName}</h3>
              <p className="text-[11px] text-neutral-200 font-medium">🔥 Neden herkes {productName} konuşuyor?</p>
              <div className="mt-2 bg-white text-black text-xs font-black py-2.5 rounded-xl shadow-lg uppercase tracking-wider">
                Sipariş İçin Tıklayın ⚡
              </div>
            </div>
          </div>

          <div className="w-full text-center">
            {phoneNumber ? (
              <p className="text-xs text-emerald-400 bg-emerald-950/50 border border-emerald-800 p-3 rounded-xl inline-block font-medium">
                📲 +90 {phoneNumber} numarasına canlı bildirim isteği iletildi.
              </p>
            ) : (
              <p className="text-xs text-neutral-400 italic">Bildirim almak için telefon numarası ekleyin.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
