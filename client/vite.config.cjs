const { defineConfig } = require('vite')

export default defineConfig({
  root: './src',
  resolve: {
    alias: {
      '~': './src/*'
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      jsx: 'automatic'
    }
  }
})
