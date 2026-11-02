import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { chooseProtectiveMeasures_Skill_Data, evaluateInjuryRisk_Skill_Data, identifyHazardsInAnEnvironment_Skill_Data, respondToUnsafeConditions_Skill_Data } from './skills';

export const hazardRecognitionAndPrevention_SkillGroup_Data = buildSkillGroupConfig({
  slug: "hazardRecognitionAndPrevention",
  id: "6760472c-84fa-40a3-af0c-044476a1a3c4",
  name: {
    en: "Hazard Recognition and Prevention",
  },
  skills: {
    chooseProtectiveMeasures: chooseProtectiveMeasures_Skill_Data,
    evaluateInjuryRisk: evaluateInjuryRisk_Skill_Data,
    identifyHazardsInAnEnvironment: identifyHazardsInAnEnvironment_Skill_Data,
    respondToUnsafeConditions: respondToUnsafeConditions_Skill_Data,
  },
  description: {
    methodological: "Risk management involves identifying possible harm, checking exposure, and favouring elimination or protective controls over mere caution.",
    frontend: {
      en: "Discover how to assess and reduce dangers before an accident happens.",
    },
  },
});
