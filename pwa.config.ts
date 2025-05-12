import { VitePWA } from "vite-plugin-pwa";

export default VitePWA({
  registerType: "autoUpdate",
  includeAssets: ["favicon.svg"],
  manifest: {
    name: "English Word Trainer",
    short_name: "WordTrainer",
    description: "Learn English vocabulary offline‑first.",
    theme_color: "#0d99ff",
    background_color: "#ffffff",
    display: "standalone",
    icons: [
      { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
      {
        src: "icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
});
