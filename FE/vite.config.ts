import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      { find: "@api", replacement: "/src/api" },
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
