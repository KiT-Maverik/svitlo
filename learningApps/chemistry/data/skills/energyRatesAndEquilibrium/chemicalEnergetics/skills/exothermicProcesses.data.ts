import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const exothermicProcesses_Skill_Data = buildSkillConfig({
  slug: "exothermicProcesses",
  id: "4f3130c7-4fcf-483d-99ed-30635d83b697",
  name: {
    en: "Exothermic Processes",
  },
  description: {
    methodological: "Interpret negative system enthalpy change under stated conditions and distinguish released heat from reaction rate.",
    frontend: {
      en: "Recognize when a process releases heat without assuming that it happens quickly.",
    },
  },
});
