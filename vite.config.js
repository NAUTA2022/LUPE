import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    port: 3000, // o el puerto que prefieras
    open: true, // abre el navegador automáticamente
    hmr: true,  // asegúrate de que HMR esté activo
  },
})
