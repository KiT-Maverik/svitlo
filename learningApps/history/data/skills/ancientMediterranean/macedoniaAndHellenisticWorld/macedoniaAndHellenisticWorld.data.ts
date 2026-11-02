import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { conquestsOfAlexander_Skill_Data, hellenisticKingdoms_Skill_Data, riseOfMacedonia_Skill_Data } from './skills';

export const macedoniaAndHellenisticWorld_SkillGroup_Data = buildSkillGroupConfig({
  slug: "macedoniaAndHellenisticWorld",
  id: "78005c99-235d-4d1d-a852-bf5da04b7266",
  name: {
    en: "Македонія та елліністичний світ",
  },
  skills: {
    conquestsOfAlexander: conquestsOfAlexander_Skill_Data,
    hellenisticKingdoms: hellenisticKingdoms_Skill_Data,
    riseOfMacedonia: riseOfMacedonia_Skill_Data,
  },
  description: {
    methodological: "Macedon's rise, Alexander's campaigns, and successor kingdoms transformed Balkan, Egyptian, and Asian politics and exchanges.",
    frontend: {
      en: "Explore the empires and cultures of the Hellenistic world.",
    },
  },
});
