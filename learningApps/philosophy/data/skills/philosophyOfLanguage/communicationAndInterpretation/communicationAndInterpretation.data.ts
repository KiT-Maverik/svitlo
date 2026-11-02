import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishLiteralMeaningFromImplication_Skill_Data, evaluateContextualInterpretations_Skill_Data, identifyASpeechAct_Skill_Data } from './skills';

export const communicationAndInterpretation_SkillGroup_Data = buildSkillGroupConfig({
  slug: "communicationAndInterpretation",
  id: "c0c167ff-700f-4f23-97a7-f9dfe9fac1a6",
  name: {
    en: "Communication and Interpretation",
  },
  skills: {
    distinguishLiteralMeaningFromImplication: distinguishLiteralMeaningFromImplication_Skill_Data,
    evaluateContextualInterpretations: evaluateContextualInterpretations_Skill_Data,
    identifyASpeechAct: identifyASpeechAct_Skill_Data,
  },
  description: {
    methodological: "What a speaker says can differ from what a speaker conveys or does by saying it. Interpretation must take context and plausible alternatives into account.",
    frontend: {
      en: "Learn how context affects what people say and communicate.",
    },
  },
});
