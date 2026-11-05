# Mathematics frontend-description localization — migration checkpoints

Branch: `feat/math-localized-skill-fe-descriptions`  
Base: `main` at `7212824cb3204e5482c80a463d4ac120accb7725` (2026-10-30).  
Locale roster: **28** `LanguageCode` values from `shared/contracts/src/types/languages.ts`, including `be` / `be-tarask`. Do not assume this count in code; re-check the registry before each stage.

## Domains (code + staging Markdown inventory)

- [x] Counting — 15 Skills, 5 Groups (**completed**)
- [x] Natural Numbers — 27 Skills, 5 Groups (**completed**)
- [x] Fractions — 19 Skills, 4 Groups (**completed**)
- [ ] Arithmetic — 79 Skills, 5 Groups
- [ ] Algebra — 17 Skills, 5 Groups
- [x] Geometry — 35 Skills, 10 Groups (**completed**)
- [ ] Measurement — 21 Skills, 5 Groups
- [ ] Time — 13 Skills, 3 Groups
- [ ] Money — 6 Skills, 2 Groups
- [ ] Data — 15 Skills, 3 Groups
- [ ] Probability — 4 Skills, 2 Groups
- [ ] Problem Solving — 23 Skills, 7 Groups
- [ ] Reasoning — 10 Skills, 4 Groups

**Total:** 284 Skills, 60 Groups, 13 Domains.

## Parallel agent ownership (agreed 2026-10-30)

Each Domain has **exactly one owner**. Ownership is allocated to balance **Skill counts**, so the blocks are not strictly contiguous. The Domain inventory and Skill counts are authoritative only for this checkpoint; recheck repository data and current language registry before future edits.

| Agent                                                           | Domains in processing order                                                                                                       | Skills | Dedicated scope                                     |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | -----: | --------------------------------------------------- |
| **Agent 1** (this branch, Draft PR #97)                         | #1 Counting (15), #2 Natural Numbers (27), #3 Fractions (19), #6 Geometry (35)                                                    | **96** | First-to-last through #3, then #6                   |
| **Agent 2** (separate branch and Draft PR)                      | #4 Arithmetic (79), #5 Algebra (17)                                                                                               | **96** | Split Arithmetic into Groups for manageable commits |
| **Agent 3** (existing other chat, separate branch and Draft PR) | #13 Reasoning (10), #12 Problem Solving (23), #11 Probability (4), #10 Data (15), #9 Money (6), #8 Time (13), #7 Measurement (21) | **92** | Process in reverse order, starting at #13           |

**Global total:** 284 Skills. Agent 1 already completed #1 Counting; Agent 1's next Domain is #2 Natural Numbers. Never switch into another Agent's assigned Domain without an explicit new allocation.

**Cross-branch rules:** Each agent edits only its owned Domain subtrees, keeps a dedicated branch and Draft PR with per-Domain commit checkpoints, and preserves source taxonomy, UUIDs, names and methodological descriptions. Avoid concurrent modifications to shared migration/checklist files across branches; use each agent's PR description for individual progress. Any required shared contracts/builders/workflow changes, especially making `description.fe` mandatory, are deferred to a **separate integration stage** after all affected Skills, Groups and Domains are filled and branches are reconciled. No agent merges without the editor's approval.

## Completed stage — Counting

- [x] Verify each English frontend description against the existing English methodological description.
- [x] Localize 15 Skill descriptions across all supported languages (420 values at 28 languages).
- [x] Localize five Group descriptions and the Counting Domain description (168 values at 28 languages).
- [x] Confirm all language keys are present and nonblank; verify the distinct mathematical competencies.
- [x] Confirm existing IDs, name dictionaries, taxonomy membership and methodological descriptions are unchanged.
- [x] Commit the finished stage and record its revision SHA in this checklist.

## Final stage — shared-contract migration (not yet authorized to enact)

- [ ] Re-inventory all affected Skills, Groups, Domains and their builders/consumers.
- [ ] Ensure complete frontend dictionaries for every affected entity.
- [ ] Require `description.fe` in shared contracts only when coverage is complete.
- [ ] Reject missing/blank/partial dictionaries without fallbacks, update workflows/tests, run typechecks/focused tests.

**Authoring rule:** the English frontend text is reviewed before all translations; `description.methodological` stays independent and English. `docs/skills/taxonomy.md` is staging material and must not be deleted. No grade ceilings, added competencies or editorial restructures. Outstanding issues and validation limits must be reported without claiming editorial approval.

## Counting: English copy gate (methodologist review, before translation)

These descriptions are user-facing prose checked against the existing English `description.methodological`; they are **not** replacements for that canonical field. Existing taxonomy boundaries and IDs remain unchanged. This checklist records the English baseline for semantic comparison by translators.

| Entity                       | Reviewed English `description.fe.en`                                                                                                                                    |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Counting (Domain)            | Learn how numbers tell how many things there are, where things are in order, and how to count forward, backward, or in equal steps.                                     |
| Cardinality (Group)          | Find how many objects are in a collection, including when it is empty. Compare collections by their number of objects, not by size or arrangement.                      |
| basicCardinality             | Count every object once and use the last number you say to tell how many there are. The total stays the same if you rearrange them or count in a different order.       |
| compareSets                  | Find which collection has more, fewer, or the same number of objects by matching or counting. The objects' size and appearance do not determine the total.              |
| groupAndCount                | Find a total by grouping objects into tens or hundreds, then counting any objects left outside the full groups.                                                         |
| zero                         | Zero means there are no objects in a collection. An empty container still exists, and zero is a number.                                                                 |
| Number sequences (Group)     | Move through consecutive numbers from different starting points, forward or backward. Find which number comes next or is missing, even across tens or hundreds.         |
| oneToOne                     | Give each object exactly one counting word, without skipping or counting any twice. Counting order does not change the total.                                           |
| forward20                    | Start from any number within 20 and find the next number by adding one, even when crossing ten.                                                                         |
| backward20                   | Start from any number within 20 and count backward one at a time, including across ten.                                                                                 |
| forward100                   | Start anywhere within 100 and move to the next or previous number by one, even across a multiple of ten.                                                                |
| forward1000                  | Find the next or missing consecutive number within 1,000, including when crossing tens or hundreds. The step is always one.                                             |
| Skip counting (Group)        | Count equal groups by adding the same amount each time. Use steps of 2, 5, 10, or 100 instead of counting each object separately.                                       |
| countBy2                     | Add two at each step to count in pairs. Distinguish the number of pairs from the total number of objects.                                                               |
| countBy5                     | Add five at each step to count equal groups of five and find their total.                                                                                               |
| countBy10                    | Add ten at each step while the ones stay the same. Crossing a hundred means regrouping ten tens into one hundred.                                                       |
| countBy100                   | Add one hundred at each step while the tens and ones stay the same.                                                                                                     |
| Ordinal counting (Group)     | Tell an object's position in a chosen order, such as first or fourth. Position is different from the total number of objects.                                           |
| basicOrdinal                 | Find an object's position in an ordered sequence and its direction, such as third from the left. Changing the order can change the position without changing the total. |
| Even and odd numbers (Group) | Tell whether a number is even or odd by making pairs. An even amount pairs up completely; an odd amount leaves one unpaired.                                            |
| evenOdd                      | Make pairs to check whether a number is even or odd. An even number leaves none unpaired; an odd number leaves one.                                                     |

**Editorial note:** The names and methodological descriptions above are existing Code authority. This stage modifies `fe` only and adds no new mathematical competency.

## Counting completion checkpoint (2026-10-30)

- **Domain coverage:** 15/15 Skills, 5/5 Groups, 1/1 Domain.
- **Language coverage:** 28/28 language codes in each of 21 dictionaries; 420 Skill translations + 140 Group translations + 28 Domain translations = **588 nonempty values**.
- **Sequence of review:** all 21 English frontend drafts recorded above before localization; translations added in separate small Group commits. A separate proofreading commit corrected identified wording issues.
- **Diff validation:** in all 21 entity files the only removed line is the prior inline `description`; its English `methodological` value appears unchanged in the expanded block. UUIDs, IDs, names, memberships, exports and staging Markdown were not edited.
- **Automated static validation through GitHub file patches:** compared 28 `fe` keys in each changed entity with the actual current `DEFAULT_SUPPORTED_LANGUAGES` registry; checked that every value is nonempty, no language key is duplicated/missing, and all existing methodological values are byte-for-byte unchanged. **Result: 21/21 pass.**
- **Localized language checks:** RTL text authored in Arabic, Urdu and Hebrew; `be` text uses Taraškievica. English copy and linguistic issues found during revision were corrected without altering Skill meanings. These are authoring checks, not an independent native-speaker certification.
- **First Domain checkpoint revision:** `7b05f08df69b84b62110f8b81160e8df4caaa240` (through proofreading), followed by this documentation checkpoint.
- **Execution limit:** a local working tree and runnable dependency installation are not available through the GitHub connector, so local TypeScript typechecks or npm focused tests **were not run**. Do not interpret static file checks as a TypeScript compile or a passing CI result. Read GitHub Actions status from the PR separately.
- **Next:** Natural Numbers — 27 Skills, 5 Groups; check the then-current language registry before authoring. Do not change the shared optional `fe` contract yet.

## Natural Numbers — English authoring gate (2026-10-30)

All 33 entity descriptions below are newly drafted learner-facing English copy. They were checked against the individual English methodological descriptions and remain distinct from canonical authoring text. Preserve these reference drafts as a checkpoint while translating one Group at a time; do not change taxonomy identities or scope.

| Entity file (under `numeration/`)                   | English `description.fe.en`                                                                                                                       |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `numeration.data.ts`                                | See how natural numbers represent quantities, how each digit's position changes its value, and how to compare, place, and estimate numbers.       |
| `notation/notation.data.ts`                         | Connect spoken numbers, written digits, and the quantities they represent, including zero and numbers with several digits.                        |
| `notation/skills/digits09.data.ts`                  | A digit is a written symbol from 0 to 9; a number is the value it represents. One number can be written using several digits.                     |
| `notation/skills/readWrite20.data.ts`               | Connect numbers from 0 to 20 with their spoken names, written forms, and matching quantities. Zero represents none.                               |
| `notation/skills/readWrite100.data.ts`              | Read and write numbers up to 100, using tens and ones to understand what each digit means.                                                        |
| `notation/skills/readWrite1000.data.ts`             | Read and write three-digit numbers using hundreds, tens, and ones. A zero can mark an empty place without changing the positions of other digits. |
| `placeValue/placeValue.data.ts`                     | Understand how digits gain value from their place and how ones, tens, and hundreds can be grouped, exchanged, or split without changing a number. |
| `placeValue/skills/digitPlaceValue.data.ts`         | A digit's position changes its value: the two 2s in 232 mean 200 and 2.                                                                           |
| `placeValue/skills/expandedForm.data.ts`            | Break a number into a sum of its place values and put them back together. For example, 243 = 200 + 40 + 3.                                        |
| `placeValue/skills/flexiblePartition.data.ts`       | Split the same number into different sums without changing its value: 146 can be 100 + 40 + 6 or 130 + 16.                                        |
| `placeValue/skills/hundredsTensOnes.data.ts`        | See how the digits in a three-digit number show hundreds, tens, and ones, including places containing zero.                                       |
| `placeValue/skills/makeHundred.data.ts`             | Ten tens make one hundred, just as one hundred ones do. They are different groupings of the same amount.                                          |
| `placeValue/skills/makeTen.data.ts`                 | Group ten ones into a ten, or split a ten back into ten ones. The amount stays the same.                                                          |
| `placeValue/skills/multipleRepresentations.data.ts` | Recognize the same number when shown as digits, counting blocks, a point on a number line, or a collection of objects.                            |
| `placeValue/skills/regroupPlaceValues.data.ts`      | Exchange one hundred for ten tens, or one ten for ten ones, and reverse the exchange without changing the total.                                  |
| `placeValue/skills/tensOnes.data.ts`                | Build a two-digit number from tens and ones, or split it into them. For example, 47 = 40 + 7.                                                     |
| `placeValue/skills/totalTensInNumber.data.ts`       | Find all the complete tens or hundreds inside a number, not just the digit in that place. For example, 348 contains 34 full tens.                 |
| `placeValue/skills/zeroPlaceholder.data.ts`         | A zero can keep an empty place in a number: in 305, it means there are no tens, so 305 is not 35.                                                 |
| `comparison/comparison.data.ts`                     | Compare quantities and numbers to tell which is greater, smaller, or equal, and put numbers in order.                                             |
| `comparison/skills/moreLessEqual.data.ts`           | Match or count objects to tell which collection has more, fewer, or the same number. Larger objects do not always mean more objects.              |
| `comparison/skills/comparisonSymbols.data.ts`       | Use &lt;, >, and = to show which number is smaller, larger, or equal. Switching two different numbers reverses the inequality sign.               |
| `comparison/skills/order20.data.ts`                 | Arrange numbers from 0 to 20 from smaller to larger or the other way around. Equal numbers can appear next to each other.                         |
| `comparison/skills/order100.data.ts`                | Compare two-digit numbers by looking at tens first, then ones when the tens match, and put them in order.                                         |
| `comparison/skills/order1000.data.ts`               | Compare three-digit numbers by hundreds first, then tens, then ones. The first different digit decides which is greater.                          |
| `numberLine/numberLine.data.ts`                     | Place numbers on a line with even spacing; use their positions to see which comes first and how far apart they are.                               |
| `numberLine/skills/beforeAfterBetween.data.ts`      | Find the number immediately before or after another number, or numbers that lie between two given numbers.                                        |
| `numberLine/skills/distanceOnLine.data.ts`          | Count unit intervals between integer points on a number line. The distance is the same in either direction.                                       |
| `numberLine/skills/numberLine20.data.ts`            | Find numbers up to 20 on an evenly spaced number line. Each move of one unit covers the same distance.                                            |
| `numberLine/skills/numberLine1000.data.ts`          | Find numbers up to 1,000 on a number line using its starting point and scale. Equal number jumps take equal distances.                            |
| `estimation/estimation.data.ts`                     | Make sensible approximations of quantities or values and round numbers to a useful level of precision.                                            |
| `estimation/skills/estimateQuantity.data.ts`        | Estimate how many objects there are by looking at groups or a small part, then check by counting them.                                            |
| `estimation/skills/roundToTen.data.ts`              | Find the nearest multiple of ten by comparing distances to the tens on either side. Exactly halfway requires a rounding rule.                     |
| `estimation/skills/roundToHundred.data.ts`          | Find the nearest multiple of one hundred and see how much the rounded value differs from the exact one. Halfway needs a rule.                     |

**Scope:** 4 Notation, 11 Place Value, 5 Comparison, 4 Number Line, 3 Estimation Skills; plus five Groups and one Domain. Do not assume a rounding tie-breaking convention; preserve the methodological distinction between exact and approximate values.

## Natural Numbers completion checkpoint (2026-10-30)

- **Domain coverage:** 27/27 Skills across 5/5 Groups, plus 1 Domain = 33/33 entities.
- **Language coverage:** every `description.fe` has all 28 `LanguageCode` keys and a nonempty localized string: 756 Skill + 140 Group + 28 Domain = **924 translations**.
- **English-first:** reviewed baseline drafts for all 33 entities were committed before translation. All 33 final `fe.en` values match their recorded baseline exactly.
- **Domain commits:** `1a0ef41` English baselines; `1833986` notation; `b4c245e` place values (part 1); `d7f96c7` place values (part 2); `6f9cdb1` comparison; `bc4d403` number line; `f69d1ed` estimation; `8f15c9b` Domain; followed by this documentation checkpoint.
- **Static diff validation (GitHub PR patches):** 33/33 files passed registry-key and nonblank-string checks; no missing or duplicate keys. The only removed source line per entity is the old inline `description`, and its `methodological` value matches the new multiline field byte-for-byte. No IDs, names, group membership, exports, UUIDs, or staging taxonomy Markdown were changed.
- **Mathematical boundaries preserved:** numeral vs numerical value; digits vs place values; flexible decomposition vs standard expanded form; total tens vs tens digit; zero as placeholder; ordering, coordinates and unit distance; approximation vs exact counting; rounding midpoint remains subject to an explicitly selected tie-breaking rule.
- **Review limits:** translations were authored and checked for mathematical fidelity, terminology, RTL and Belarusian Taraškievica; no independent native-speaker certification was performed. Local TypeScript typechecks and focused npm tests **were not run** in the GitHub connector environment. Check CI runs separately; never claim that static patch checks are compiled or runtime tests.
- **Next Agent 1 Domain:** Fractions — 19 Skills / 4 Groups. Agent 2 owns Arithmetic + Algebra; Agent 3 owns #7–#13; do not cross ownership.

## Fractions — English authoring gate (2026-10-30)

Every English frontend description below was authored first against the existing English `description.methodological`. They preserve the chosen whole, equality of parts, and fraction value, without changing the Skills' scopes or hardcoding a teaching level. They serve as the reference for subsequent translations.

| Entity file (under `fractions/`)                       | English `description.fe.en`                                                                                                                             |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fractions.data.ts`                                    | Fractions show parts of a whole and positions on a number line. Learn how to represent, compare, and calculate with them.                               |
| `representation/representation.data.ts`                | Show parts of a chosen whole with fraction symbols, pictures, or a number line, including fractions equal to or greater than one.                       |
| `representation/skills/denominatorMeaning.data.ts`     | The bottom number tells how many equal parts make one whole. It tells the size of each part, not how many parts you have.                               |
| `representation/skills/equivalentVisual.data.ts`       | Different fractions can represent the same amount of the same whole. See how, for example, 1/2 and 2/4 cover equal amounts.                             |
| `representation/skills/fractionGreaterThanOne.data.ts` | When the top number is greater than the bottom number, the fraction is more than one whole. Show it with whole parts, a mixed number, or a number line. |
| `representation/skills/nonUnitModel.data.ts`           | Combine several equal parts of the same whole to show a fraction such as 3/4. The number of parts can reach or exceed one whole.                        |
| `representation/skills/numberLine.data.ts`             | Split the distance from 0 to 1 into equal steps, then find the position of a fraction such as 3/5.                                                      |
| `representation/skills/numeratorMeaning.data.ts`       | The top number tells how many equal parts are counted. With the same bottom number, more parts mean a greater fraction.                                 |
| `representation/skills/oneAsFraction.data.ts`          | All the equal parts together make one whole: 2/2, 3/3, and 5/5 each equal 1.                                                                            |
| `representation/skills/tenthsAsDivision.data.ts`       | One tenth is one of ten equal parts of a whole. Dividing the whole by 10 gives 1/10, which can also be written 0.1.                                     |
| `representation/skills/unitFractionModel.data.ts`      | Show 1/n as one of n equal parts of the same whole, using shapes, lengths, or groups of objects.                                                        |
| `representation/skills/unitFractionRead.data.ts`       | Read and write fractions with 1 on top, such as 1/2 (one half), 1/3 (one third), and 1/4 (one quarter).                                                 |
| `representation/skills/wholeAndEqualParts.data.ts`     | Choose the whole and divide it into equal-sized parts to name a fraction. Pieces of different sizes are not equal fractions of that whole.              |
| `representation/skills/wholeDependence.data.ts`        | A fraction tells what share of a whole you have. Half of a big whole is larger than half of a small whole.                                              |
| `portions/portions.data.ts`                            | Find a fractional part of a quantity or work backward from a known equal part to the whole.                                                             |
| `portions/skills/findUnitPart.data.ts`                 | To find 1/n of a quantity, divide the quantity into n equal shares. A share can include a fraction of a measurement unit.                               |
| `portions/skills/reconstructWhole.data.ts`             | If you know one of n equal shares, multiply it by n to find the whole quantity.                                                                         |
| `comparison/comparison.data.ts`                        | Compare fractions of the same whole by looking at the size of equal parts or the number of parts taken.                                                 |
| `comparison/skills/compareSameNumerator.data.ts`       | When the top numbers match, a larger positive bottom number means smaller parts and a smaller fraction of the same whole.                               |
| `comparison/skills/compareUnit.data.ts`                | For fractions with 1 on top, dividing the same whole into more equal parts makes each part smaller: 1/4 is smaller than 1/2.                            |
| `comparison/skills/sameDenominatorModel.data.ts`       | When the bottom numbers match, the fraction with more equal parts is larger. A picture can show why 3/5 is greater than 2/5.                            |
| `arithmetic/arithmetic.data.ts`                        | Add or subtract fractions made of the same-sized parts of one whole, keeping the denominator unchanged.                                                 |
| `arithmetic/skills/addLikeDenominators.data.ts`        | Add fractions with the same bottom number by adding their top numbers. The size of each part stays the same, even if the total exceeds one whole.       |
| `arithmetic/skills/subtractLikeDenominators.data.ts`   | Subtract fractions with the same bottom number by subtracting their top numbers. You remove parts without changing their size.                          |

**Scope:** 19 Skills, 4 Groups, 1 Domain (24 entities, 672 strings at 28 languages). Mathematical checks: same whole and equal-sized parts; larger denominators make smaller parts with numerator held positive; 1/n of a quantity may be nonintegral; denominators must be positive for the comparisons here; like-denominator fraction arithmetic remains valid beyond one whole.

## Fractions completion checkpoint (2026-10-30)

- **Scope completed:** 19/19 Skills, 4/4 Groups, and 1/1 Domain = **24/24 entities**.
- **Localization:** each entity has exactly 28 genuine, nonempty `description.fe` values using current `LanguageCode` keys. Totals: **532 Skill + 112 Group + 28 Domain = 672 frontend descriptions**.
- **English-first:** all 24 English drafts were recorded in the preceding review table before translating. Every committed `fe.en` exactly matches its reviewed draft.
- **Commits:** `6c32e0b` English drafts; `b1cd657` portions; `82b61bf` comparison; `1d41203` arithmetic; `6b425bd` representation (part 1); `753b303` representation (part 2); `af05141` representation (part 3); `bbd48fb` Domain; `4d1560e` proofreading; then this checkpoint.
- **Verified structural invariants:** 24/24 source patches preserve the original `description.methodological` verbatim. No existing UUIDs, IDs, names, membership, exports, or staged taxonomy Markdown were changed. No missing/duplicate/blank language keys, English copy used as a non-English fallback, or unreviewed English frontend draft mismatches were detected. Static patch validation passed.
- **Pedagogical distinctions checked:** fractions refer to a specified same whole; equal parts and positive denominators matter; numerators count parts while denominators give the partition; `1/n` of a quantity can be non-integral; comparisons hold the whole and the relevant numerator/denominator fixed; equivalent representations preserve value; fractions can exceed one; arithmetic on like denominators retains the denominator even if a result exceeds one.
- **Proofreading:** corrected identifiable Polish, Tamil, Telugu, Indonesian, Hebrew, Latvian, and Korean copy issues while preserving the English source. No independent native-speaker review was available; this is editorial authoring and static verification, not linguistic certification.
- **Execution limits:** GitHub connector supports file and patch validation, not local npm/TypeScript execution. Focused tests and typechecks **not run**; GitHub Actions status must be inspected separately and cannot be presumed passing.
- **Next Agent 1 domain:** Geometry (35 Skills, 10 Groups). The final shared `description.fe` contract migration remains deferred until all affected entities are populated and reviewed across the three agents.

## Geometry — English-first learner-description drafts (2026-10-30)

The following learner-facing English copy is checked against each existing methodological description. No skill definitions, IDs, numerical ranges, membership, or canonical staging taxonomy are changed. These are the approved editorial basis **for translation within this coding task**, not independently signed-off native-language reviews.

| Entity (under `geometry/`)                               | English `description.fe.en`                                                                                                                              |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `geometry.data.ts`                                       | Explore positions, lines, flat and solid shapes, angles, movements, perimeter, and area.                                                                 |
| `orientation/orientation.data.ts`                        | Describe where things are and how to move between places using directions, routes, and simple maps.                                                      |
| `orientation/skills/positionWords.data.ts`               | Use words such as left, right, above, behind, and ahead to describe positions. The answer can change with your viewpoint.                                |
| `orientation/skills/spatialOrientationPath.data.ts`      | Give or follow directions in the right order. Changing where you face or the order of turns may lead somewhere else.                                     |
| `orientation/skills/gridMapNavigation.data.ts`           | Read or draw a grid map to show positions and routes. Follow the same directions and grid scale throughout.                                              |
| `lines/lines.data.ts`                                    | Recognize points, straight and curved lines, rays, and segments, and how lines meet or relate to one another.                                            |
| `lines/skills/linesAndPoints.data.ts`                    | Tell a point, a straight line, a curved line, and a line made of straight segments apart. A drawing represents each of them.                             |
| `lines/skills/segment.data.ts`                           | Draw a straight segment between two endpoints, label them, and understand its length.                                                                    |
| `lines/skills/ray.data.ts`                               | Tell a line that continues both ways from a ray that starts at one point and a segment with two endpoints.                                               |
| `lines/skills/closedOpenLines.data.ts`                   | Tell whether a line forms a closed loop or stays open. A closed loop is not always made of straight sides.                                               |
| `lines/skills/parallelPerpendicular.data.ts`             | Recognize parallel lines that never meet and perpendicular lines that cross at a right angle, even when tilted.                                          |
| `figures/figures.data.ts`                                | Recognize flat shapes by their sides, corners, and other properties, and build new shapes from parts.                                                    |
| `figures/skills/identify2dShapes.data.ts`                | Recognize flat shapes even when turned, resized, or recolored. A square is also a kind of rectangle.                                                     |
| `figures/skills/shapeAttributes.data.ts`                 | Sort polygons by the number of sides and corners and by their geometric features, not by how they are drawn.                                             |
| `figures/skills/polygon.data.ts`                         | Recognize a polygon as a closed shape bounded by straight sides that meet at corners.                                                                    |
| `figures/skills/triangleRectangleSquare.data.ts`         | Recognize triangles, rectangles, and squares by their sides and angles. Every square is a rectangle.                                                     |
| `figures/skills/composeDecomposeShapes.data.ts`          | Split a flat shape into pieces without gaps or overlaps, then fit the pieces together. Rearranging them keeps the total area but can change the outline. |
| `solids/solids.data.ts`                                  | Recognize three-dimensional objects and their faces, edges, corners, and curved surfaces.                                                                |
| `solids/skills/identify3dSolids.data.ts`                 | Recognize solid shapes by their surfaces, faces, edges, and corners, even when drawn from another viewpoint.                                             |
| `solids/skills/spatialSolidsAttributes.data.ts`          | A cube and a rectangular box each have 6 faces, 12 edges, and 8 corners. In a cube, all edges are equal.                                                 |
| `solids/skills/shapeOnSolidSurface.data.ts`              | Find flat shapes on the faces or slices of solid objects. A flat face is not the whole three-dimensional shape.                                          |
| `transformations/transformations.data.ts`                | Move, turn, and reflect shapes while noticing which features stay the same.                                                                              |
| `transformations/skills/translationsReflections.data.ts` | Slide a shape without turning it, or flip it across a line. Its lengths, area, and perimeter stay the same.                                              |
| `transformations/skills/reflectionSymmetry.data.ts`      | Find a line that divides a shape into mirror-image halves, or finish drawing its reflection.                                                             |
| `transformations/skills/turnsQuarters.data.ts`           | Use quarter turns, half turns, and three-quarter turns, clockwise or counterclockwise, to change a shape’s direction.                                    |
| `angles/angles.data.ts`                                  | Look at angles as turns and compare them with a right angle to recognize different kinds.                                                                |
| `angles/skills/angleAsTurn.data.ts`                      | Compare how far two rays turn away from each other. Longer drawn arms do not make a bigger angle.                                                        |
| `angles/skills/rightAngle.data.ts`                       | Find and check right angles, including ones tilted in a drawing. Every right angle is 90 degrees.                                                        |
| `angles/skills/angleTypes.data.ts`                       | Tell acute angles (less than 90°), right angles (90°), and obtuse angles (between 90° and 180°) apart.                                                   |
| `circles/circles.data.ts`                                | Explore round boundaries and filled disks, their centers, radii, and diameters, and how to draw circles.                                                 |
| `circles/skills/circleDisk.data.ts`                      | Tell the curved boundary of a circle from the filled disk inside it. The boundary is not the area.                                                       |
| `circles/skills/radiusDiameter.data.ts`                  | Find the center, radius, and diameter of a circle. The diameter crosses the center and is twice the radius.                                              |
| `circles/skills/drawCircle.data.ts`                      | Use a compass to draw a circle with a chosen center and radius. The compass opening sets its size.                                                       |
| `perimeter/perimeter.data.ts`                            | Measure the distance all the way around a polygon by adding the lengths of its sides.                                                                    |
| `perimeter/skills/measurePerimeter.data.ts`              | Add all side lengths of a polygon to find its perimeter, measured in units of length.                                                                    |
| `perimeter/skills/rectanglePerimeter.data.ts`            | Find a rectangle’s perimeter by adding all four sides or doubling the sum of its length and width.                                                       |
| `perimeter/skills/squarePerimeter.data.ts`               | Find a square’s perimeter by multiplying one side length by four.                                                                                        |
| `perimeter/skills/unknownSideFromPerimeter.data.ts`      | Use a rectangle’s known perimeter and one side to calculate the length of the other side.                                                                |
| `area/area.data.ts`                                      | Measure the inside of flat shapes in square units, including rectangles and shapes made of several pieces.                                               |
| `area/skills/areaAsCovering.data.ts`                     | Area tells how much flat space a shape covers. Cover it with equal unit squares without gaps or overlaps.                                                |
| `area/skills/countUnitSquares.data.ts`                   | Find area by counting square units inside a shape, including parts of squares when needed.                                                               |
| `area/skills/rectangleAreaModel.data.ts`                 | Find a rectangle’s area by multiplying its length and width. Rows and columns of equal squares show why this works.                                      |
| `area/skills/compositeArea.data.ts`                      | Split a shape made of rectangles into nonoverlapping pieces, find each area, and add them without counting space twice.                                  |
| `perimeterArea/perimeterArea.data.ts`                    | Understand the difference between the distance around a shape and the amount of space inside it.                                                         |
| `perimeterArea/skills/perimeterVsArea.data.ts`           | Choose perimeter to measure the boundary in length units or area to measure the inside in square units.                                                  |
| `perimeterArea/skills/areaPerimeterContrast.data.ts`     | Build shapes with the same perimeter but different areas, or the same area but different perimeters.                                                     |

**Inventory:** 35 Skills + 10 Groups + 1 Domain = 46 entities × 28 supported locales = 1,288 localized descriptions. Preserve geometry concepts (open vs closed curves; line/ray/segment; square ⊂ rectangle; 2D vs 3D; area in squares vs perimeter in lengths; circle boundary vs filled disk; orientation-dependent directions). Keep shared contract optional until all agents finish.

## Geometry completed checkpoint (2026-10-30)

- **Inventory:** all 35 Skills, 10 Groups, 1 Domain = **46/46 entities**, each with exactly 28 full `description.fe` translations. **980 Skill + 280 Group + 28 Domain = 1,288 localized strings.**
- **English-first:** 46 English learner-facing descriptions were reviewed against each original English `description.methodological` and recorded above before translation. All 46 `fe.en` values exactly match their recorded English baselines.
- **Group commits:** `1b4c417` orientation; `5dc237c` lines; `6d6d3ce` figures; `fc1b9b6` solids; `9572407` transformations; `bd66374` angles; `2ded6b4` circles; `3fefd0a` perimeter; `c0928c0` area; `75828b7` perimeter-vs-area; `677d10c` Domain; `06a5d32` proofreading; this documentation checkpoint.
- **Static validation:** GitHub PR patch-based validation confirmed 46 files, 28 registry language codes per file, 1,288 nonempty strings, no duplicate/missing code keys, no English used unchanged for other locales, and original `description.methodological` preserved exactly. No existing UUIDs, identifiers, localized names, group memberships, exports or staging Markdown taxonomy content changed.
- **Semantic boundaries:** points vs lines vs rays vs segments; open vs closed curves; squares are special rectangles; 2D faces vs 3D solids; direction changes with reference frame; reflecting vs translating; right angle 90° even if rotated; circle line vs filled disk; perimeter in length units and area in square units; rearranged pieces preserve area but need not preserve perimeter.
- **Proofreading:** corrected an accidental hidden soft hyphen in Ukrainian copy, Belarusian right-angle vocabulary, and a few Lithuanian, Georgian and Tamil formulations. A native-speaker linguistic audit across 28 languages has **not** been independently performed.
- **Limitations:** GitHub connector permits repository inspection and commit/patch checks, but not a local dependency-backed TypeScript compiler/test runner. Focused typechecks and tests **not run locally**; GitHub Actions status must be checked separately.
- **Agent 1 ownership complete:** Counting (15) + Natural Numbers (27) + Fractions (19) + Geometry (35) = **96/96 Skills**. This branch and Draft PR #97 contain only Agent 1's owned domains and local checkpoint document. The final shared `description.fe` contract/builder migration must happen **only after** all three agents finish and their PRs are coordinated, with explicit user approval for merging.
