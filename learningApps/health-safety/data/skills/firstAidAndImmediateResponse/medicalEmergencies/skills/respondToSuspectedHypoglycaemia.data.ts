import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const respondToSuspectedHypoglycaemia_Skill_Data = buildSkillConfig({
  slug: "respondToSuspectedHypoglycaemia",
  id: "bdc94536-95c2-48f6-9c71-f6e5bd42e632",
  name: {
    en: "Respond to suspected hypoglycaemia",
  },
  description: {
    methodological: "Recognize possible low blood glucose and distinguish safe assistance for a person who is fully alert and can swallow from the need for urgent help when consciousness or swallowing is impaired.",
    frontend: {
      en: "Recognize possible low blood sugar and when swallowing makes assistance unsafe.",
    },
  },
});
