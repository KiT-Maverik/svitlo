# Next.js Adapter

`@svitlo/nextjs-adapter` provides framework-specific integrations for Svitlo applications. It is **not** a general UI library: the reusable React/MUI components live in `@svitlo/ui-kit`, and framework-independent types and content processing live in Contracts and Engine.

## Lesson route

In each standalone Next.js textbook:

```tsx
// src/app/[language]/lesson/[lessonId]/page.tsx
import { createLessonPage } from '@svitlo/nextjs-adapter/lesson';
import { loadLessonResponse } from '@/lib/lessons/loadLessonResponse';
import { loadUiKitMessages } from '@/lib/uiKit/loadUiKitMessages';
import HostLesson from '@/components/Lesson';

const lessonPage = createLessonPage({
  loadLesson: loadLessonResponse,
  loadMessages: loadUiKitMessages,
  renderLesson: props => <HostLesson {...props} />,
});

export const generateMetadata = lessonPage.generateMetadata;
export default lessonPage.Page;
```

The adapter handles language/ID resolution, Next.js 404 handling, response loading and page metadata. **Only** the host supplies the textbook's published JSON loader and any application-specific scene registry, navigation hooks, framework link components, and UI host bindings. Runtime lesson data is read from published JSON rather than authoring `*.data.ts` modules.

For Next.js image optimization, wrap your lesson UI with `ImageRendererProvider` from `@svitlo/ui-kit/widgets`, passing `NextImageRenderer` from `@svitlo/nextjs-adapter/image`.

## Framework independence

Never import `next/*` from the UI Kit or Engine. Next.js components, SSR and navigation must remain in this adapter or in minimal application-level host bindings. This allows the same Lesson UI to run in other React DOM environments such as Electron or Capacitor, with alternate data providers and navigation adapters.

UI Kit's Lesson translations are authored under `shared/ui-kit/data/components/Lesson` and published by the existing `shared/ui-kit/scripts/generate-locales.mjs` into the consuming textbook's `public/data/ui-kit/<locale>.json` files, using the full supported locale set.
