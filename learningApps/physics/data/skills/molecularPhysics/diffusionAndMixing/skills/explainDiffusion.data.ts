import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainDiffusion_Skill_Data = buildSkillConfig({
  slug: "explainDiffusion",
  id: "c0a41a83-acb2-4d10-9ca0-7ec7f9971a18",
  name: {
    en: "Explain diffusion",
  },
  description: {
    methodological: "Diffusion results from particles' thermal motion and the gradual equalization of their concentrations without the need for macroscopic mixing.",
    frontend: {
      en: "Explain how diffusion can occur without stirring.",
    },
  },
});
