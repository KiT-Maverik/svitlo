import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { additionReactions_Skill_Data, condensationReactions_Skill_Data, eliminationReactions_Skill_Data, substitutionReactions_Skill_Data } from './skills';

export const organicTransformations_SkillGroup_Data = buildSkillGroupConfig({
  slug: "organicTransformations",
  id: "f7370042-d159-4356-8d61-a5bc7c07220e",
  name: {
    en: "Organic Transformations",
  },
  skills: {
    additionReactions: additionReactions_Skill_Data,
    condensationReactions: condensationReactions_Skill_Data,
    eliminationReactions: eliminationReactions_Skill_Data,
    substitutionReactions: substitutionReactions_Skill_Data,
  },
  description: {
    methodological: "Reaction family patterns link starting functional groups to plausible products while requiring mechanistic and condition-specific reasoning.",
    frontend: {
      en: "Discover common patterns of change in organic reactions.",
    },
  },
});
