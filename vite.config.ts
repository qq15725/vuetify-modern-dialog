import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import pkg from './package.json'

export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    minify: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: () => `index.js`,
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.peerDependencies || {}),
      ].map(v => new RegExp(`^${v}`)),
      output: {
        assetFileNames: () => {
          return 'index.css'
        },
      },
    },
  },
})
