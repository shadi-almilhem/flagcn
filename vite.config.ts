import path from "node:path"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const moduleId = id.replaceAll("\\", "/")
          if (moduleId.includes("/node_modules/cmdk/")) return "command-vendor"
          if (moduleId.includes("/node_modules/sonner/")) return "toast-vendor"
          if (moduleId.includes("/node_modules/@base-ui/react/dialog/")) return "overlay-vendor"
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
})
