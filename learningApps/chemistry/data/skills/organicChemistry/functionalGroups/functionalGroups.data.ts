import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { alcohols_Skill_Data, aldehydes_Skill_Data, amides_Skill_Data, amines_Skill_Data, carboxylicAcids_Skill_Data, esters_Skill_Data, ketones_Skill_Data } from './skills';

export const functionalGroups_SkillGroup_Data = buildSkillGroupConfig({
  slug: "functionalGroups",
  id: "94a44d15-8cac-4625-9fea-2a61f4d7a969",
  name: {
    en: "Functional Groups",
  },
  skills: {
    alcohols: alcohols_Skill_Data,
    aldehydes: aldehydes_Skill_Data,
    amides: amides_Skill_Data,
    amines: amines_Skill_Data,
    carboxylicAcids: carboxylicAcids_Skill_Data,
    esters: esters_Skill_Data,
    ketones: ketones_Skill_Data,
  },
  description: {
    methodological: "Different atom groups create families whose chemical behavior can be predicted more reliably than from molecular size alone.",
    frontend: {
      en: "Recognize functional groups that shape the behavior of organic compounds.",
    },
  },
});
