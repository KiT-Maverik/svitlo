import type { howLightMoves } from "#lessonsData/c/d3048d21-8690-5255-b62c-984c69ac272c/index";
type LessonPatch = Parameters<typeof howLightMoves.build.overrides>[0];
import { task } from "./task";
type SectionPatch = Exclude<NonNullable<NonNullable<LessonPatch["section"]>["items"]>["practice"], undefined | false>;

export const practice = {"params": {"skippable": false}, "content": {"items": {"task": task}}} satisfies SectionPatch;
