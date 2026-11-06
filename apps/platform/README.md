# @svitlo/platform — Світло Academy

Standalone Next.js 16 App Router public website with React 19 and TypeScript. The platform is a presentation and discovery site, not a runtime container for textbook source code.

## Routes

- / — Academy / NextGen Learning landing page
- /team — team portraits and role chips
- /hall-of-fame — justified country-flag + name pairs (demonstration data)
- /scholarships — six editorial concepts from studio/To Do/growth/scholarships-ukraine.md
- /sponsors — interactive tabs for patrons, organizations and media
- /materials — textbook catalog with separate-app deployment links

## Running

From the repository root, use npm ci, followed by npm run dev:platform, npm run build:platform, npm run typecheck:platform and npm run lint --workspace @svitlo/platform.

The Playwright smoke suite (npm run test:e2e:platform) uses port 3111 and requires a built production app. Navigation, scholarship previews and informational pages need no external service.

## Deployment URLs and placeholders

Only Mathematics has a configurable external URL, via NEXT_PUBLIC_MATH_APP_URL in .env.example. The catalog never links to invented textbook URLs. Other textbook cards are clearly labeled as works in progress.

Team photos are temporary Unsplash images served from the external image host and **do not depict the named team members**. Replace them with consented portraits before launch. The Hall of Fame contains invented demonstration names; it must not be presented as a list of real donors. The scholarship proposals are **not launched programs**; no application form, entitlement rules, donor roster or funding claim is implemented.

Keep this package independent from content/* source and from runtime configuration objects in other packages.
