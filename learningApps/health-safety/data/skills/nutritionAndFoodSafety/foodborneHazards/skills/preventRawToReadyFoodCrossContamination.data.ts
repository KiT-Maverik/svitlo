import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const preventRawToReadyFoodCrossContamination_Skill_Data = buildSkillConfig({
  slug: "preventRawToReadyFoodCrossContamination",
  id: "1778aa27-11e6-4e53-b66e-1768f68bafef",
  name: {
    en: "Prevent raw-to-ready food cross-contamination",
  },
  description: {
    methodological: "Keep raw animal products and their juices from contaminating ready-to-eat food through separate equipment, storage and handling; this concerns foodborne pathogens rather than allergen cross-contact.",
    frontend: {
      en: "Keep raw animal products separate from ready-to-eat foods.",
    },
  },
});
