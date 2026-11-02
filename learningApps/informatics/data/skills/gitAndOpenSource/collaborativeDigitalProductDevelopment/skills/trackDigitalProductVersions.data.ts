import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const trackDigitalProductVersions_Skill_Data = buildSkillConfig({
  slug: "trackDigitalProductVersions",
  id: "bb643b50-a138-463f-80f0-e99f320fee80",
  name: {
    en: "Track Digital Product Versions",
  },
  description: {
    methodological: "Compare successive file or project states, identify when changes appeared, and restore earlier saved versions where necessary. Multiple files labeled 'final2' do not necessarily form a transparent history.",
    frontend: {
      en: "Use version history to find when changes happened or restore earlier work.",
    },
  },
});
