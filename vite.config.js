// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // if using React
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(), // keep this if using React
    tailwindcss(),
  ],
});
