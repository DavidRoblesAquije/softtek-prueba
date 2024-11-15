import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // permite el uso de funciones como describe y test sin importar vitest explícitamente
    environment: "jsdom", // configura el entorno para emular un navegador
    setupFiles: "./src/setupTests.js", // archivo de configuración opcional
  },
});
