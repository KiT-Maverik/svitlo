import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const insertAnElementIntoASequence_Skill_Data = buildSkillConfig({
  slug: "insertAnElementIntoASequence",
  id: "e3448d37-825b-4ba1-a5ae-d06633a391a7",
  name: {
    en: "Insert an Element into a Sequence",
  },
  description: {
    methodological: "Add a new item at a specified position and predict how it affects the order of other items or links between nodes.",
    frontend: {
      en: "Insert an item at the right place in an ordered sequence.",
    },
  },
});
