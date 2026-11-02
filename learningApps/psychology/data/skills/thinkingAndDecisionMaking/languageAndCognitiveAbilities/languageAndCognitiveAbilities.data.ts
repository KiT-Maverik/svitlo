import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { cognitiveTestInterpretation_Skill_Data, languageComprehension_Skill_Data, languageProduction_Skill_Data, theoriesOfIntelligence_Skill_Data } from './skills';

export const languageAndCognitiveAbilities_SkillGroup_Data = buildSkillGroupConfig({
  slug: "languageAndCognitiveAbilities",
  id: "6b3cbfeb-e4d6-42e6-bc88-e3d6325bf183",
  name: {
    en: "Language and Cognitive Abilities",
  },
  skills: {
    cognitiveTestInterpretation: cognitiveTestInterpretation_Skill_Data,
    languageComprehension: languageComprehension_Skill_Data,
    languageProduction: languageProduction_Skill_Data,
    theoriesOfIntelligence: theoriesOfIntelligence_Skill_Data,
  },
  description: {
    methodological: "Psychological research investigates language processing and performance differences rather than literary quality or innate worth.",
    frontend: {
      en: "Explore how people process language and how cognitive abilities are measured.",
    },
  },
});
