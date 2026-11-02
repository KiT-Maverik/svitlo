import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const unitPricing_Skill_Data = buildSkillConfig({
  slug: "unitPricing",
  id: "1fc15581-c58c-4af9-ab3b-0e2b229baecd",
  name: {
    en: "Ціна за одиницю товару",
  },
  description: {
    methodological: "Convert offer prices into comparable units of mass, volume, or quantity while accounting for bundle contents, quality, and promotional conditions; a cheaper package need not have a cheaper unit price.",
    frontend: {
      en: "Compare products fairly by calculating the cost per unit.",
    },
  },
});
