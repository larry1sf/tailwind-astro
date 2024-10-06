// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercelServerless from '@astrojs/vercel/serverless';
import preact from '@astrojs/preact';
// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact()],
  output:"hybrid",
  adapter:vercelServerless({
    edgeMiddleware:true
  })
});