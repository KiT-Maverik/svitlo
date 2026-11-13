# Generator Requirements — Build API publications

## Boundary

- Authoring `*.data.ts` exports stateless Engine configurators. The application
  never imports authoring data or invokes `build.props()` at runtime.
- An Engine-owned build-time CLI discovers configurators and invokes their
  `build.props({ languages })`. Pure Engine serializers consume **completed**
  `{ base, locale }` publications; do not duplicate validation, reorder
  children, or reconstruct authoring patches in a serializer.
- Runtime assemblers accept already-loaded published files and output Props
  validated through the owning `*_Props_Schema`. Host adapters own I/O.
- Generate a base file and one _direct Props-shaped_ file per nonempty locale.
  Do not add extra `locale` wrappers or synthesize invariant-only files.
  Do not silently fall back to another language.

## Output and delivery

All authored textbook JSON publications are generated in a Git-ignored
directory belonging to that textbook, separate from its hand-authored assets:

```text
content/<textbook>/generated/
  skills/{base,<language>}.json
  lessons/<last-uuid-digit>/<uuid>/{base,<language>}.json
  courses/<course-uuid>/{base,<language>}.json
```

`scripts/textbook-tooling/build.mjs` invokes the Engine-owned generator CLIs and stages
their output as `dist/static/data/{skills,lessons,courses}/...`, alongside
separately compiled Scenes and textbook-owned static media. It records the
actual output files in `dist/manifest.json`.

`scripts/textbook-tooling/publish.mjs` consumes only the compiled manifest,
copies static resources to a host's `public/data/` and cleans files owned by
the textbook's previous manifest. It never runs generators. Other hosts
(Electron/Capacitor) may use the same packaged resources; runtime assemblers
stay host-independent. Scenes are bundled to JS chunks, not embedded in JSON.

## Skills

- Exactly one full Domain tree is stored in `base.json`; each locale file
  contains only translated Props-shaped tree fragments, keyed by Domain slug.
- `SkillDomain.build.props()` and its child configurators own the array order,
  identities, localization, and validation.
- `prepareSkillPublication` composes independent Domain results; the
  `publishSkillTree` Engine serializer writes already-built data unchanged.
- The Web loader reads the selected locale if it exists; invariant-only
  publications may have no locale file.

## Lessons

- UUID is immutable. The output bucket is the final hexadecimal digit of the
  canonical lowercase Lesson UUID. Reject duplicate UUIDs across textbook
  workspaces, including `content/languages/*` and editorial draft locations.
- `defineLesson.build.props()` resolves authored collections into Props-shaped
  arrays. The generator serializes the result without interpreting nested
  Section, ContentBlock, Flashcard, or Question entities.
- The standalone Lesson assembler resolves resource base, selected locale,
  optional override base, and selected override locale in that order.

## Courses

- A Course is one publication context: Course/Module/Chapter metadata is
  preserved, while each Lesson is a compact `{ type: 'lesson', id, overrides? }`
  reference. Course-owned overrides are sparse and never copied into the
  standalone Lesson publication.
- Published Course/Module/Chapter hierarchy uses `content: { items, order }`,
  keyed by immutable child slug. Only changed nested keys are emitted in locale
  files; translated siblings are not repeated. The separate order array
  controls display order.
- The Course-context Lesson assembler locates a Lesson in the base tree,
  follows its slug path into sparse Course locale JSON, then applies Course
  overrides _after_ the standalone Lesson's locale.
- **Published ordinary Props arrays still replace atomically** during deep
  merge. Never merge them by index or concatenate. The Course hierarchy is
  keyed specifically to avoid treating all children as one atomic array.

## Quality gates

- Generation must be deterministic and check mode must not write.
- Write via staged atomic replacement; detect and clean stale owned files;
  preserve unrelated textbook and host assets. Reject symlink paths and unsafe
  output roots.
- Validate source and published entity identities, duplicate keys/IDs,
  unsupported language scopes, missing translations, and unsafe JSON.
- Test full generator → packed file → host loader → assembler flow, not just
  individual serializer mocks. Include locale isolation, Course patch precedence,
  deleted child regression, atomic replacement of other Props arrays, and
  malformed or absent optional locale files.
