import { defineConfig } from 'vite';

/** Forge owns the main entry, CJS output and Electron/Node externals. */
export default defineConfig({
  build: {
    target: 'node22',
    minify: false,
  },
});
