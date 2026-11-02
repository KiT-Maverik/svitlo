import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { chemicalReactorSystems_Skill_Data, industrialSeparationEquipment_Skill_Data, processContainment_Skill_Data, processHeatingSystems_Skill_Data } from './skills';

export const industrialProcessEquipment_SkillGroup_Data = buildSkillGroupConfig({
  slug: "industrialProcessEquipment",
  id: "249ccd27-a422-400a-9a7a-0e52bff8480d",
  name: {
    en: "Industrial Process Equipment",
  },
  skills: {
    chemicalReactorSystems: chemicalReactorSystems_Skill_Data,
    industrialSeparationEquipment: industrialSeparationEquipment_Skill_Data,
    processContainment: processContainment_Skill_Data,
    processHeatingSystems: processHeatingSystems_Skill_Data,
  },
  description: {
    methodological: "Process apparatus can separate mixtures, support controlled chemical transformations or maintain thermal conditions while containing potentially hazardous materials.",
    frontend: {
      en: "Discover equipment used to separate, react, heat and contain process materials.",
    },
  },
});
