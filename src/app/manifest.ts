import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vento OS",
    short_name: "Vento",
    description: "İşletmen için sade ve akışta finans yönetimi.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f7f4",
    theme_color: "#20231f",
    lang: "tr",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}