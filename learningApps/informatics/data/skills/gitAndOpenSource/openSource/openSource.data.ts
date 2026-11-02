import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishOpenSourceFromPubliclyVisibleCode_Skill_Data, explainOpenSource_Skill_Data } from './skills';

export const openSource_SkillGroup_Data = buildSkillGroupConfig({
  slug: "openSource",
  id: "38319e39-b1af-439e-b6cf-15e209470aff",
  name: {
    en: "Open Source",
  },
  skills: {
    distinguishOpenSourceFromPubliclyVisibleCode: distinguishOpenSourceFromPubliclyVisibleCode_Skill_Data,
    explainOpenSource: explainOpenSource_Skill_Data,
  },
  description: {
    methodological: "Software openness depends not only on visibility of source code but also on rights to use, modify, and distribute it.",
    frontend: {
      en: "Discover what permissions make software genuinely open source.",
    },
  },
});
