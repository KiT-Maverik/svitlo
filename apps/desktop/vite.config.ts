import { defineConfig } from 'vite';

/** Vite builds a standalone React DOM bundle with all statically registered Scene chunks. */
export default defineConfig(({ command }) => ({
  base: '/',
  publicDir: 'public',
  build: {
    outDir: 'dist-renderer',
    emptyOutDir: true,
    target: 'es2022',
    modulePreload: true,
    // Workspace symlinks resolve to shared/*/dist outside node_modules.
    // The existing Engine/Contracts/UI Kit build produces CommonJS, so
    // Rollup must transform those paths instead of assuming ESM exports.
    commonjsOptions: { include: [/node_modules/, /shared[\\/](?:engine|contracts|ui-kit)[\\/]dist/] },
  },
  plugins: [
    {
      name: 'packaged-csp',
      transformIndexHtml(html) {
        if (command === 'serve') return html; // Vite HMR needs development WebSocket.
        return html.replace(
          '</head>',
          '<meta http-equiv="Content-Security-Policy" content="default-src &#39;none&#39;; script-src &#39;self&#39;; style-src &#39;self&#39; &#39;unsafe-inline&#39;; img-src &#39;self&#39; data: blob:; font-src &#39;self&#39; data:; media-src &#39;self&#39; blob:; connect-src &#39;self&#39;; object-src &#39;none&#39;; base-uri &#39;none&#39;; form-action &#39;none&#39;">\n  </head>',
        );
      },
    },
  ],
}));
