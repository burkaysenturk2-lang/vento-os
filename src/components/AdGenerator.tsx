'use client';

import { useEffect, useState } from 'react';

type AdData = {
  vendor: string;
  amount: string;
  date: string;
};

type AdTriggerDetail = AdData & {
  placement?: string;
  fileName?: string;
};

export default function AdGenerator() {
  const [adData, setAdData] = useState<AdData | null>(null);

  useEffect(() => {
    const handleAdTrigger = (event: Event) => {
      const detail = (event as CustomEvent<AdTriggerDetail>).detail;
      if (detail?.vendor && detail.amount && detail.date) {
        setAdData({
          vendor: detail.vendor,
          amount: detail.amount,
          date: detail.date,
        });
      }
    };

    window.addEventListener('vento:ad-trigger', handleAdTrigger);
    return () => window.removeEventListener('vento:ad-trigger', handleAdTrigger);
  }, []);

  if (!adData) return null;

  return (
    <div className="ad-generator mt-6 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-800">
          📢 Otomatik Üretilen Reklam İçeriği
        </h4>
        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800">
          Hazır
        </span>
      </div>

      <div className="whitespace-pre-line rounded-lg border border-neutral-200 bg-neutral-50 p-4 font-mono text-sm text-neutral-700">
        {`🧾 ${adData.vendor} faturası Vento OS ile saniyeler içinde işlendi!

💰 Toplam Tutar: ₺${adData.amount}
📅 Tarih: ${adData.date}

Finansal süreçlerinizi otomatikleştirmek ve yapay zeka ile tüm evraklarınızı yönetmek için Vento OS'i deneyin! 🚀`}
      </div>
    </div>
  );
}
