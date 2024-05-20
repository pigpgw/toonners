import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@test1", replacement: "/src/test1" },
      { find: "@", replacement: "/src" },
    ],
  },
});
