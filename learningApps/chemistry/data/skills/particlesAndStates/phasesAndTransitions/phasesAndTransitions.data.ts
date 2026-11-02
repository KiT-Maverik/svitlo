import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { condensation_Skill_Data, deposition_Skill_Data, freezing_Skill_Data, gases_Skill_Data, liquids_Skill_Data, melting_Skill_Data, solids_Skill_Data, sublimation_Skill_Data, vaporization_Skill_Data } from './skills';

export const phasesAndTransitions_SkillGroup_Data = buildSkillGroupConfig({
  slug: "phasesAndTransitions",
  id: "51cc7e1f-3937-449c-89e2-a3ed4d10cf28",
  name: {
    en: "Phases and Transitions",
  },
  skills: {
    condensation: condensation_Skill_Data,
    deposition: deposition_Skill_Data,
    freezing: freezing_Skill_Data,
    gases: gases_Skill_Data,
    liquids: liquids_Skill_Data,
    melting: melting_Skill_Data,
    solids: solids_Skill_Data,
    sublimation: sublimation_Skill_Data,
    vaporization: vaporization_Skill_Data,
  },
  description: {
    methodological: "The balance of particle interactions and thermal motion changes whether matter forms a solid, liquid or gas.",
    frontend: {
      en: "Discover what happens to particles when matter changes between solid, liquid and gas.",
    },
  },
});
