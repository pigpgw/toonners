import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      { find: "@assets", replacement: "/src/assets" },
      { find: "@components", replacement: "/src/components" },
      { find: "@routes", replacement: "/src/routes" },
      { find: "@hooks", replacement: "/src/hooks" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@slices", replacement: "/src/slices" },
      { find: "@styles", replacement: "/src/styles" },
      { find: "@utils", replacement: "/src/utils" },
      { find: "@", replacement: "/src" },
    ],
  },
});
