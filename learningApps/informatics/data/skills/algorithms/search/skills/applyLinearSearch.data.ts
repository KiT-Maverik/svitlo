import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const applyLinearSearch_Skill_Data = buildSkillConfig({
  slug: "applyLinearSearch",
  id: "0db01fdb-33f9-49b6-99ca-e35d87a00912",
  name: {
    en: "Apply Linear Search",
  },
  description: {
    methodological: "Inspect items one by one until the target is found or the collection ends; prior sorting is unnecessary. In the no-match case the entire collection may need checking.",
    frontend: {
      en: "Find a target by inspecting elements one after another.",
    },
  },
});
