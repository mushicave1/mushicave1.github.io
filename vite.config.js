import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'docs',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [react()]
})
