import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const compareMeasurementsOfTheSameQuantity_Skill_Data = buildSkillConfig({
  slug: "compareMeasurementsOfTheSameQuantity",
  id: "db888803-d934-466f-bddb-318bf7201fc2",
  name: {
    en: "Compare measurements of the same quantity",
  },
  description: {
    methodological: "Given consistent units and clearly stated conditions, determine which measured value is larger or smaller; this is physical interpretation, not arithmetic practice.",
    frontend: {
      en: "Compare measurements made under consistent conditions and units.",
    },
  },
});
