'use client';

import { useState } from 'react';

type AnalysisResult = {
  vendor: string;
  date: string;
  amount: string;
};

type InvoiceAnalyzerProps = {
  fileName?: string;
};

export default function InvoiceAnalyzer({ fileName }: InvoiceAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);

    // Gerçek OCR/API entegrasyonu geldiğinde bu simülasyonun yerine çağrı eklenebilir.
    window.setTimeout(() => {
      const result = {
        vendor: 'ABC Teknoloji Ltd. Şti.',
        date: '2026-09-15',
        amount: '12.450,00',
      };

      setAnalysisResult(result);
      window.dispatchEvent(
        new CustomEvent('vento:ad-trigger', {
          detail: { ...result, placement: 'invoice-analysis', fileName },
        }),
      );
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="invoice-analyzer">
      <div className="invoice-analyzer-actions">
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="analyze-button"
        >
          {isAnalyzing ? 'Analiz ediliyor...' : 'Belgeyi analiz et'} <span>→</span>
        </button>
      </div>

      {isAnalyzing && (
        <p className="analysis-progress" role="status">
          Belge okunuyor ve alanlar çıkarılıyor...
        </p>
      )}

      {analysisResult && (
        <div className="invoice-result-card" role="status">
          <div className="invoice-result-heading">
            <strong>Analiz sonucu</strong>
            <span>✓ Tamamlandı</span>
          </div>
          {fileName && <p className="invoice-result-file">{fileName}</p>}
          <div className="invoice-result-fields">
            <p><span>Satıcı</span><strong>{analysisResult.vendor}</strong></p>
            <p><span>Tarih</span><strong>{analysisResult.date}</strong></p>
            <p><span>Toplam tutar</span><strong>₺{analysisResult.amount}</strong></p>
          </div>
        </div>
      )}

    </div>
  );
}
