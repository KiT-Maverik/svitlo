import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainDiffusion_Skill_Data } from './skills';

export const diffusionAndMixing_SkillGroup_Data = buildSkillGroupConfig({
  slug: "diffusionAndMixing",
  id: "e55646ac-2f04-4c36-a34b-d9050493877e",
  name: {
    en: "Diffusion and Mixing",
  },
  skills: {
    explainDiffusion: explainDiffusion_Skill_Data,
  },
  description: {
    methodological: "Random thermal motion can cause particles to spread gradually without deliberate stirring.",
    frontend: {
      en: "Discover how random particle movement causes substances to spread and mix.",
    },
  },
});
