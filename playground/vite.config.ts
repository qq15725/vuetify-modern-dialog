import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(() => {
  if (process.env.MODE === 'local') {
    return {
      plugins: [
        vue(),
        vueDevTools(),
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
          'vuetify-modern-dialog/styles': fileURLToPath(new URL('../src/index.ts', import.meta.url)),
          'vuetify-modern-dialog': fileURLToPath(new URL('../src/index.ts', import.meta.url)),
        },
      },
    }
  }

  return {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
