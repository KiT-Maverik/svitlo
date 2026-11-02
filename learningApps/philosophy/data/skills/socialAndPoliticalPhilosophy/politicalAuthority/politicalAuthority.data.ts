import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeCivilDisobedience_Skill_Data, compareSocialContractArguments_Skill_Data, evaluateTheLegitimacyOfPoliticalAuthority_Skill_Data, evaluateTheLimitsOfStateCoercion_Skill_Data } from './skills';

export const politicalAuthority_SkillGroup_Data = buildSkillGroupConfig({
  slug: "politicalAuthority",
  id: "e6aae331-0352-41f5-a7e3-fce6fcb3466b",
  name: {
    en: "Political Authority",
  },
  skills: {
    analyzeCivilDisobedience: analyzeCivilDisobedience_Skill_Data,
    compareSocialContractArguments: compareSocialContractArguments_Skill_Data,
    evaluateTheLegitimacyOfPoliticalAuthority: evaluateTheLegitimacyOfPoliticalAuthority_Skill_Data,
    evaluateTheLimitsOfStateCoercion: evaluateTheLimitsOfStateCoercion_Skill_Data,
  },
  description: {
    methodological: "Institutions exercise collective power that requires justification. Political legitimacy, coercion, and obedience are distinct concepts.",
    frontend: {
      en: "Examine what makes political authority legitimate rather than merely powerful.",
    },
  },
});
