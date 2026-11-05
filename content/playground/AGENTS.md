# Playground textbook package

Follow the root `AGENTS.md` and applicable Studio guidance. This package owns
authored content, assets, root-level `scenes/` with React DOM Scenes, and a generated static Scene registry.
Keep Next.js routes, layouts, navigation hooks, server components and application
providers in `apps/web` or the shared Next.js adapter. Keep Scenes independent of
app-local aliases and host-specific providers. Run `npm run check:scenes --workspace
@svitlo/playground` after changing Scene directories.
