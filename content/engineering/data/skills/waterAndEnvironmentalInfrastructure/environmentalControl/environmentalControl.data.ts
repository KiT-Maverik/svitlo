import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  airFiltrationEquipment_Skill_Data,
  contaminatedSiteRemediationEquipment_Skill_Data,
  industrialEmissionsControl_Skill_Data,
  solidWasteProcessingSystems_Skill_Data,
} from './skills';

export const environmentalControl_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'environmentalControl',
  id: 'd47a7ce9-4a6e-45d8-ae84-d6d132245266',
  name: {
    en: 'Environmental Control',
  },
  skills: {
    airFiltrationEquipment: airFiltrationEquipment_Skill_Data,
    contaminatedSiteRemediationEquipment: contaminatedSiteRemediationEquipment_Skill_Data,
    industrialEmissionsControl: industrialEmissionsControl_Skill_Data,
    solidWasteProcessingSystems: solidWasteProcessingSystems_Skill_Data,
  },
  description: {
    methodological:
      'Public environmental infrastructure also treats polluted air and solid waste. The engineering problem is selecting and integrating collection, containment and treatment equipment rather than merely recognizing that pollution exists.',
    frontend: {
      en: 'Learn how engineering systems reduce emissions and manage waste.',
    },
  },
});
