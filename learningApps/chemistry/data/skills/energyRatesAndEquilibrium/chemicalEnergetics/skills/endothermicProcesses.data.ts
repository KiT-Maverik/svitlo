import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const endothermicProcesses_Skill_Data = buildSkillConfig({
  slug: "endothermicProcesses",
  id: "9e1b3d80-a2c9-494b-9f31-b4f20225129e",
  name: {
    en: "Endothermic Processes",
  },
  description: {
    methodological: "Interpret positive system enthalpy change and recognize that absorbing heat need not mean a reaction cannot occur.",
    frontend: {
      en: "Recognize when a process absorbs heat without assuming it cannot proceed.",
    },
  },
});
