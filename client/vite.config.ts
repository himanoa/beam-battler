import { defineConfig } from 'vite'

export default defineConfig({
  root: './src',
  optimizeDeps: {
    esbuildOptions: {
      jsx: 'automatic'
    }
  }
})
