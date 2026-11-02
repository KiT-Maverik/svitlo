import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const taxProgressivity_Skill_Data = buildSkillConfig({
  slug: "taxProgressivity",
  id: "4096e36b-d4b9-40ea-83ef-68b7ba1c75fe",
  name: {
    en: "Прогресивність оподаткування",
  },
  description: {
    methodological: "Distinguish progressive, proportional, and regressive effective tax rates according to the tax base and income structure.",
    frontend: {
      en: "Compare how tax burdens change at different income levels.",
    },
  },
});
