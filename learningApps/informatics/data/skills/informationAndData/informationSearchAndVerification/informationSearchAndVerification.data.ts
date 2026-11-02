import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compareInformationSources_Skill_Data, distinguishMessagesFromData_Skill_Data, formulateAnInformationQuery_Skill_Data, verifyAClaimAgainstASource_Skill_Data } from './skills';

export const informationSearchAndVerification_SkillGroup_Data = buildSkillGroupConfig({
  slug: "informationSearchAndVerification",
  id: "9d222908-c5d9-4a48-9ae9-df8865d76f73",
  name: {
    en: "Information Search and Verification",
  },
  skills: {
    compareInformationSources: compareInformationSources_Skill_Data,
    distinguishMessagesFromData: distinguishMessagesFromData_Skill_Data,
    formulateAnInformationQuery: formulateAnInformationQuery_Skill_Data,
    verifyAClaimAgainstASource: verifyAClaimAgainstASource_Skill_Data,
  },
  description: {
    methodological: "Find relevant facts and determine whether independent sources support a particular claim. Formulating queries, comparing reports, and verifying facts are distinct operations.",
    frontend: {
      en: "Learn how to search for evidence and check whether a claim is supported.",
    },
  },
});
