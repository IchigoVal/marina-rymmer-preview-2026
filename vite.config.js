import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        impressum: fileURLToPath(new URL('./impressum.html', import.meta.url)),
        datenschutz: fileURLToPath(new URL('./datenschutz.html', import.meta.url)),
      },
    },
  },
});
