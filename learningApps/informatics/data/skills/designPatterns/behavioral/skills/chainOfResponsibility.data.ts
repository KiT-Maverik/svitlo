import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const chainOfResponsibility_Skill_Data = buildSkillConfig({
  slug: "chainOfResponsibility",
  id: "f563a40e-9659-4152-a169-e93305a74fd8",
  name: {
    en: "Chain of Responsibility",
  },
  description: {
    methodological: "Pass a request through a chain of handlers until one processes it or passes it onward.",
    frontend: {
      en: "Pass a request through handlers until one can process it.",
    },
  },
});
