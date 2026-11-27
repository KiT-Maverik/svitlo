# ContentBlock composition categories and allowed children

**Product decision:** Primitive and Composite categories constrain which configurator children each parent may author. The ongoing Config → Data → Props integration replaces ordered collection wrappers with direct child placement keys and `children`, but preserves public `define*` names, IDs, type discriminants and locale ownership. Release readiness still requires combined-head validation.

## Canonical categories

- **Primitive (9):** `text`, `markdown`, `code`, `image`, `audio`, `video`, `youtube`, `subtitles`, `scene`. _Primitive means leaf in the authored Configurator tree, not static or visually simple._ A Scene remains a Primitive despite executable interactive behavior.
- **Composite (2):** `carousel`, `checkpoint`. These own an authored child tree and are not accepted within Composite parents.
- **Not renderable ContentBlocks:** `checkpointItem`, `checkpointAnswer`. They are structural children of Checkpoint and CheckpointItem respectively; they are not added to the 11 `contentBlockTypes`.

The exact canonical constants are `primitiveContentBlockTypes`, `compositeContentBlockTypes` and their combined `contentBlockTypes`. TypeScript exposes Primitive/Composite `Configurator`, `Config`, `Data`, and Data-base unions derived from the concrete types. These categories are not additional authored or serialized `type` values and do not introduce a `category` property.

## Parent-owned allowed-child matrix

| Owning parent / role                                                                        | Permitted authored children                         | Constraints                                                                                                        |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Ordinary Content/Practice/CodingTask/LearningFlow Section content                           | Primitive + Composite                               | Preserve each Section's narrower rules and root ordered `children` plus direct keys                                          |
| Quiz and Flashcards **Section-owned screen** content                                        | Primitive + Composite                               | Not equivalent to Question/Flashcard Bank-owned content; preserve screen and completion rules                      |
| Carousel `slides`                                                                           | Image or Scene                                      | Only two slide kinds, exact order and locale semantics; never a Composite slide                                    |
| Checkpoint `content`                                                                        | CheckpointItem                                      | Structural, not renderable ContentBlock; never a directly nested Checkpoint                                        |
| CheckpointItem `question`                                                                   | One non-disableable Text                            | Its `answer` is one identified CheckpointAnswer                                                                    |
| CheckpointAnswer `content`                                                                  | Primitive                                           | No Carousel or Checkpoint; require valid enabled, nonempty ordered children                                        |
| Question `question`, `hint`, `explanation`                                                  | Primitive                                           | Across all nine Question variants; retain nonempty question prompt                                                 |
| Question options, ordered answers, match pair `left/right`, fill-block slot `correctAnswer` | Primitive                                           | Preserve each Question kind's stricter answer/slot semantics; text-only fill slots are not arbitrary ContentBlocks |
| Flashcard Side `front`, `back`, `hint`                                                      | Primitive                                           | Front/back required; hint optional; preserve sided roles and retrieval semantics                                   |
| Quest Stage/Task                                                                            | Role-specific Video, Audio, Image, Subtitles, Scene | Fixed Quest contract, **not** a generic ContentBlock collection; Quest runtime remains build-only                  |

**Scene policy:** existing Configurator, Question and Flashcard contracts permit Scene as a Primitive. Whether Scene should have an additional contextual prohibition in Question/Flashcard Banks is **an owner decision, not implemented by this work**. Do not silently narrow it without approval.

## Enforcement and authoring migration

Parent Configurators own allowed kinds, IDs/slugs, key/`children` integrity, disabled children and added direct placement keys; children validate their own semantic content. Enforce both raw and overridden effective published values, including unsafe JavaScript casts and Draft mode. Typed inert `draft.ts` Lesson/Question/Flashcard sources use the corresponding final Stage Zod and trusted materializers; typechecking alone is not a security or publication gate.

For existing authored material using **Checkpoint → Answer → Carousel → Scene**, preserve the Scene by authoring it directly in the Answer, or preserve a Carousel as a sibling at an allowed Section position if its slide sequencing is essential. Both options change pedagogy and must be reviewed before editing actual course content. Similarly, replace composite Question/Flashcard Bank children with approved Primitive representations rather than silently deleting them. Preserve UUIDs, ordering, localization and evidence wherever the semantics allow.

The source implementations are grouped under `shared/engine/configurators/contentBlocks/primitive/` and `.../composite/`. Legacy internal `define*/` deep paths have been removed; use canonical primitive/composite locations or stable `@svitlo/engine/build` and `@svitlo/engine/runtime` entrypoints. Generated textbook source folder layout is **unchanged**. The UI Kit still dispatches by the existing runtime `type` and never needs a category field.
