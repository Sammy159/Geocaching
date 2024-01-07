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
            src: "/icon-geocaching.png",
            sizes: "1024x1024",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
