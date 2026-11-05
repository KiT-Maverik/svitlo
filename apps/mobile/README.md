# Svitlo Mobile

Portable React DOM + esbuild + Capacitor 7, consuming the existing UI Kit Lesson and Playground Scene Registry.

## Commands

From the repository root, install dependencies and run either:
- npm run dev --workspace @svitlo/mobile
- SVITLO_TEXTBOOK=playground npm run build --workspace @svitlo/mobile
- npm run typecheck --workspace @svitlo/mobile
- npm run test --workspace @svitlo/mobile
- npm run test:e2e --workspace @svitlo/mobile
- npm exec --workspace @svitlo/mobile -- cap sync

For a new native project on a machine with the required platform toolchains, run npm run native:add --workspace @svitlo/mobile after building. Commit the resulting Android/iOS source projects and run npm run sync --workspace @svitlo/mobile. Android requires Android SDK/Studio; iOS requires macOS and Xcode.

SVITLO_TEXTBOOK is validated against textbooks.json during preparation. The build uses the existing lesson/UI-localization generators, the UI Kit-owned flags, and the textbook-owned statically analyzable Scene Registry. Published JSON and assets go to apps/mobile/public and into apps/mobile/dist, never apps/web/public. The release config intentionally has no remote server URL or PWA Service Worker.

Mobile routes are / and /<language>/lesson/<uuid>. The lesson renderer, assessment and section controls are shared with Web. Account sync, licensing and content downloads are outside scope.
