import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@api': '/src/api',
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@routes': '/src/routes',
      '@hooks': '/src/hooks',
      '@pages': '/src/pages',
      '@slices': '/src/slices',
      '@styles': '/src/styles',
      '@utils': '/src/utils',
      '@': '/src',
    },
  },
  optimizeDeps: {
    exclude: ['chunk-HU3KSRQA.js'],
  },
});
