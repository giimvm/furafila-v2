import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' permite abrir o build em qualquer hospedagem estática.
export default defineConfig({
  base: './',
  plugins: [react()],
});
