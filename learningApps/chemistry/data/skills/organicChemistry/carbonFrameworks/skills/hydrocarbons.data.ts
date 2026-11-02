import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const hydrocarbons_Skill_Data = buildSkillConfig({
  slug: "hydrocarbons",
  id: "2ba703d0-151e-4c92-b5a9-cb4e0c3856fd",
  name: {
    en: "Hydrocarbons",
  },
  description: {
    methodological: "Identify compounds containing only carbon and hydrogen and distinguish saturated from unsaturated connectivity.",
    frontend: {
      en: "Recognize compounds made only of carbon and hydrogen.",
    },
  },
});
