import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { atmosphericChemicalChanges_Skill_Data, carbonChemistryInTheEnvironment_Skill_Data, compositionOfAir_Skill_Data, waterAsASolvent_Skill_Data, waterContaminants_Skill_Data } from './skills';

export const airAndWater_SkillGroup_Data = buildSkillGroupConfig({
  slug: "airAndWater",
  id: "10df20fa-e7a4-4b8f-9509-35ed6266c32f",
  name: {
    en: "Air and Water",
  },
  skills: {
    atmosphericChemicalChanges: atmosphericChemicalChanges_Skill_Data,
    carbonChemistryInTheEnvironment: carbonChemistryInTheEnvironment_Skill_Data,
    compositionOfAir: compositionOfAir_Skill_Data,
    waterAsASolvent: waterAsASolvent_Skill_Data,
    waterContaminants: waterContaminants_Skill_Data,
  },
  description: {
    methodological: "Environmental samples contain reacting or partitioning chemical species whose measurements require attention to concentration and chemical form.",
    frontend: {
      en: "Investigate the chemistry of air and water, including pollutants and dissolved materials.",
    },
  },
});
