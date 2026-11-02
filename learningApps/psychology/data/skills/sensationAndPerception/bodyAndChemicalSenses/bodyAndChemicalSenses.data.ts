import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { painPerception_Skill_Data, proprioception_Skill_Data, smellPerception_Skill_Data, tastePerception_Skill_Data, touchPerception_Skill_Data, vestibularPerception_Skill_Data } from './skills';

export const bodyAndChemicalSenses_SkillGroup_Data = buildSkillGroupConfig({
  slug: "bodyAndChemicalSenses",
  id: "ee083ba9-b013-4800-9ef2-bded6317d32b",
  name: {
    en: "Body and Chemical Senses",
  },
  skills: {
    painPerception: painPerception_Skill_Data,
    proprioception: proprioception_Skill_Data,
    smellPerception: smellPerception_Skill_Data,
    tastePerception: tastePerception_Skill_Data,
    touchPerception: touchPerception_Skill_Data,
    vestibularPerception: vestibularPerception_Skill_Data,
  },
  description: {
    methodological: "Touch, pain, balance, body position, smell, and taste rely on partly distinct receptor and processing pathways. Their psychological importance lies in how signals become conscious experiences and guide action, not in cataloguing anatomy alone.",
    frontend: {
      en: "Explore how touch, pain, smell, taste and body senses guide experience.",
    },
  },
});
