import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import monkey, { cdn } from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    monkey({
      entry: 'src/main.jsx',
      userscript: {
        name: 'AO3 Reader - Vite',
        icon: 'https://www.google.com/s2/favicons?sz=64&domain=archiveofourown.org',
        namespace: 'https://misa.pw',
        match: ['https://archiveofourown.org/*'],
        connect: ['download.archiveofourown.org'],
        "run-at": 'document-idle',
      },
      build: {
        externalGlobals: {
          preact: cdn.jsdelivr('preact', 'dist/preact.min.js'),
        },
      },
    }),
  ],
});
