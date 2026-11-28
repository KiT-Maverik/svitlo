# Course routes and presentation boundary

Course publication remains keyed by its stable UUID. The Web host has no approved
global Course-slug → UUID registry; it must not infer one from filesystem order,
an authored slug, a catalog scan, or a Course title. The segment
`/[interfaceLanguage]/course/[courseId]` therefore uses the published UUID
until a separate routing-registry contract is approved in the integration PR.

## Activity addresses

Course activity links use the canonical **placement path**, not an activity UUID:

```text
/[interfaceLanguage]/course/[courseId]/lesson/[contentLanguage]/[...placement]
/[interfaceLanguage]/course/[courseId]/episode/[contentLanguage]/[...placement]
/[interfaceLanguage]/course/[courseId]/assessment/[contentLanguage]/[...placement]
```

A path is a nonempty sequence of safe, case-sensitive, slug placement keys (for
example, `astronomy/basics/reflection`). The URL locates a member of the
validated, assembled Course tree through the Engine
`findCourseActivityByPlacement` resolver. A canonical Lesson can occur at
multiple distinct placements with independent Course overrides and links.
The Course overview and sidebar project the published TOC `children` order into
UI presentation arrays; they do not load Lessons to discover headings.

The two language segments are independent. The interface language selects UI
messages and navigation labels; the content language selects published learning
Data. The Course overview may select a documented content-language fallback;
direct activity pages do not silently fall back. The Web host verifies the
published TOC against the same assembled Course before using its labels.

Malformed or unknown placement paths, mismatched activity types and unavailable
content languages result in a 404. Draft-only activities are never addressable in
production: the Engine production loader rejects draft publications, and local
development may show an explicit, noninteractive draft placeholder. Missing or
corrupt publication files are reported as publication errors rather than
misrepresented as missing Course membership.

Legacy UUID activity URLs and the ambiguous `?placement=` selector are not
automatically redirected; a reliable migration requires a versioned placement
registry. This decision must be revisited when the Course root slug registry is
specified by the parent integration.

## Data versus UI Props

The Engine and published JSON retain slug-addressed children and independent
Question/Flashcard resources. The UI Kit `presentation.ts` and
`questionPresentation.ts` converters project ordered groups into renderer-only
arrays at the presentation boundary. This includes Sections, Carousel slides,
Checkpoint items and answers, Assessment phases, Questions and Flashcard sides.
They do not rewrite source Data or import authoring Configurators. Platform
hosts should share these converters and provide their own rendering resources
and asset loaders.
