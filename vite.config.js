import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined
          }

          if (id.includes('framer-motion')) {
            return 'framerMotion'
          }

          if (id.includes('node_modules/three') || id.includes('node_modules\\three')) {
            return 'three'
          }

          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules\\react\\') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules\\react-dom\\')
          ) {
            return 'react'
          }

          return undefined
        },
      },
    },
  },
})
