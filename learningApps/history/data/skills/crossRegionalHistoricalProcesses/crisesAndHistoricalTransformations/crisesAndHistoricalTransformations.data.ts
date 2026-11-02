import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { ancientEnvironmentalChallenges_Skill_Data, ancientEpidemicsAndDemography_Skill_Data, comparativeHistoricalTransformations_Skill_Data, politicalDeclineAndContinuity_Skill_Data } from './skills';

export const crisesAndHistoricalTransformations_SkillGroup_Data = buildSkillGroupConfig({
  slug: "crisesAndHistoricalTransformations",
  id: "8690c916-53b3-4bed-b5fb-066b597625cf",
  name: {
    en: "Кризи й трансформації",
  },
  skills: {
    ancientEnvironmentalChallenges: ancientEnvironmentalChallenges_Skill_Data,
    ancientEpidemicsAndDemography: ancientEpidemicsAndDemography_Skill_Data,
    comparativeHistoricalTransformations: comparativeHistoricalTransformations_Skill_Data,
    politicalDeclineAndContinuity: politicalDeclineAndContinuity_Skill_Data,
  },
  description: {
    methodological: "Climate shifts, wars, disease, and economic reorganization interacted but produced different outcomes across regions.",
    frontend: {
      en: "Explore why ancient societies experienced major changes and crises.",
    },
  },
});
