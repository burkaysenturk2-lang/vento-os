"use client";

import type { MouseEvent } from "react";

const defaultNavigation = [
  { label: "Genel Bakış", icon: "⌂" },
  { label: "Faturalar", icon: "▤" },
  { label: "Raporlar", icon: "◒" },
  { label: "Ayarlar", icon: "⚙" },
];

export type NavigationItem = {
  label: string;
  icon: string;
};

type SidebarProps = {
  activeItem?: string;
  navigation?: NavigationItem[];
  onItemSelect?: (item: NavigationItem) => void;
};

export default function Sidebar({
  activeItem = "Genel Bakış",
  navigation = defaultNavigation,
  onItemSelect,
}: SidebarProps) {
  function handleItemClick(
    event: MouseEvent<HTMLButtonElement>,
    item: NavigationItem,
  ) {
    event.preventDefault();
    onItemSelect?.(item);
  }

  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">V</span>
        <span>
          vento<span className="brand-accent">.</span>
        </span>
      </div>
      <div className="workspace-label">ÇALIŞMA ALANI</div>
      <nav className="navigation" aria-label="Ana navigasyon">
        {navigation.map((item) => (
          <button
            className={`nav-item ${item.label === activeItem ? "active" : ""}`}
            key={item.label}
            type="button"
            aria-current={item.label === activeItem ? "page" : undefined}
            onClick={(event) => handleItemClick(event, item)}
          >
            <span className="nav-icon" aria-hidden="true">
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <span className="status-dot" /> Sistemler çalışıyor
      </div>
    </aside>
  );
}
