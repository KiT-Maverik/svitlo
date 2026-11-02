import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { careForMinorWounds_Skill_Data, controlExternalBleeding_Skill_Data, immobilizeSuspectedFractures_Skill_Data, recognizeHeadAndSpinalInjuryDanger_Skill_Data, useATourniquetWhenIndicated_Skill_Data } from './skills';

export const bleedingAndInjuries_SkillGroup_Data = buildSkillGroupConfig({
  slug: "bleedingAndInjuries",
  id: "ff7d232f-f7fc-4e88-b254-f5474e11e8f4",
  name: {
    en: "Bleeding and Injuries",
  },
  skills: {
    careForMinorWounds: careForMinorWounds_Skill_Data,
    controlExternalBleeding: controlExternalBleeding_Skill_Data,
    immobilizeSuspectedFractures: immobilizeSuspectedFractures_Skill_Data,
    recognizeHeadAndSpinalInjuryDanger: recognizeHeadAndSpinalInjuryDanger_Skill_Data,
    useATourniquetWhenIndicated: useATourniquetWhenIndicated_Skill_Data,
  },
  description: {
    methodological: "First aid aims to prevent immediate deterioration while avoiding unnecessary manipulation or delay in definitive medical care.",
    frontend: {
      en: "Learn ways to limit injury and external bleeding while awaiting professional care.",
    },
  },
});
