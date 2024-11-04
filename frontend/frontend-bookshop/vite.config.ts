import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Allow access from any IP address
    port: 5000,  // You can specify the port you want to use (default is 3000)
  },
});
