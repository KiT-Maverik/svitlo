import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const massConservation_Skill_Data = buildSkillConfig({
  slug: "massConservation",
  id: "9e2bdcf3-a181-44e5-bde5-a6c8cfd1218e",
  name: {
    en: "Mass Conservation",
  },
  description: {
    methodological: "Account for matter in physical and chemical processes, including gases that cross an open-system boundary.",
    frontend: {
      en: "Explain how matter is conserved even when gases enter or leave a container.",
    },
  },
});
