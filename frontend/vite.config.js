import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



export default {
  plugins: [react()],
  server: {
    proxy: {
      '/data': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rejectUnauthorized: false, // Add this line
      },
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rejectUnauthorized: false, // Add this line
      },
      '/user': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rejectUnauthorized: false, // Add this line
      },
    },
  },
};

