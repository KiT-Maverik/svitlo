import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const paymentFeesAndTerms_Skill_Data = buildSkillConfig({
  slug: "paymentFeesAndTerms",
  id: "a5d30d81-d28a-40c9-8980-a351bc1fb501",
  name: {
    en: "Комісії та умови платежів",
  },
  description: {
    methodological: "Account for fees, currency conversion, settlement time, and options to dispute a transaction.",
    frontend: {
      en: "Look for extra payment fees, conversion charges, and transaction terms.",
    },
  },
});
