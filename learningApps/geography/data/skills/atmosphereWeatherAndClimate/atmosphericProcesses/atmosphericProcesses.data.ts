import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainHowCloudsForm_Skill_Data, explainHowPrecipitationForms_Skill_Data, explainTheFormationOfWind_Skill_Data, interpretTheMovementOfAirMassesAndFronts_Skill_Data } from './skills';

export const atmosphericProcesses_SkillGroup_Data = buildSkillGroupConfig({
  slug: "atmosphericProcesses",
  id: "b9903371-5457-474d-bfc1-6d2d020aff6a",
  name: {
    en: "Atmospheric Processes",
  },
  skills: {
    explainHowCloudsForm: explainHowCloudsForm_Skill_Data,
    explainHowPrecipitationForms: explainHowPrecipitationForms_Skill_Data,
    explainTheFormationOfWind: explainTheFormationOfWind_Skill_Data,
    interpretTheMovementOfAirMassesAndFronts: interpretTheMovementOfAirMassesAndFronts_Skill_Data,
  },
  description: {
    methodological: "Water vapor, atmospheric pressure differences, moving air masses and energy exchanges explain the geographic formation and movement of weather systems. The focus is observable and spatially significant processes rather than equations of fluid mechanics.",
    frontend: {
      en: "Discover what causes clouds, rainfall, wind and changing weather systems.",
    },
  },
});
