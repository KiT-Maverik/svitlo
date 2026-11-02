import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const interpretManufacturingTolerances_Skill_Data = buildSkillConfig({
  slug: "interpretManufacturingTolerances",
  id: "9f3917f3-6a2b-44e5-b00d-197f510ae750",
  name: {
    en: "Interpret manufacturing tolerances",
  },
  description: {
    methodological: "Read permissible dimensions and deviations from a specified manufacturing drawing, deciding whether a measured component meets its stated production limits.",
    frontend: {
      en: "Read permitted dimensional variations in a manufacturing drawing.",
    },
  },
});
