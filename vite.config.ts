import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/", // Ensures proper asset loading in production
  plugins: [react()],
  build: {
    outDir: "dist", // Ensure output directory is set correctly
    emptyOutDir: true,
    minify: false,
  },
});
