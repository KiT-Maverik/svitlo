import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainDictionaryStructure_Skill_Data, retrieveADictionaryValueByKey_Skill_Data, updateADictionaryValue_Skill_Data } from './skills';

export const dictionaries_SkillGroup_Data = buildSkillGroupConfig({
  slug: "dictionaries",
  id: "e81d7460-8e28-4a77-bdce-86467b907bbb",
  name: {
    en: "Dictionaries",
  },
  skills: {
    explainDictionaryStructure: explainDictionaryStructure_Skill_Data,
    retrieveADictionaryValueByKey: retrieveADictionaryValueByKey_Skill_Data,
    updateADictionaryValue: updateADictionaryValue_Skill_Data,
  },
  description: {
    methodological: "Key-to-value mappings supporting lookup, updates, and absent-key handling. A key need not be a positional sequence index.",
    frontend: {
      en: "Discover how dictionaries connect unique keys with stored values.",
    },
  },
});
