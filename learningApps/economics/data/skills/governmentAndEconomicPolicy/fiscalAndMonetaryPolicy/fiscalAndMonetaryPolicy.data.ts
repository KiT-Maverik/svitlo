import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { automaticStabilizers_Skill_Data, fiscalStabilization_Skill_Data, monetaryPolicy_Skill_Data, monetaryTransmissionMechanism_Skill_Data } from './skills';

export const fiscalAndMonetaryPolicy_SkillGroup_Data = buildSkillGroupConfig({
  slug: "fiscalAndMonetaryPolicy",
  id: "819537f2-e856-4b72-8f39-1d508d9c63d2",
  name: {
    en: "Фіскальна та монетарна політика",
  },
  skills: {
    automaticStabilizers: automaticStabilizers_Skill_Data,
    fiscalStabilization: fiscalStabilization_Skill_Data,
    monetaryPolicy: monetaryPolicy_Skill_Data,
    monetaryTransmissionMechanism: monetaryTransmissionMechanism_Skill_Data,
  },
  description: {
    methodological: "Macroeconomic stabilization employs budget decisions and central-bank instruments, both subject to delays.",
    frontend: {
      en: "Compare the main tools used to support economic stability.",
    },
  },
});
