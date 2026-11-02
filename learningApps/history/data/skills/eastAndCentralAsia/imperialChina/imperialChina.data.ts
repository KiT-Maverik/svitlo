import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { ancientChineseMetallurgy_Skill_Data, fallOfHanAndSuccessorStates_Skill_Data, hanDynasty_Skill_Data, papermakingInAncientChina_Skill_Data, qinEmpire_Skill_Data } from './skills';

export const imperialChina_SkillGroup_Data = buildSkillGroupConfig({
  slug: "imperialChina",
  id: "54400f62-60bd-47bf-80b8-4e6d1e2433a8",
  name: {
    en: "Імперський Китай",
  },
  skills: {
    ancientChineseMetallurgy: ancientChineseMetallurgy_Skill_Data,
    fallOfHanAndSuccessorStates: fallOfHanAndSuccessorStates_Skill_Data,
    hanDynasty: hanDynasty_Skill_Data,
    papermakingInAncientChina: papermakingInAncientChina_Skill_Data,
    qinEmpire: qinEmpire_Skill_Data,
  },
  description: {
    methodological: "Territorial unification prompted administrative standardization and debate about rule.",
    frontend: {
      en: "Explore how Chinese dynasties governed large territories.",
    },
  },
});
