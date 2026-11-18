# EducationStandard — educational standard definition

**Status:** Engine authoring and publication contract. A standard definition is not evidence that any Course complies with the standard. Course references and alignment review are separate, future integration work.

An **EducationStandard** is a standalone, reusable and immutable educational reference, identified by a persistent UUID and a lower-camel-case semantic slug. The same standard can later be referenced by multiple Courses without embedding duplicate definitions. An official `name` is retained **verbatim in its original language and script**; it is not a locale dictionary. `params.nameLanguage` can identify its language for accessible rendering (for example, an HTML `lang` attribute).

## Authored contract

`defineEducationStandard` belongs to `@svitlo/engine/build`. The Config requires:

- `id` (UUID), `slug` (camelCase), and one invariant, nonblank `name`.
- `description.methodological`: a single substantive **English** explanation of scope, intended competencies, applicability, interpretation and exclusions. English correctness and completeness require editorial review.
- `description.frontend`: brief, meaning-preserving human-readable text in **every** canonical `allLanguageCodes` language. This dictionary is mandatory even when publishing only one language. Missing translations, placeholders and English fallback are not acceptable.

Optional `params` include unique uppercase ISO 3166-1 alpha-2 `countries`, an `age` range (integer 0–125), `grade` range (integer 0–40), original `version`, HTTP(S) `sourceUrl`, and a BCP 47 `nameLanguage` tag. Inclusive ranges require `min <= max`. Grade numbers have **jurisdiction-specific meaning**; the numerical bound is validation, not a globally normalized grade model. Omitted countries do not imply worldwide approval. Version and links are provenance metadata, not certification evidence.

No requirements hierarchy, children, localized official names, translated methodology, disable flag, mutable override or per-standard supported-language subset exists in this contract.

## Publication and ownership

The only public method is `standard.build.props({ languages })`. Requested languages must form an explicit nonempty, unique subset of the canonical language roster. Validation of the **full authored Config** occurs before selecting any translations. The output is JSON-compatible and independently owned:

```ts
{
  base: {
    id: '...',
    slug: 'sampleStandard',
    name: 'Original official name',
    description: { methodological: 'An English methodological explanation.' },
    // params, if supplied
  },
  locale: {
    uk: { description: { frontend: 'Короткий опис стандарту.' } },
  },
}
```

`base` is invariant across publication languages; each selected `locale[lang]` contains only the Props-shaped frontend-description fragment. Merging `base` with one requested locale must satisfy `educationStandard_Props_Schema`. Consumers must retain original-name `lang` metadata; no UI renderer or runtime registry is introduced here.

Build exports the `defineEducationStandard` factory. Runtime exports only the Config/Props schemas and types. There is no separate package of default locales or automatic English fallback. The approved global authored catalog lives in `shared/ui-kit/data/definitions/educationStandards/`, with original-language source records under `data/<country>/*.data.ts`. UI Kit's existing locale generator publishes `public/data/uiKit/educationStandards/base.json` and `<language>.json` alongside UI component and Assessment Method dictionaries. Only published JSON is consumed at runtime, never authored configurators. The standards publisher is a UI Kit build-time generator, not a separate `@svitlo/education-standards` workspace or a runtime registry.

## Relationship to Courses

A Course may **later** reference one or more reviewed EducationStandard UUIDs and document alignment evidence. Referencing an EducationStandard does **not** itself establish compliance, accreditation or coverage. The present change does not modify `Course.params`, Course YAML, lesson runtime, resource registries or curriculum generation.

Related: [Course](./course.md), [Skill](./skill.md), [Internationalization & Inclusive Access](../architecture/internationalization-and-accessibility.md).
