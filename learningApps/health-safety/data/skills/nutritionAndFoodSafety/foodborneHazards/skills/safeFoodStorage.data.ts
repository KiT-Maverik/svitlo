import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const safeFoodStorage_Skill_Data = buildSkillConfig({
  slug: "safeFoodStorage",
  id: "e20dc306-5258-475b-b80f-11e9d150d10c",
  name: {
    en: "Safe food storage",
  },
  description: {
    methodological: "Select appropriate storage conditions and time limits, distinguishing shelf-stable from perishable foods.",
    frontend: {
      en: "Store perishable foods under appropriate conditions.",
    },
  },
});
