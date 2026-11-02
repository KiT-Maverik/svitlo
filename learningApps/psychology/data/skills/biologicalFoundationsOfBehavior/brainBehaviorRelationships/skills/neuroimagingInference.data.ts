import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const neuroimagingInference_Skill_Data = buildSkillConfig({
  slug: "neuroimagingInference",
  id: "95ee8740-08c9-4372-a8b5-238cfda5dd53",
  name: {
    en: "Neuroimaging Inference",
  },
  description: {
    methodological: "Distinguish an imaged physiological signal from an inferred thought and identify the limits of reverse inference.",
    frontend: {
      en: "Understand why brain activity images cannot directly reveal particular thoughts.",
    },
  },
});
