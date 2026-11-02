import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { coordinateChangesInASharedDigitalProject_Skill_Data, explainContributionGuidelines_Skill_Data, trackDigitalProductVersions_Skill_Data } from './skills';

export const collaborativeDigitalProductDevelopment_SkillGroup_Data = buildSkillGroupConfig({
  slug: "collaborativeDigitalProductDevelopment",
  id: "e7f67d8b-7f3a-4a06-b69e-319330212afe",
  name: {
    en: "Collaborative Digital Product Development",
  },
  skills: {
    coordinateChangesInASharedDigitalProject: coordinateChangesInASharedDigitalProject_Skill_Data,
    explainContributionGuidelines: explainContributionGuidelines_Skill_Data,
    trackDigitalProductVersions: trackDigitalProductVersions_Skill_Data,
  },
  description: {
    methodological: "Joint development requires agreed contribution and review rules, coordination among contributors, and tracking versions. Collaboration applies to public and private repositories and does not itself determine licensing.",
    frontend: {
      en: "Explore how teams organize contributions, reviews and project versions.",
    },
  },
});
