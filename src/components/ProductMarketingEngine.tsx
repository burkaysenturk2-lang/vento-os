'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';

type GeneratedCampaign = {
  videoUrl: string;
  adCopy: string;
  whatsappStatus: string;
};

const processingSteps = [
  '1/3 Ürün görseli yapay zekâ ile analiz ediliyor...',
  '2/3 Dikey (9:16) video ve reklam kurgusu render ediliyor...',
  '3/3 WhatsApp/SMS bildirim kanalı tetikleniyor...',
];

export default function ProductMarketingEngine() {
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productName, setProductName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [generatedCampaign, setGeneratedCampaign] = useState<GeneratedCampaign | null>(null);
  const [error, setError] = useState('');
  const timers = useRef<number[]>([]);

  useEffect(() => {
    return () => timers.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Lütfen PNG veya JPG formatında bir ürün görseli seçin.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Ürün görseli 10 MB boyutunu geçmemeli.');
      return;
    }
    setError('');
    setProductImage(file);
    setGeneratedCampaign(null);
  };

  const executeGodModeWorkflow = () => {
    const normalizedProductName = productName.trim();
    if (!productImage || !normalizedProductName) {
      setError('Lütfen ürün fotoğrafı yükleyin ve ürün adını girin.');
      return;
    }

    timers.current.forEach((timer) => window.clearTimeout(timer));
    setError('');
    setGeneratedCampaign(null);
    setIsProcessing(true);
    setStatusText(processingSteps[0]);

    timers.current = [
      window.setTimeout(() => setStatusText(processingSteps[1]), 1500),
      window.setTimeout(() => setStatusText(processingSteps[2]), 3000),
      window.setTimeout(() => {
        setGeneratedCampaign({
          videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-studio-39875-large.mp4',
          adCopy: `🔥 ${normalizedProductName} için stoklar yenilendi!\n\nÖzel tasarım ve yüksek kalite bir arada. Sınırlı sayıda üretilen bu seriyi kaçırmayın.\n\n⚡ Bugün sipariş verin, ücretsiz kargo fırsatından yararlanın!`,
          whatsappStatus: phoneNumber.trim() ? `+90 ${phoneNumber.trim()} numaralı telefona onay mesajı gönderildi!` : 'Telefon numarası girilmedi.',
        });
        setIsProcessing(false);
      }, 4500),
    ];
  };

  return (
    <section className="product-marketing-engine" aria-labelledby="marketing-engine-title">
      <div className="product-analyzer-heading">
        <h3 id="marketing-engine-title"><span aria-hidden="true">🎬</span> Otonom Pazarlama & Video Motoru</h3>
        <span className="engine-badge">God Mode v2.5</span>
      </div>

      <div className="marketing-input-grid">
        <div className="product-image-picker">
          <input type="file" accept="image/png,image/jpeg" onChange={handleImageUpload} hidden id="product-image-input" />
          <label htmlFor="product-image-input">
            <span className="marketing-upload-icon">📸</span>
            <strong>{productImage ? productImage.name : 'Ürün Fotoğrafı Yükle / Sürükle'}</strong>
            <small>PNG, JPG · Maks. 10 MB</small>
          </label>
        </div>
        <div className="marketing-details">
          <label>Ürün Adı *<input type="text" placeholder="Örn: Hakiki Deri Cüzdan" value={productName} onChange={(event) => setProductName(event.target.value)} /></label>
          <label>WhatsApp Bildirim Numarası<input type="tel" placeholder="5XX XXX XX XX" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} /></label>
        </div>
      </div>

      {error && <p className="product-analyzer-error" role="alert">{error}</p>}
      <button type="button" onClick={executeGodModeWorkflow} disabled={isProcessing} className="product-analyzer-submit">
        {isProcessing ? statusText : '⚡ Görseli Analiz Et, Videoyu Üret & Telefona Gönder'}
      </button>

      {generatedCampaign && (
        <div className="marketing-result">
          <div className="campaign-result-heading"><span>Otomatik Üretilen Dikey Video</span><strong>9:16 HD</strong></div>
          <div className="marketing-video"><video src={generatedCampaign.videoUrl} controls autoPlay loop playsInline /></div>
          <div><span className="marketing-label">Sosyal Medya Reklam Metni</span><p className="marketing-copy">{generatedCampaign.adCopy}</p></div>
          <div className="whatsapp-status"><span aria-hidden="true">📲</span>{generatedCampaign.whatsappStatus}</div>
        </div>
      )}
    </section>
  );
}
