import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeAMetaphysicalParadox_Skill_Data, analyzeAPartWholeRelation_Skill_Data, distinguishNumericalFromQualitativeIdentity_Skill_Data, evaluatePersistenceThroughChange_Skill_Data } from './skills';

export const identityAndPersistence_SkillGroup_Data = buildSkillGroupConfig({
  slug: "identityAndPersistence",
  id: "4d374e80-7388-41a9-9cc7-31e3177e554a",
  name: {
    en: "Identity and Persistence",
  },
  skills: {
    analyzeAMetaphysicalParadox: analyzeAMetaphysicalParadox_Skill_Data,
    analyzeAPartWholeRelation: analyzeAPartWholeRelation_Skill_Data,
    distinguishNumericalFromQualitativeIdentity: distinguishNumericalFromQualitativeIdentity_Skill_Data,
    evaluatePersistenceThroughChange: evaluatePersistenceThroughChange_Skill_Data,
  },
  description: {
    methodological: "Questions about sameness arise when material, properties, or relations change over time. Numerical identity is different from merely sharing characteristics.",
    frontend: {
      en: "Ask what makes something remain the same thing through change.",
    },
  },
});
