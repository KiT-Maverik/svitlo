import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const adapter_Skill_Data = buildSkillConfig({
  slug: "adapter",
  id: "df520d41-4bc3-4451-8fb1-0e70f755d5e6",
  name: {
    en: "Adapter",
  },
  description: {
    methodological: "Translate the interface expected by a client into that of an existing component without rewriting that component.",
    frontend: {
      en: "Connect incompatible interfaces by translating between them.",
    },
  },
});
