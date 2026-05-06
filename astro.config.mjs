import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://three-lens-framework.com',
  output: 'static',
  integrations: [tailwind(), preact()],
  vite: {
    ssr: { noExternal: ['preact'] }
  }
});
