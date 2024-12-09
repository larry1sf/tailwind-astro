// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercelServerless from '@astrojs/vercel/serverless';
import preact from '@astrojs/preact';

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact(), icon()],
  vite:{
    resolve:{
      alias:{
        "react":"preact/compat",
        "react-dom":"preact/compat",
        "react/jsx-runtime":"preact/jsx-runtime"
      }
    }
  },
  output:"hybrid",
  adapter:vercelServerless({
    edgeMiddleware:true
  })
});