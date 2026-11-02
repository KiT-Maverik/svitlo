import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { fairnessInCognitiveAssessment_Skill_Data, individualCognitiveProfiles_Skill_Data, natureAndNurtureInAbility_Skill_Data, neurodevelopmentalVariability_Skill_Data, standardizedScoreInterpretation_Skill_Data } from './skills';

export const cognitiveAndLearningDifferences_SkillGroup_Data = buildSkillGroupConfig({
  slug: "cognitiveAndLearningDifferences",
  id: "2db326dc-1b89-4be2-a1b9-17212d9d80db",
  name: {
    en: "Cognitive and Learning Differences",
  },
  skills: {
    fairnessInCognitiveAssessment: fairnessInCognitiveAssessment_Skill_Data,
    individualCognitiveProfiles: individualCognitiveProfiles_Skill_Data,
    natureAndNurtureInAbility: natureAndNurtureInAbility_Skill_Data,
    neurodevelopmentalVariability: neurodevelopmentalVariability_Skill_Data,
    standardizedScoreInterpretation: standardizedScoreInterpretation_Skill_Data,
  },
  description: {
    methodological: "Performance varies across abilities, experiences, and testing contexts, with no one score capturing every capability.",
    frontend: {
      en: "Explore different patterns of cognitive strengths and learning needs.",
    },
  },
});
