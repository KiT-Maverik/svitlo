import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const negateAQuantifiedProposition_Skill_Data = buildSkillConfig({
  slug: "negateAQuantifiedProposition",
  id: "6354dfd6-2d56-4952-adee-f562d5f81118",
  name: {
    en: "Negate a quantified proposition",
  },
  description: {
    methodological: "Use the relationships between not-all and some-not, and between none and there-exists, to interpret negation accurately.",
    frontend: {
      en: "Negate statements involving 'all' or 'some' without changing their meaning incorrectly.",
    },
  },
});
