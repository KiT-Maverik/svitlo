import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { controlledUseOfFire_Skill_Data, earlyHumanCooperation_Skill_Data, foragingEconomies_Skill_Data, prehistoricSymbolicCulture_Skill_Data, stoneToolTechnologies_Skill_Data } from './skills';

export const hunterGathererSocieties_SkillGroup_Data = buildSkillGroupConfig({
  slug: "hunterGathererSocieties",
  id: "76a6db8b-eb77-431d-91a3-6d30fc104bf7",
  name: {
    en: "Мисливці та збирачі",
  },
  skills: {
    controlledUseOfFire: controlledUseOfFire_Skill_Data,
    earlyHumanCooperation: earlyHumanCooperation_Skill_Data,
    foragingEconomies: foragingEconomies_Skill_Data,
    prehistoricSymbolicCulture: prehistoricSymbolicCulture_Skill_Data,
    stoneToolTechnologies: stoneToolTechnologies_Skill_Data,
  },
  description: {
    methodological: "Mobile and semi-sedentary societies used varied ecological niches, tools, and social arrangements.",
    frontend: {
      en: "Explore life in communities that hunted, fished and gathered food.",
    },
  },
});
