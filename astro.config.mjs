import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import vue from '@astrojs/vue'

import vercel from '@astrojs/vercel'

// Static by default: pages and images are built once and served from Vercel's
// CDN. Routes that need a server (src/pages/api/*) opt out with
// `export const prerender = false` and deploy as Vercel Functions.
export default defineConfig({
  site: 'https://psycarlo.com',
  integrations: [vue()],
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  }),
  vite: {
    plugins: [tailwindcss()]
  }
})
