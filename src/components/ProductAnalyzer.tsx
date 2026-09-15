'use client';

import { useState } from 'react';

type Campaign = {
  productSummary: string;
  visualBrief: string;
  hooks: string[];
  adCopy: string;
  cta: string;
};

export default function ProductAnalyzer() {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [error, setError] = useState('');

  const handleGodModeAnalysis = () => {
    const normalizedProductName = productName.trim();
    if (!normalizedProductName) {
      setError('Lütfen ürün adını girin.');
      return;
    }

    setError('');
    setIsAnalyzing(true);

    window.setTimeout(() => {
      setCampaign({
        productSummary: `${normalizedProductName} (${category.trim() || 'Genel Ticaret'})`,
        visualBrief: `9:16 Dikey Reels/TikTok Formatı | ${normalizedProductName} odaklı makro detay çekimleri + Dinamik Metin Katmanı`,
        hooks: [
          `"Neden herkes bu ${normalizedProductName} ürününü konuşuyor?"`,
          `"${normalizedProductName} ile tanışmadan önce sipariş vermeyin!"`,
        ],
        adCopy: `🔥 ${normalizedProductName} ile standartları yeniden belirliyoruz!\n\nDoğrudan ${targetAudience.trim() || 'kalite arayan kullanıcılar'} için geliştirilen bu özel seri, şıklığı ve fonksiyonelliği tek bir tasarımda buluşturuyor.\n\n⚡ Sınırlı Stok | Bugün Verilen Siparişlerde Ücretsiz Kargo!\n👉 Hemen incelemek ve sipariş vermek için profildeki linke tıklayın.`,
        cta: "Tek Tıkla Onayla & Instagram/TikTok'a Gönder",
      });
      setIsAnalyzing(false);
    }, 1800);
  };

  return (
    <section className="product-analyzer" aria-labelledby="product-analyzer-title">
      <div className="product-analyzer-heading">
        <h3 id="product-analyzer-title"><span aria-hidden="true">⚡</span> Otonom Pazarlama Engine (God Mode)</h3>
        <span>Vento AI v2.0</span>
      </div>

      <div className="product-analyzer-fields">
        <label>
          Ürün Adı *
          <input type="text" placeholder="Örn: Hakiki Deri Cüzdan" value={productName} onChange={(event) => setProductName(event.target.value)} />
        </label>
        <label>
          Kategori / Sektör
          <input type="text" placeholder="Örn: Aksesuar / E-Ticaret" value={category} onChange={(event) => setCategory(event.target.value)} />
        </label>
        <label>
          Hedef Kitle
          <input type="text" placeholder="Örn: Genç Profesyoneller" value={targetAudience} onChange={(event) => setTargetAudience(event.target.value)} />
        </label>
      </div>

      {error && <p className="product-analyzer-error" role="alert">{error}</p>}

      <button type="button" onClick={handleGodModeAnalysis} disabled={isAnalyzing} className="product-analyzer-submit">
        {isAnalyzing ? 'Görsel + Ürün Verisi Derin Analiz Ediliyor...' : '🚀 Ürünü Analiz Et & Kusursuz İçeriği Üret'}
      </button>

      {campaign && (
        <div className="campaign-result">
          <div className="campaign-result-heading"><span>Analiz Edilen Ürün</span><strong>{campaign.productSummary}</strong></div>
          <div><span>1. Önerilen Görsel/Video Brief&apos;i</span><p>{campaign.visualBrief}</p></div>
          <div><span>2. Dikkat Çekici Kanca Cümleleri (Hooks)</span><ul>{campaign.hooks.map((hook) => <li key={hook}>{hook}</li>)}</ul></div>
          <div><span>3. Satış Odaklı Reklam Metni</span><p className="campaign-copy">{campaign.adCopy}</p></div>
          <button type="button" className="campaign-cta">✓ {campaign.cta}</button>
        </div>
      )}
    </section>
  );
}
