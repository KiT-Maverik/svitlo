import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainEncapsulation_Skill_Data = buildSkillConfig({
  slug: "explainEncapsulation",
  id: "385f0a36-2341-49d1-b126-6ade78679eed",
  name: {
    en: "Explain Encapsulation",
  },
  description: {
    methodological: "Show how an object restricts direct access to internal state and provides controlled operations that preserve its rules. For example, a bank account changes through a withdrawal method that validates the transaction.",
    frontend: {
      en: "Understand how objects protect their internal state through controlled methods.",
    },
  },
});
