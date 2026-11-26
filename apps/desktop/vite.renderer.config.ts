import { defineConfig } from 'vite';

/** Forge Vite bundles the offline React renderer and all statically registered Scene chunks. */
export default defineConfig(({ command }) => ({
  base: '/',
  publicDir: 'public',
  // Keep the fixed loopback origin enforced by adapter-electron in development.
  server: { host: '127.0.0.1', port: 5173, strictPort: true },
  resolve: { preserveSymlinks: false },
  build: {
    // Forge owns the output directory: .vite/renderer/main_window.
    emptyOutDir: true,
    target: 'es2022',
    modulePreload: true,
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
