import type { howLightMoves } from "#lessonsData/c/d3048d21-8690-5255-b62c-984c69ac272c/index";
type LessonPatch = Parameters<typeof howLightMoves.build.overrides>[0];
type SectionPatch = Exclude<NonNullable<NonNullable<LessonPatch["section"]>["items"]>["practice"], undefined | false>;
type BlockPatch = Exclude<NonNullable<NonNullable<SectionPatch["content"]>["items"]>["task"], undefined | false>;

export const task = {"locale": {"value": {"en": "At this exhibition, compare the shadow of an opaque object when the lamp moves."}}} satisfies BlockPatch;
