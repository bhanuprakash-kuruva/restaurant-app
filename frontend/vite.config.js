// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This will proxy any request starting with /customer to the backend URL
      '/': {
        target: 'https://restaurant-app-three-pied.vercel.app', // Backend URL
        changeOrigin: true, // Ensures the origin of the request matches the target
        // secure: false, // Set to false if the backend is HTTP (and not HTTPS)
      },
    },
  },
});

