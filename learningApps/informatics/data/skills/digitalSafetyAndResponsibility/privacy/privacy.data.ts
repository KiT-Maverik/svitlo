import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { chooseSafeDataSharingMethods_Skill_Data, distinguishAPrivateChatFromAPublicLink_Skill_Data, explainDataReIdentification_Skill_Data, identifyPersonalData_Skill_Data, recognizeADigitalFootprint_Skill_Data } from './skills';

export const privacy_SkillGroup_Data = buildSkillGroupConfig({
  slug: "privacy",
  id: "d423d3ee-86b0-4df8-9541-fe6dd83cb0ba",
  name: {
    en: "Privacy",
  },
  skills: {
    chooseSafeDataSharingMethods: chooseSafeDataSharingMethods_Skill_Data,
    distinguishAPrivateChatFromAPublicLink: distinguishAPrivateChatFromAPublicLink_Skill_Data,
    explainDataReIdentification: explainDataReIdentification_Skill_Data,
    identifyPersonalData: identifyPersonalData_Skill_Data,
    recognizeADigitalFootprint: recognizeADigitalFootprint_Skill_Data,
  },
  description: {
    methodological: "Identifying personal information, deciding who may receive it, and evaluating long-term consequences of disclosure. Privacy is not identical to password protection or responding to fraud.",
    frontend: {
      en: "Discover how sharing information online can affect privacy.",
    },
  },
});
