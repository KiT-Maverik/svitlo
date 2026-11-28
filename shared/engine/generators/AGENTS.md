# Generator architecture

**Status:** Skills, Lesson and Course publication modules are in `generators/{skills,lessons,courses}/`; Lesson/Course build-time CLIs stay in named `scripts/{generateLessonProps,generateCourseProps}/` directories with their tests. No universal serializer is implied. The general rules below remain the target contract. Follow the root `AGENTS.md`, applicable Studio guidance, and the authoring contract in [`../configurators/AGENTS.md`](../configurators/AGENTS.md).

## Responsibility

The following completed-Data rules apply to `generators/{skills,lessons,courses}` publication generators, **not** to entity-owned authored TypeScript source materializers in `generators/materializers/`. The latter accept final-stage Zod-validated **plain values** from a trusted static Draft Reader (the #857 target), use actual Configurators only from separately trusted dependencies in their build-only implementation, and hand off a sealed immutable manifest to a non-executing Git publisher. The existing isolated-worker path may remain until Agent C proves source-dependency trust. See [declarative typed materialization](../../studio/docs/architecture/typed-production-materialization.md).

- Completed-Data generators run at **build/publish time**, accept completed publication results (`{ base, locale }`) and destination information, and serialize those results. They do not accept configurators or invoke `build`/`assemble` methods.
- Configurators own entity validation, override resolution, nested composition, disabled-item filtering, ordering, and Data preparation. Generators **must not interpret Config/Overrides, filter or sort children, recreate schemas, or build Data**.
- Treat each independently prepared override context as its own publication artifact. Never mutate supplied payloads or combine unrelated publication contexts merely because they refer to the same original resource.
- Define paths, file naming, ownership and cleanup rules with the actual resource/index contracts before implementing a generator. Do not invent a universal directory layout from this document alone.

## File publication contract

- A completed publication result has `{ base, locale }`. Write `base` as its publication payload. For `locale`, each language key already contains the **direct Data-shaped JSON body** of that language's file, including any required nested `locale` fields. Never unwrap or add a second `locale` property during generation.
- A resource's `base` is complete for the invariant fields; an override's `base` contains **only overridden fields**. Preserve the distinction when generating file paths and names.
- `locale: undefined` means there is no translated locale file to write for that result. Do not serialize an `undefined` property into JSON or create empty translation files by default. In particular, if a structural override changes a localized ordered child collection with only invariant children, write the complete replacement `children` array in the override `base` and **do not synthesize locale files**. The Assembler must apply `override.base` after the selected resource locale; see the authoritative precedence and deletion regression in [`../assemblers/AGENTS.md`](../assemblers/AGENTS.md).
- Preserve completed data as supplied. Do not fill missing override fields with original resource values, and do not interpret authoring-only collection markers or flags.
- Keep output deterministic, JSON-compatible, and reproducible from Git-authored inputs. Report publication failures with enough resource and file context to diagnose them.

## Boundary and verification

- This layer may use build-time filesystem APIs; it must not become a runtime import or require Next.js, Electron, or Capacitor to generate content when serving a request.
- The separate [runtime assemblers](../assemblers/AGENTS.md) consume the **published data**, not configurators. Their merge behavior is not a generator responsibility.
- When this layer is implemented, test exact output contents and paths, multiple independent publication contexts, locales, omissions, deterministic reruns, and stale-file handling according to the chosen publication layout. These are future verification requirements, not claims of existing tests.

## Build-time ownership

- The textbook build in `scripts/textbook-tooling/buildTextbook/build.mjs` invokes the Engine-owned named CLIs directly; do not reintroduce root-level per-resource wrappers.
- The CLIs discover authored configurators and call `build.data()`, then delegate to the publication code. They are not runtime imports.
- The existing compact Course publisher also performs Course-context projection using the Course Build API; this refactor preserves that established behavior rather than changing the Course contract.
- The runtime `@svitlo/engine/runtime` entrypoint must remain free of build-only generators, Node APIs and authored configurators.
