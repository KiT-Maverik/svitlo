import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainProceduralResourceGeneration_Skill_Data = buildSkillConfig({
  slug: "explainProceduralResourceGeneration",
  id: "267b7e9d-3edb-4275-9fe9-f212ef291a4f",
  name: {
    en: "Explain Procedural Resource Generation",
  },
  description: {
    methodological: "Distinguish storing a finished image, sound, or world from running rules that generate one from parameters. Compact rules can create a large resource but require computation at generation time.",
    frontend: {
      en: "Explain how a generator creates resources instead of storing every finished variation.",
    },
  },
});
