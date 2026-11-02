import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const recognizeUnsafeAccessRequests_Skill_Data = buildSkillConfig({
  slug: "recognizeUnsafeAccessRequests",
  id: "8c964d6c-4cc1-4029-9550-f8649ef101dc",
  name: {
    en: "Recognize unsafe access requests",
  },
  description: {
    methodological: "Distinguish legitimate authentication from requests for passwords, verification codes, or remote access by untrusted parties.",
    frontend: {
      en: "Recognize suspicious requests for passwords or verification codes.",
    },
  },
});
