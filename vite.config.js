import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000, // 👈 change your port here
    host: true, // optional (access from mobile / LAN)
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:8080",
    //     changeOrigin: true,
    //     secure: false,
    //   },

    proxy: {
    "/auth": {
      target: "http://localhost:8080",
      changeOrigin: true,
    },

    },
  },
});