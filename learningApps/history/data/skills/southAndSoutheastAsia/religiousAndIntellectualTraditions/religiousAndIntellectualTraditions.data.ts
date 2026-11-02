import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { ancientIndianScience_Skill_Data, buddhismInAncientIndia_Skill_Data, earlyHinduTraditions_Skill_Data, jainism_Skill_Data } from './skills';

export const religiousAndIntellectualTraditions_SkillGroup_Data = buildSkillGroupConfig({
  slug: "religiousAndIntellectualTraditions",
  id: "306a08df-08ba-470b-88da-fdab77bf1904",
  name: {
    en: "Релігійні та інтелектуальні традиції",
  },
  skills: {
    ancientIndianScience: ancientIndianScience_Skill_Data,
    buddhismInAncientIndia: buddhismInAncientIndia_Skill_Data,
    earlyHinduTraditions: earlyHinduTraditions_Skill_Data,
    jainism: jainism_Skill_Data,
  },
  description: {
    methodological: "Teachings, texts, and schools evolved over centuries and spread far beyond the subcontinent.",
    frontend: {
      en: "Explore how ancient South Asian religious and intellectual ideas developed.",
    },
  },
});
