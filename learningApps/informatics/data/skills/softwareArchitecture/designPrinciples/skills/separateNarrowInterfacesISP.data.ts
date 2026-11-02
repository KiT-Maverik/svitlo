import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const separateNarrowInterfacesISP_Skill_Data = buildSkillConfig({
  slug: "separateNarrowInterfacesISP",
  id: "f6c5fd7e-015a-4139-af56-390b3faff3b0",
  name: {
    en: "Separate Narrow Interfaces (ISP)",
  },
  description: {
    methodological: "Split a large contract into role-specific interfaces so consumers depend only on needed operations. A read-only viewing device should not be required to implement editing or printing.",
    frontend: {
      en: "Make interfaces small enough that clients need only the operations they use.",
    },
  },
});
