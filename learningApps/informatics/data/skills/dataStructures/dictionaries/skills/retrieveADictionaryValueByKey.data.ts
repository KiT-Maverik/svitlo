import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const retrieveADictionaryValueByKey_Skill_Data = buildSkillConfig({
  slug: "retrieveADictionaryValueByKey",
  id: "bf2634f6-d58d-4e0b-8c25-61d0bb362eb3",
  name: {
    en: "Retrieve a Dictionary Value by Key",
  },
  description: {
    methodological: "Find an entry using its key and handle the case in which the key does not exist.",
    frontend: {
      en: "Find a dictionary value by key and handle a missing key.",
    },
  },
});
