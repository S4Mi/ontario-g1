import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/ontario-g1/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,json}'],
        cleanupOutdatedCaches: true,
        sourcemap: true
      },
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'Ontario G1 Study App',
        short_name: 'G1 Study',
        description: 'Comprehensive study app for Ontario G1 driving test',
        theme_color: '#1e40af',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/ontario-g1/',
        start_url: '/ontario-g1/',
        icons: [
          {
            src: '/ontario-g1/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  server: {
    port: 3000,
    open: true
  }
})
