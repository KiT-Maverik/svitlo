# Serve prebuilt Mobile bundle

The workspace command `app:start` invokes `serve-built.mjs` to serve
`apps/mobile/dist` without content preparation, esbuild, or package builds.
Run `app:build` first; missing output fails closed. The server listens at
`127.0.0.1:5174` by default and accepts an optional `PORT` override.

It streams static assets with browser MIME types, serves `index.html` for
client-side HTML routes, and returns 404 for missing assets. It never writes
into `dist`. This is for local previews and browser smoke/E2E testing, not
for public production HTTP deployment.

Focused validation:

    node --test apps/mobile/scripts/serveBuilt/serve-built.test.mjs
