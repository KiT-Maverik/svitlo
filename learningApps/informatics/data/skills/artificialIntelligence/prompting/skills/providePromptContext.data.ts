import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const providePromptContext_Skill_Data = buildSkillConfig({
  slug: "providePromptContext",
  id: "b4ec3a28-504f-4685-a3d5-13292dd6fd5c",
  name: {
    en: "Provide Prompt Context",
  },
  description: {
    methodological: "Supply relevant facts, intended audience or use, and conditions needed to interpret a request correctly. Context helps but should exclude unnecessary personal information.",
    frontend: {
      en: "Give relevant background information that helps an AI interpret your request.",
    },
  },
});
