import { defineConfig } from 'vite';
import svgr from '@svgr/rollup';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: true,  // Allow access from any IP address
    port: 5000,  // You can specify the port you want to use (default is 3000)
  },
});
