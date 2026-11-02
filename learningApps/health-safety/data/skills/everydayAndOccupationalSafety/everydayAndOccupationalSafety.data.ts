import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { electricityFireAndGas_SkillGroup_Data } from './electricityFireAndGas/electricityFireAndGas.data';
import { hazardRecognitionAndPrevention_SkillGroup_Data } from './hazardRecognitionAndPrevention/hazardRecognitionAndPrevention.data';
import { householdHazards_SkillGroup_Data } from './householdHazards/householdHazards.data';
import { personalSafetyInPublicPlaces_SkillGroup_Data } from './personalSafetyInPublicPlaces/personalSafetyInPublicPlaces.data';
import { toolsAndWorkplaces_SkillGroup_Data } from './toolsAndWorkplaces/toolsAndWorkplaces.data';

export const everydayAndOccupationalSafety_SkillDomain_Data = buildSkillDomainConfig({
  slug: "everydayAndOccupationalSafety",
  id: "49caa4a6-5c6a-4991-b835-737798296f1a",
  name: {
    en: "Everyday and Occupational Safety",
  },
  groups: {
    electricityFireAndGas: electricityFireAndGas_SkillGroup_Data,
    hazardRecognitionAndPrevention: hazardRecognitionAndPrevention_SkillGroup_Data,
    householdHazards: householdHazards_SkillGroup_Data,
    personalSafetyInPublicPlaces: personalSafetyInPublicPlaces_SkillGroup_Data,
    toolsAndWorkplaces: toolsAndWorkplaces_SkillGroup_Data,
  },
  description: {
    methodological: "Injuries often arise from foreseeable hazards in homes, workplaces, educational spaces, and public facilities. Preventive controls and safe equipment use take priority over reacting after an incident.",
    frontend: {
      en: "Learn to identify and prevent everyday hazards at home, school and work.",
    },
  },
});
