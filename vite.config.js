import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // Load environment variables
  // const env = loadEnv(mode, process.cwd(), '');

  let env = 'https://goldfish-app-7eixm.ondigitalocean.app';

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      proxy: {
        '/api': {
          target: env,
          changeOrigin: true,
          secure: true,
          withCredentials: true,
          headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
          }
        }
      }
    }
  };
});