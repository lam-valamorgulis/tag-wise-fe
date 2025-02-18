import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allows access from external networks
    port: 3000, // Use the same port
    strictPort: true,
  },
});
