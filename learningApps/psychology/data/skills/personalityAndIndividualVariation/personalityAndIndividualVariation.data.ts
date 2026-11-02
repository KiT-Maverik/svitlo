import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { cognitiveAndLearningDifferences_SkillGroup_Data } from './cognitiveAndLearningDifferences/cognitiveAndLearningDifferences.data';
import { cultureAndDiversity_SkillGroup_Data } from './cultureAndDiversity/cultureAndDiversity.data';
import { selfConceptAndIdentity_SkillGroup_Data } from './selfConceptAndIdentity/selfConceptAndIdentity.data';
import { traitsAndPersonalityModels_SkillGroup_Data } from './traitsAndPersonalityModels/traitsAndPersonalityModels.data';

export const personalityAndIndividualVariation_SkillDomain_Data = buildSkillDomainConfig({
  slug: "personalityAndIndividualVariation",
  id: "67a62640-fd4a-41da-a481-0a564fcf70aa",
  name: {
    en: "Personality and Individual Variation",
  },
  groups: {
    cognitiveAndLearningDifferences: cognitiveAndLearningDifferences_SkillGroup_Data,
    cultureAndDiversity: cultureAndDiversity_SkillGroup_Data,
    selfConceptAndIdentity: selfConceptAndIdentity_SkillGroup_Data,
    traitsAndPersonalityModels: traitsAndPersonalityModels_SkillGroup_Data,
  },
  description: {
    methodological: "People differ in characteristic patterns of thought, feeling, and behavior, but measurement requires caution about situations, cultural meaning, and fairness. Describing a tendency never fixes a person's worth or destiny.",
    frontend: {
      en: "Explore how personalities and cognitive abilities vary across people and situations.",
    },
  },
});
