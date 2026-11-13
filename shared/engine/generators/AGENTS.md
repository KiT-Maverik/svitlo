# Generator architecture

**Status:** Skills, Lesson and Course publication tooling lives under Engine `generators/{skills,lessons,courses}/`. No universal serializer is implied. The general rules below remain the target contract. Follow the root `AGENTS.md`, applicable Studio guidance, and the authoring contract in [`../configurators/AGENTS.md`](../configurators/AGENTS.md).

## Responsibility

- Pure serializer functions run at **build/publish time**, accept completed publication results (`{ base, locale }`) and destination information, and serialize them. They never invoke configurators. Engine-owned Node CLI entrypoints may discover authored content and call `build.props()` before delegating to the serializer; keep these responsibilities distinct.
- Configurators own entity validation, override resolution, nested composition, disabled-item filtering, ordering, and Props preparation. Generators **must not interpret Config/Overrides, filter or sort children, recreate schemas, or build Props**.
- Treat each independently prepared override context as its own publication artifact. Never mutate supplied payloads or combine unrelated publication contexts merely because they refer to the same original resource.
- Define paths, file naming, ownership and cleanup rules with the actual resource/index contracts before implementing a generator. Do not invent a universal directory layout from this document alone.

## File publication contract

- A completed publication result has `{ base, locale }`. Write `base` as its publication payload. For `locale`, each language key already contains the **direct Props-shaped JSON body** of that language's file, including any required nested `locale` fields. Never unwrap or add a second `locale` property during generation.
- A resource's `base` is complete for the invariant fields; an override's `base` contains **only overridden fields**. Preserve the distinction when generating file paths and names.
- `locale: undefined` means there is no translated locale file to write for that result. Do not serialize an `undefined` property into JSON or create empty translation files by default. In particular, if a structural override replaces a localized collection with only invariant children, write the replacement array in the override `base` and **do not synthesize locale files**. The Assembler must apply `override.base` after the selected resource locale; see the authoritative precedence and deletion regression in [`../assemblers/AGENTS.md`](../assemblers/AGENTS.md).
- Preserve completed data as supplied. Do not fill missing override fields with original resource values, and do not interpret authoring-only collection markers or flags.
- Keep output deterministic, JSON-compatible, and reproducible from Git-authored inputs. Report publication failures with enough resource and file context to diagnose them.

## Boundary and verification

- This layer may use build-time filesystem APIs; it must not become a runtime import or require Next.js, Electron, or Capacitor to generate content when serving a request.
- The separate [runtime assemblers](../assemblers/AGENTS.md) consume the **published data**, not configurators. Their merge behavior is not a generator responsibility.
- When this layer is implemented, test exact output contents and paths, multiple independent publication contexts, locales, omissions, deterministic reruns, and stale-file handling according to the chosen publication layout. These are future verification requirements, not claims of existing tests.

## Engine-owned CLI entrypoints

- Lesson/Course build-time Node CLIs live beside their serializers and tests under `generators/`.
- `scripts/textbook-tooling/build.mjs` invokes Engine CLIs directly and owns textbook-level staging and manifest creation. Do not keep duplicate per-resource wrappers under root `scripts/generators/`.
- CLIs are build-only and must never appear in `runtime.ts` exports or browser bundles.
