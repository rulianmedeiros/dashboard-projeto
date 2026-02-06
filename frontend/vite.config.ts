import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react( )],
  base: '/', // <-- Adicione esta linha! Ela corrige o erro 404.
  server: {
    host: '0.0.0.0',
    port: 5173,
  }
})
