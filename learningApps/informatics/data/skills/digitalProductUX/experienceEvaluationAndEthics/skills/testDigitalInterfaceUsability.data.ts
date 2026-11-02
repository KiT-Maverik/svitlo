import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const testDigitalInterfaceUsability_Skill_Data = buildSkillConfig({
  slug: "testDigitalInterfaceUsability",
  id: "3b4cafc8-793b-4d2f-87c1-57ac4cd4e141",
  name: {
    en: "Test Digital Interface Usability",
  },
  description: {
    methodological: "Give a person a concrete task on a device or in an app and observe whether they find the necessary actions without hints; identify confusing transitions and messages.",
    frontend: {
      en: "Observe whether a person can complete a real task without extra hints.",
    },
  },
});
