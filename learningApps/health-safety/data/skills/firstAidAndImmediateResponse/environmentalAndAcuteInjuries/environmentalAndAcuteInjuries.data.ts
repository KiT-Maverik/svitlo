import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  firstAidForChemicalExposure_Skill_Data,
  firstAidForThermalBurns_Skill_Data,
  provideFirstAidAfterDrowning_Skill_Data,
  respondToHeatIllness_Skill_Data,
  respondToHypothermia_Skill_Data,
} from './skills';

export const environmentalAndAcuteInjuries_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'environmentalAndAcuteInjuries',
  id: 'd7576a20-a73f-4949-9312-29ff843b80a3',
  name: {
    en: 'Environmental and Acute Injuries',
  },
  skills: {
    firstAidForChemicalExposure: firstAidForChemicalExposure_Skill_Data,
    firstAidForThermalBurns: firstAidForThermalBurns_Skill_Data,
    provideFirstAidAfterDrowning: provideFirstAidAfterDrowning_Skill_Data,
    respondToHeatIllness: respondToHeatIllness_Skill_Data,
    respondToHypothermia: respondToHypothermia_Skill_Data,
  },
  description: {
    methodological:
      "Temperature, substances, and water exposure can rapidly worsen an individual's condition and demand hazard-specific first aid.",
    frontend: {
      en: 'Discover safer responses to burns, exposure, temperature emergencies and drowning.',
    },
  },
});
