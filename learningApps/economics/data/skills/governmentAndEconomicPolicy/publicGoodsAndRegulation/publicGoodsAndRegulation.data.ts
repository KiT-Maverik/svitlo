import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { competitionPolicy_Skill_Data, externalities_Skill_Data, governmentFailure_Skill_Data, publicGoods_Skill_Data } from './skills';

export const publicGoodsAndRegulation_SkillGroup_Data = buildSkillGroupConfig({
  slug: "publicGoodsAndRegulation",
  id: "c9ef1548-14c3-4f82-a89d-96b77b45690a",
  name: {
    en: "Суспільні блага та регулювання",
  },
  skills: {
    competitionPolicy: competitionPolicy_Skill_Data,
    externalities: externalities_Skill_Data,
    governmentFailure: governmentFailure_Skill_Data,
    publicGoods: publicGoods_Skill_Data,
  },
  description: {
    methodological: "Not every beneficial service can be efficiently supplied through individual market transactions; regulation also has limitations.",
    frontend: {
      en: "Discover why some needs call for collective provision or regulation.",
    },
  },
});
