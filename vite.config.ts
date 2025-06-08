import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import tsconfigpaths from 'vite-tsconfig-paths'
export default defineConfig({
  plugins: [
    react(),
    // Add the TanStack Router plugin for file-based routing
    TanStackRouterVite(),
    tsconfigpaths()
  
  ],
  server : {
    proxy : {
      '/api': {
        target: 'https://resume-builder-f514.onrender.com',
        changeOrigin: true,
        secure: true,
         rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
  
})