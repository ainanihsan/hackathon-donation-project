import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,

    // ✅ Add this block to proxy API requests to FastAPI
    proxy: {
      "/api": {
        target: "http://localhost:8000", // your FastAPI backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // strips /api prefix
      },
    },
  },

  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
// Now in your React code, you can use fetch("/api/your-endpoint") to call FastAPI