import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const aromaticCompounds_Skill_Data = buildSkillConfig({
  slug: "aromaticCompounds",
  id: "54e81cbc-e802-4fad-9003-77181e5d19a6",
  name: {
    en: "Aromatic Compounds",
  },
  description: {
    methodological: "Distinguish aromatic conjugated ring systems from any molecule that merely has a ring.",
    frontend: {
      en: "Distinguish aromatic molecular structures from ordinary carbon rings.",
    },
  },
});
