import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  chooseEvacuationOrShelter_Skill_Data,
  evacuateSafely_Skill_Data,
  shelterDuringImmediateDanger_Skill_Data,
} from './skills';

export const evacuationAndShelter_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'evacuationAndShelter',
  id: '4ef54213-b85b-4baf-a32b-832493ff721f',
  name: {
    en: 'Evacuation and Shelter',
  },
  skills: {
    chooseEvacuationOrShelter: chooseEvacuationOrShelter_Skill_Data,
    evacuateSafely: evacuateSafely_Skill_Data,
    shelterDuringImmediateDanger: shelterDuringImmediateDanger_Skill_Data,
  },
  description: {
    methodological:
      'The correct protective action may be evacuation or remaining under cover, depending on the hazard and official guidance.',
    frontend: {
      en: 'Explore when staying in shelter is safer than evacuating.',
    },
  },
});
