import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'ui-components': ['react-icons', 'clsx'],
          'form': ['react-hook-form', 'zod', '@hookform/resolvers'],
          'services': ['axios']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})