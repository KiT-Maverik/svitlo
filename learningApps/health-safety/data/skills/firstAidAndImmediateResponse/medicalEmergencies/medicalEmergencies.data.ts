import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { recognizeSignsOfAHeartAttack_Skill_Data, recognizeSignsOfStroke_Skill_Data, respondToSeizures_Skill_Data, respondToSevereAllergicReaction_Skill_Data, respondToSevereBreathingDifficulty_Skill_Data, respondToSuspectedHypoglycaemia_Skill_Data, respondToSuspectedOpioidOverdose_Skill_Data, respondToSuspectedPoisoning_Skill_Data } from './skills';

export const medicalEmergencies_SkillGroup_Data = buildSkillGroupConfig({
  slug: "medicalEmergencies",
  id: "fae5a6bf-f81e-4142-bf4e-53866f75eb4d",
  name: {
    en: "Medical Emergencies",
  },
  skills: {
    recognizeSignsOfAHeartAttack: recognizeSignsOfAHeartAttack_Skill_Data,
    recognizeSignsOfStroke: recognizeSignsOfStroke_Skill_Data,
    respondToSeizures: respondToSeizures_Skill_Data,
    respondToSevereAllergicReaction: respondToSevereAllergicReaction_Skill_Data,
    respondToSevereBreathingDifficulty: respondToSevereBreathingDifficulty_Skill_Data,
    respondToSuspectedHypoglycaemia: respondToSuspectedHypoglycaemia_Skill_Data,
    respondToSuspectedOpioidOverdose: respondToSuspectedOpioidOverdose_Skill_Data,
    respondToSuspectedPoisoning: respondToSuspectedPoisoning_Skill_Data,
  },
  description: {
    methodological: "Prompt recognition and appropriate escalation are more important than attempting diagnosis or administering unfamiliar medication.",
    frontend: {
      en: "Learn warning signs that require a rapid medical emergency response.",
    },
  },
});
