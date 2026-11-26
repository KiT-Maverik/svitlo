# UI Kit Storybook

The UI Kit uses **React/Vite Storybook** for platform-neutral component development. It must not depend on a Next.js host. The existing 21 `.stories.tsx` sources cover course pages, lesson UI, content blocks, questions and flashcards. The MDX discovery glob is retained for future authored documentation; `@storybook/addon-docs`, controls, autodocs and the MUI/CssBaseline decorator remain enabled.

The `viteFinal` aliases mirror UI Kit's `tsconfig.json` paths without `vite-tsconfig-paths` / `tsconfck`. `staticDirs` serves canonical flags from `assets/flags` under `/flags`. Preserve right-to-left examples and the existing localization fixtures in the stories.

From the repository root, after `npm ci`:

```sh
npm run storybook:start --workspace @svitlo/ui-kit
npm run storybook:build --workspace @svitlo/ui-kit
npm run package:build --workspace @svitlo/ui-kit
npm run code:check:types --workspace @svitlo/ui-kit
npm run test:locales --workspace @svitlo/ui-kit
npm run test:components --workspace @svitlo/ui-kit
npm audit --json
npm audit --omit=dev --json
npm explain tsconfck
```

The manually dispatched `UI Kit Storybook` Action checks that the static build still contains all 21 source story files, generated docs and a packaged flag. For interactive smoke testing, open representative course, Markdown, Carousel, question and RTL stories, inspect Controls/Docs, and verify `/flags/ua.svg` loads.

**Storybook 10 security compatibility:** React/Vite's 10.6.8 dependency range still selects docgen 0.7.0, whose `glob@13` chain brings vulnerable `minimatch@10`. The narrow root npm override selects maintained docgen `0.9.1`, which replaced `glob` with `tinyglobby`. This does not turn docgen or documentation off. Revisit the override once an upstream stable Storybook release declares the patched version.
