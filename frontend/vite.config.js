import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuration Vite pour le projet TaskManager Frontend
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
