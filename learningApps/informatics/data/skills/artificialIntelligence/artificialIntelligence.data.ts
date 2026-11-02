import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { aIFundamentals_SkillGroup_Data } from './aIFundamentals/aIFundamentals.data';
import { imitationAndUnderstanding_SkillGroup_Data } from './imitationAndUnderstanding/imitationAndUnderstanding.data';
import { languageModelTokensAndContext_SkillGroup_Data } from './languageModelTokensAndContext/languageModelTokensAndContext.data';
import { modelArchitecturesAndResources_SkillGroup_Data } from './modelArchitecturesAndResources/modelArchitecturesAndResources.data';
import { prompting_SkillGroup_Data } from './prompting/prompting.data';
import { reliabilityAndResponsibleAIUse_SkillGroup_Data } from './reliabilityAndResponsibleAIUse/reliabilityAndResponsibleAIUse.data';
import { safeInteractionWithAI_SkillGroup_Data } from './safeInteractionWithAI/safeInteractionWithAI.data';

export const artificialIntelligence_SkillDomain_Data = buildSkillDomainConfig({
  slug: "artificialIntelligence",
  id: "7ca59646-251b-4009-b150-7533da7eb92c",
  name: {
    en: "Artificial Intelligence",
  },
  groups: {
    aIFundamentals: aIFundamentals_SkillGroup_Data,
    imitationAndUnderstanding: imitationAndUnderstanding_SkillGroup_Data,
    languageModelTokensAndContext: languageModelTokensAndContext_SkillGroup_Data,
    modelArchitecturesAndResources: modelArchitecturesAndResources_SkillGroup_Data,
    prompting: prompting_SkillGroup_Data,
    reliabilityAndResponsibleAIUse: reliabilityAndResponsibleAIUse_SkillGroup_Data,
    safeInteractionWithAI: safeInteractionWithAI_SkillGroup_Data,
  },
  description: {
    methodological: "Examines systems performing recognition, prediction, generation, and other forms of intelligent information processing. Includes explicitly programmed rules and trained models, how they work, prompting, technical trade-offs, and reliability verification.",
    frontend: {
      en: "Discover how artificial intelligence systems learn, predict, generate and sometimes fail.",
    },
  },
});
