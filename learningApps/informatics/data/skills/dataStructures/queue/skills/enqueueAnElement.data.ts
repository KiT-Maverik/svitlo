import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const enqueueAnElement_Skill_Data = buildSkillConfig({
  slug: "enqueueAnElement",
  id: "17a1fd61-5d3e-47ae-89ff-9e4312cbd66c",
  name: {
    en: "Enqueue an Element",
  },
  description: {
    methodological: "Add a value to the back without rearranging those already waiting.",
    frontend: {
      en: "Add a new item to the back of a queue.",
    },
  },
});
