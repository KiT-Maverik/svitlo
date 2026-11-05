# Next.js Adapter

`@svitlo/nextjs-adapter` owns the **Next.js-specific boundary** for standalone textbook applications.
`@svitlo/ui-kit` owns reusable React/MUI UI and controls; `@svitlo/engine` owns framework-free response assembly.
Neither UI Kit nor Engine imports `next/*`.

## Standard published-JSON Lesson route

The textbook builds localized Lesson and UI Kit JSON into its own `public/data/` directory.
The standard route has **no per-app filesystem reader, locale reader, response assembler or router hook**:

```tsx
// learningApps/<book>/src/app/[language]/lesson/[lessonId]/page.tsx
import { createPublishedLessonPage } from '@svitlo/nextjs-adapter/lesson';
import BookLesson from '@/components/Lesson';

const lesson = createPublishedLessonPage({
  renderLesson: props => <BookLesson {...props} />,
});

export const generateMetadata = lesson.generateMetadata;
export default lesson.Page;
```

The adapter validates requested locale/UUID, resolves the selected published JSON,
constructs `LessonResponse` through Engine, reads exactly one UI Kit locale JSON,
handles 404/metadata, and streams dynamic Lesson data inside a `Suspense` boundary
for Next.js 16 Cache Components. **Only published JSON is used at runtime**;
authoring `*.data.ts` files are build-time only. Every textbook is still independently deployable.

`loadPublishedLesson` and `loadPublishedUiKitMessages` are public server-side
APIs (also exported from the package root), with separate textbook-local storage
root (`process.cwd()/public/data`). For alternate storage, use:

```tsx
import { createLessonPage } from '@svitlo/nextjs-adapter/lesson';

const lesson = createLessonPage({
  loadLesson: myCustomLessonLoader,
  loadMessages: myCustomUiKitLocaleLoader,
  renderLesson: props => <BookLesson {...props} />,
});
```

The standard `createPublishedLessonPage` also accepts optional
`loadLesson`/`loadMessages` overrides when only one source differs.

## Reusable Lesson UI and small host boundary

`Lesson` from `@svitlo/ui-kit/lesson` receives a typed response, translated UI Kit
messages, the current Lesson href, a layout and an application-owned Scene registry.
It owns navigation state. It passes its own pathname into LearningLayout; no
`useRouter` or `usePathname` is required inside UI Kit.

The only remaining required `createLessonLearningLayout` binding is
`useLocale` (returns `{locale, setLocale}`); `linkComponent` is optional
and can be `next/link` in a Next app. UI Kit uses MUI's `useColorScheme`
directly from the consuming app's React/MUI provider.

```tsx
'use client';

import Link from 'next/link';
import { createLessonLearningLayout } from '@svitlo/ui-kit/learning-layout';
import { Lesson } from '@svitlo/ui-kit/lesson';
import { ImageRendererProvider } from '@svitlo/ui-kit/widgets';
import { NextImageRenderer } from '@svitlo/nextjs-adapter/image';
import { useLessonLocale } from '@/i18n/useLessonLocale';
import { resolveScene } from '@/components/scenes/sceneLoader';

const Layout = createLessonLearningLayout({
  useLocale: useLessonLocale,
  linkComponent: Link,
});

// Render within the app's existing React + MUI providers.
export function BookLesson({ response, href, messages }) {
  return (
    <ImageRendererProvider renderer={NextImageRenderer}>
      <Lesson response={response} href={href} messages={messages}
        layout={Layout} sceneRegistry={resolveScene} />
    </ImageRendererProvider>
  );
}
```

For React DOM hosts without Next.js (Electron, Capacitor or Vite), omit
`NextImageRenderer`; UI Kit's default image renderer uses HTML `<img>`.
Supply a host link component, locale control and Scene registry as appropriate.
This **does not** mean MUI components are native React Native widgets; WebView
can still host the React DOM app.

## Localization

`shared/ui-kit/scripts/generate-locales.mjs` owns generated
`public/data/ui-kit/<locale>.json` files for each standalone textbook.
The canonical language set is `DEFAULT_SUPPORTED_LANGUAGES`.
Authoring dictionaries belong to `shared/ui-kit/data/components/*`.
Use `--audit` to enumerate missing dictionaries and `--strict` to reject
incomplete translations before publishing. Lesson, NavbarPreferences, Flashcard
and Checkpoint now have complete authored locale coverage; **other legacy UI
components still require translations**, so the default generator currently
reports outstanding fallback debt. Do not confuse this with completion.
Follow Studio internationalization rules (no fake translations or silent
fallbacks for required final product strings).

## Validation

Build `@svitlo/contracts` and `@svitlo/engine` before compiling the UI Kit
and adapter; run their tests, Playground typecheck, production build and
Playwright Lesson tests. The stacked hardening work plan is at
`studio/docs/architecture/lesson-ui-kit-adapter-hardening-plan.md`.
