import type { SupportedLanguages } from '@svitlo/engine/build';

// TODO (BLOCKER): Obtain independent Crimean Tatar linguistic review before Ready; authoring is a draft.
export const languages = ["uk","en","pl","qm"] as const satisfies SupportedLanguages;
export type LessonLanguages = typeof languages;
