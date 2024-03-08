import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/media': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        pathRewrite: { '^/media': '' },
      },
      '/static': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        pathRewrite: { '^/static': '' },
      },
    },
  },
});