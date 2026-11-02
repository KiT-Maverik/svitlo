import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { respondToUnsafeApproachesInPublic_Skill_Data, seekHelpWhenLostOrSeparated_Skill_Data } from './skills';

export const personalSafetyInPublicPlaces_SkillGroup_Data = buildSkillGroupConfig({
  slug: "personalSafetyInPublicPlaces",
  id: "cfe6de15-3b03-4c69-b8c6-dd343892a94c",
  name: {
    en: "Personal Safety in Public Places",
  },
  skills: {
    respondToUnsafeApproachesInPublic: respondToUnsafeApproachesInPublic_Skill_Data,
    seekHelpWhenLostOrSeparated: seekHelpWhenLostOrSeparated_Skill_Data,
  },
  description: {
    methodological: "Being approached by unknown people or separated from familiar companions calls for independent judgement about safe distance, exit options and trustworthy assistance, without assuming every unfamiliar person is dangerous.",
    frontend: {
      en: "Learn how to respond to uncomfortable encounters and separation in public.",
    },
  },
});
