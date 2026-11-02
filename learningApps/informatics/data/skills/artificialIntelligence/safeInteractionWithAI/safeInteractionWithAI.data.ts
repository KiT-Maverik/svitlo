import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainRisksOfOverrelianceOnAI_Skill_Data, identifyUntrustedInstructionsInAIInput_Skill_Data, protectSecretsWhenUsingAI_Skill_Data, recognizeAISycophancy_Skill_Data } from './skills';

export const safeInteractionWithAI_SkillGroup_Data = buildSkillGroupConfig({
  slug: "safeInteractionWithAI",
  id: "7d772a91-a37b-43bb-a150-aefbfb53aeaf",
  name: {
    en: "Safe Interaction with AI",
  },
  skills: {
    explainRisksOfOverrelianceOnAI: explainRisksOfOverrelianceOnAI_Skill_Data,
    identifyUntrustedInstructionsInAIInput: identifyUntrustedInstructionsInAIInput_Skill_Data,
    protectSecretsWhenUsingAI: protectSecretsWhenUsingAI_Skill_Data,
    recognizeAISycophancy: recognizeAISycophancy_Skill_Data,
  },
  description: {
    methodological: "Recognizing unjustified model confidence, excessive agreement, dependency risks, and the need for continued human judgment.",
    frontend: {
      en: "Recognize interaction patterns that can make AI advice misleading or unhealthy.",
    },
  },
});
