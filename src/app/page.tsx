"use client";

import { ChangeEvent, DragEvent, useEffect, useState } from "react";

const navigation = ["Genel Bakış", "Faturalar", "Raporlar", "Ayarlar"];

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleFile(file: File | undefined) {
    if (!file) return;
    if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
      setFileError("Sadece PDF, JPG veya PNG dosyaları yüklenebilir.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setFileError("Dosya boyutu 10 MB'dan küçük olmalı.");
      return;
    }
    setFileError("");
    setSelectedFile(file);
    setPreviewUrl(file.type.startsWith("image/") ? URL.createObjectURL(file) : null);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    handleFile(event.target.files?.[0]);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files[0]);
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">V</span><span>vento<span className="brand-accent">.</span></span></div>
        <div className="workspace-label">ÇALIŞMA ALANI</div>
        <nav className="navigation" aria-label="Ana navigasyon">
          {navigation.map((item, index) => (
            <button className={`nav-item ${index === 0 ? "active" : ""}`} key={item} type="button">
              <span className="nav-icon">{["⌂", "▤", "◒", "⚙"][index]}</span>{item}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer"><span className="status-dot" /> Sistemler çalışıyor</div>
      </aside>

      <main className="content">
        <header className="topbar">
          <div><p className="eyebrow">PAZARTESİ, 15 EYLÜL 2026</p><h1>Günaydın, Burkay.</h1></div>
          <div className="profile"><span className="profile-avatar">BŞ</span><span><strong>Burkay Şentürk</strong><small>Yönetici</small></span><span className="chevron">⌄</span></div>
        </header>

        <section className="intro"><div><p className="eyebrow">GENEL BAKIŞ</p><h2>Finansını <em>akışta</em> tut.</h2><p className="intro-copy">Belgelerini yükle, işlerini düzenle ve işletmeni tek bir yerden yönet.</p></div><div className="date-pill"><span>◷</span> Bu ay <strong>Eylül 2026</strong> <span>⌄</span></div></section>

        <section className="stats" aria-label="Özet bilgiler">
          <article className="stat-card"><span className="stat-icon coral">↗</span><div><p>Bu ayki gelir</p><strong>₺128.450,00</strong><small className="positive">↑ %12,4 <span>geçen aya göre</span></small></div></article>
          <article className="stat-card"><span className="stat-icon mint">↘</span><div><p>Bu ayki gider</p><strong>₺42.680,00</strong><small className="negative">↓ %4,8 <span>geçen aya göre</span></small></div></article>
          <article className="stat-card"><span className="stat-icon sand">▤</span><div><p>Bekleyen fatura</p><strong>12 <small>adet</small></strong><small className="muted">İşlem bekliyor</small></div></article>
        </section>

        <section className="workspace-grid">
          <div className="upload-panel">
            <div className="panel-heading"><div><p className="eyebrow">HIZLI İŞLEM</p><h3>Yeni fatura ekle</h3></div><span className="panel-number">01</span></div>
            <div className={`dropzone ${isDragging ? "dragging" : ""}`} onDragEnter={(event) => { event.preventDefault(); setIsDragging(true); }} onDragOver={(event) => event.preventDefault()} onDragLeave={() => setIsDragging(false)} onDrop={handleDrop}>
              {previewUrl ? <img className="document-preview" src={previewUrl} alt="Seçilen fatura önizlemesi" /> : <div className="upload-icon">↑</div>}
              <h4>{selectedFile ? selectedFile.name : "Fatura veya fişini ekle"}</h4>
              <p>{selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB · Analize hazır` : "Kamerayla çek veya cihazından seç"}</p>
              <div className="upload-actions">
                <label className="upload-button camera-button" htmlFor="camera-upload"><span>⌾</span> Kamerayla çek</label>
                <label className="upload-button file-button" htmlFor="invoice-upload"><span>＋</span> Dosyadan seç</label>
              </div>
              <input id="camera-upload" type="file" accept="image/*" capture="environment" onChange={handleFileChange} hidden />
              <input id="invoice-upload" type="file" accept="application/pdf,image/jpeg,image/png" onChange={handleFileChange} hidden />
              {fileError ? <small className="file-error">{fileError}</small> : <small>PDF, JPG veya PNG · Maks. 10 MB</small>}
            </div>
          </div>
          <div className="activity-panel"><div className="panel-heading"><div><p className="eyebrow">SON HAREKETLER</p><h3>Aktivite akışı</h3></div><button className="link-button" type="button">Tümünü gör →</button></div><div className="activity-list"><div className="activity-item"><span className="activity-badge coral">↗</span><div><strong>Fatura yüklendi</strong><p>ABC Teknoloji Ltd. Şti.</p></div><time>2 dk önce</time></div><div className="activity-item"><span className="activity-badge mint">✓</span><div><strong>Ödeme alındı</strong><p>₺8.450,00 · Müşteri ödemesi</p></div><time>1 saat önce</time></div><div className="activity-item"><span className="activity-badge sand">▤</span><div><strong>Rapor hazırlandı</strong><p>Ağustos 2026 finans raporu</p></div><time>Dün</time></div></div></div>
        </section>
        <section className="results-panel">
          <div className="panel-heading"><div><p className="eyebrow">BELGE ANALİZİ</p><h3>Fatura sonuçları</h3></div><span className={`result-status ${selectedFile ? "ready" : ""}`}><span />{selectedFile ? "Analize hazır" : "Belge bekleniyor"}</span></div>
          {selectedFile ? <div className="result-content"><div className="result-file"><span className="file-type">{selectedFile.type === "application/pdf" ? "PDF" : "IMG"}</span><div><strong>{selectedFile.name}</strong><p>Belge başarıyla eklendi · Otomatik okuma bekliyor</p></div></div><div className="result-fields"><div><span>Satıcı</span><strong>--</strong></div><div><span>Fatura tarihi</span><strong>--</strong></div><div><span>Toplam tutar</span><strong>--</strong></div><button type="button" className="analyze-button">Belgeyi analiz et <span>→</span></button></div></div> : <div className="empty-results"><span className="empty-icon">✦</span><div><strong>Sonuçlar burada görünecek</strong><p>Bir fatura veya fiş yüklediğinde satıcı, tarih ve toplam tutar bilgileri otomatik olarak listelenir.</p></div></div>}
        </section>
        <footer className="content-footer">Vento OS <span>v1.0.0</span><span className="footer-right">Güvenli ve şeffaf finans yönetimi</span></footer>
      </main>
    </div>
  );
}
