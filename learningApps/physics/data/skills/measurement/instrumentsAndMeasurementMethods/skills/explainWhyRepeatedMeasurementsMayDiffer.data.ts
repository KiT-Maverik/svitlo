import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainWhyRepeatedMeasurementsMayDiffer_Skill_Data = buildSkillConfig({
  slug: "explainWhyRepeatedMeasurementsMayDiffer",
  id: "991335aa-cfff-4b9e-a113-e1a8ab5d7195",
  name: {
    en: "Explain why repeated measurements may differ",
  },
  description: {
    methodological: "Repeated measurements can differ because of instrument precision limits, reading methods, or changing conditions; a difference in values does not always mean that the measured phenomenon has changed.",
    frontend: {
      en: "Explain why repeated readings can differ even when measuring the same object.",
    },
  },
});
