# Svitlo Mobile

A single **React DOM + TypeScript + Capacitor 7** host for Android and iOS, powered by the existing UI Kit Lesson, Engine JSON response assembly, and textbook-owned Scene Registry. The first build includes the Playground textbook.

## Development and validation

Run these commands at the repository root after npm ci:

    npm run dev --workspace @svitlo/mobile
    SVITLO_TEXTBOOK=playground npm run build --workspace @svitlo/mobile
    npm run verify:bundle --workspace @svitlo/mobile
    npm run typecheck --workspace @svitlo/mobile
    npm run lint --workspace @svitlo/mobile
    npm run test --workspace @svitlo/mobile
    npm run test:e2e --workspace @svitlo/mobile

Android and iOS source projects are **already committed**. To update their bundled WebView assets:

    npm run sync --workspace @svitlo/mobile
    npm run android --workspace @svitlo/mobile
    npm run ios --workspace @svitlo/mobile

Android launch/build requires Android Studio, Android SDK and a configured emulator/device. iOS requires macOS with Xcode and an iOS Simulator/device. For a command-line native smoke build after sync, use ./gradlew assembleDebug from apps/mobile/android or xcodebuild with the App workspace/scheme on a Mac. No certificates or signing credentials are committed.

## Architecture

SVITLO_TEXTBOOK selects a declared catalog entry in textbooks.json before build. Mobile preparation invokes existing lesson and UI Kit localization generators and publishes JSON into **apps/mobile/public/data**. The canonical UI Kit flags are copied into Mobile's own public resources. Authored data remains under content/<textbook>/data, never imported into the runtime; **apps/web/public is not touched**.

esbuild packages the static textbook Scene Registry and its dynamic JS chunks into dist along with flags, localized lesson/question JSON and static assets. Capacitor webDir is dist, no remote server.url, and no PWA Service Worker. Native WebViews load content locally. Direct routes are / and /<language>/lesson/<uuid>, with host-level locale, back-button and local lesson step state. Shared UI Kit components retain all section, question, feedback and theme behavior.

The browser/asset/build/TypeScript checks are automated; native runtime and screen-reader usability on physical devices still require manual QA. Accounts, subscriptions, paid content licensing, remote download and sync remain out of scope.
