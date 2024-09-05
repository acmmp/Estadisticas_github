// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  output: 'server',  // Añade esta línea
  vite: {
    ssr: {
      noExternal: ['react-chartjs-2']
    }
  }
});
