import { defineConfig } from 'vite';
import svgr from '@svgr/rollup';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: true,  // Allow access from any IP address
    port: 5000,  // Port for React app (default is 3000)
    proxy: {
      // Proxy API requests to Flask backend on port 8080
      '/api': 'http://127.0.0.1:8080',
    },
  },
});
