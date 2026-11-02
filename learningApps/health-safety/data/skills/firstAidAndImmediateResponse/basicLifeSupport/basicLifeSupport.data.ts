import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { automatedExternalDefibrillatorUse_Skill_Data, cardiopulmonaryResuscitation_Skill_Data, firstAidForChoking_Skill_Data } from './skills';

export const basicLifeSupport_SkillGroup_Data = buildSkillGroupConfig({
  slug: "basicLifeSupport",
  id: "64beb776-f80c-4418-a58c-f20d1ba281e3",
  name: {
    en: "Basic Life Support",
  },
  skills: {
    automatedExternalDefibrillatorUse: automatedExternalDefibrillatorUse_Skill_Data,
    cardiopulmonaryResuscitation: cardiopulmonaryResuscitation_Skill_Data,
    firstAidForChoking: firstAidForChoking_Skill_Data,
  },
  description: {
    methodological: "Resuscitation competencies require validated techniques and updated guidance appropriate to the person's age, circumstances, and responder training.",
    frontend: {
      en: "Explore recognized methods of basic life support within current training.",
    },
  },
});
