import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const checkCorroborationAcrossSources_Skill_Data = buildSkillConfig({
  slug: "checkCorroborationAcrossSources",
  id: "28d6a919-6caf-4e52-a016-2a363a666a99",
  name: {
    en: "Check corroboration across sources",
  },
  description: {
    methodological: "Determine whether apparently agreeing accounts are genuinely independent or reproduce one underlying report.",
    frontend: {
      en: "Check whether several agreeing sources truly provide independent evidence.",
    },
  },
});
