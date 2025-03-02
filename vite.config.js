import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',           // ✅ Change 'build' to 'dist'
    assetsDir: 'assets',      // ✅ Simplify asset directory
    rollupOptions: {
      input: 'index.html',
    },
  },
});
