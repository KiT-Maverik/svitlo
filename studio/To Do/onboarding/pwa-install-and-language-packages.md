# Optional PWA Install & Selected-Language Download

**Status:** Optional Web/PWA feature proposal — not implemented or required by this document.
**Area:** onboarding

## Goal

If an installable Web/PWA experience is offered, provide an install/download step after onboarding for an offline-capable textbook or platform. **PWA installation is optional**; the main cross-platform offline goal may be delivered through the planned Capacitor/Electron applications. Language-package completeness applies to whichever offline host is selected.

## Intended scope

- Prepare download of only the selected primary/secondary locale packs, plus a small clearly identified English recovery/default language pack.
- Do not download the full locale catalog by default.
- Make chosen educational resources complete for both selected languages, with accurate package size and offline-ready indicators.
- English install/emergency pack is NOT permission to place English text as fabricated translations for mandatory authoring locales.
- Permit later language-pack additions, switching and removal.

## Open decisions and constraints

Decide exact app install flow, package manifest, update strategy, whether English recovery pack can be opted out, quota/storage handling.

**Implementation note:** This is a product-backlog specification, not approval to edit runtime contracts, add dependencies or claim the feature exists.

**Architectural references:** [Cross-Platform Lesson Runtime](../../docs/architecture/cross-platform-lesson-runtime.md); [offline-first-and-device-compatibility.md](../../docs/architecture/offline-first-and-device-compatibility.md); [internationalization-and-accessibility.md](../../docs/architecture/internationalization-and-accessibility.md)
