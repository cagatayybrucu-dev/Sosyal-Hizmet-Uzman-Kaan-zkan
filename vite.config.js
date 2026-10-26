import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react-dom") || id.includes("/react/")) return "react-vendor";
          if (id.includes("@supabase")) return "supabase-vendor";
          if (id.includes("@vercel/analytics")) return "analytics-vendor";
          return "vendor";
        },
      },
    },
  },
})
