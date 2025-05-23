import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import environment from 'vite-plugin-environment'

export default defineConfig({
  plugins: [
    react(),
    environment(['VITE_API_URL'])
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})