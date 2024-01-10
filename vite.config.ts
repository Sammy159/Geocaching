import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Geocaching",
        short_name: "Geocaching",
        description: "Erkunden Sie Ihre Umwelt!",
        theme_color: "hsl(0, 0%, 10%)",
        background_color: "hsl(0, 0%, 10%)",
        display: "standalone",
        start_url: ".",
        icons: [
          {
            src: "/icon-geocaching_x128.png",
            sizes: "128x128",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {},
      // Benutzerdefinierte Berechtigungen aktivieren
      registerType: "prompt",
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
    }),
  ],
});
