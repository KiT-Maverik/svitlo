import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const testDigitalInteractionAccessibility_Skill_Data = buildSkillConfig({
  slug: "testDigitalInteractionAccessibility",
  id: "67fa1703-ab8d-4166-a6db-4549a5bcce56",
  name: {
    en: "Test Digital Interaction Accessibility",
  },
  description: {
    methodological: "Test concrete interaction methods without a mouse, without sound, or with enlarged text and record barriers. No complaints or an attractive design do not prove accessibility.",
    frontend: {
      en: "Test an interface without a mouse or sound and record obstacles.",
    },
  },
});
