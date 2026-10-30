// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { slovakSpacing } from './src/i18n/typography.mjs';

export default defineConfig({
  site: 'https://michaldeco.com',
  // Keep file names as in src/pages, so src/pages/sk/404.astro becomes sk/404.html,
  // which Cloudflare serves for missing pages under /sk/.
  build: { format: 'preserve' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sk'],
    routing: { prefixDefaultLocale: false },
  },
  markdown: {
    processor: satteri({ mdastPlugins: [slovakSpacing] }),
  },
});
