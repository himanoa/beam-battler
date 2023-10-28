const { defineConfig } = require('vite')

export default defineConfig({
  root: './src',
  optimizeDeps: {
    esbuildOptions: {
      jsx: 'automatic'
    }
  }
})
