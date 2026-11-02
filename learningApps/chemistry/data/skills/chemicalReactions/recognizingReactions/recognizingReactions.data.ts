import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { reactantsAndProducts_Skill_Data, reactionEvidence_Skill_Data } from './skills';

export const recognizingReactions_SkillGroup_Data = buildSkillGroupConfig({
  slug: "recognizingReactions",
  id: "1df643cc-b4df-4406-a2c4-171a6e71a12b",
  name: {
    en: "Recognizing Reactions",
  },
  skills: {
    reactantsAndProducts: reactantsAndProducts_Skill_Data,
    reactionEvidence: reactionEvidence_Skill_Data,
  },
  description: {
    methodological: "Recognizing chemical change requires identifying initial and resulting chemical species and examining observations critically rather than treating any visible sign as proof.",
    frontend: {
      en: "Learn how observations can support a conclusion that a reaction occurred.",
    },
  },
});
