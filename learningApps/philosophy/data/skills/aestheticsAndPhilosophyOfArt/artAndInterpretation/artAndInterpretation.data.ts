import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeTheEthicalEvaluationOfArt_Skill_Data, compareInterpretationsOfAnArtwork_Skill_Data, distinguishArtisticIntentionFromInterpretation_Skill_Data, evaluateADefinitionOfArt_Skill_Data } from './skills';

export const artAndInterpretation_SkillGroup_Data = buildSkillGroupConfig({
  slug: "artAndInterpretation",
  id: "d168025b-cf7a-4342-a847-e58af2d574cd",
  name: {
    en: "Art and Interpretation",
  },
  skills: {
    analyzeTheEthicalEvaluationOfArt: analyzeTheEthicalEvaluationOfArt_Skill_Data,
    compareInterpretationsOfAnArtwork: compareInterpretationsOfAnArtwork_Skill_Data,
    distinguishArtisticIntentionFromInterpretation: distinguishArtisticIntentionFromInterpretation_Skill_Data,
    evaluateADefinitionOfArt: evaluateADefinitionOfArt_Skill_Data,
  },
  description: {
    methodological: "A work can bear meanings and values that are not reducible to the creator's stated intent or a viewer's immediate reaction.",
    frontend: {
      en: "Consider how artworks can communicate meanings beyond what their makers intended.",
    },
  },
});
