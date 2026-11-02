import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { communityInterventionEvaluation_Skill_Data, environmentalBehaviorChange_Skill_Data, mediaInfluenceOnJudgment_Skill_Data, socialNormsInCommunities_Skill_Data } from './skills';

export const communityMediaAndEnvironment_SkillGroup_Data = buildSkillGroupConfig({
  slug: "communityMediaAndEnvironment",
  id: "30c6d257-06ff-4f6b-af90-2a48e96a6d3b",
  name: {
    en: "Community, Media, and Environment",
  },
  skills: {
    communityInterventionEvaluation: communityInterventionEvaluation_Skill_Data,
    environmentalBehaviorChange: environmentalBehaviorChange_Skill_Data,
    mediaInfluenceOnJudgment: mediaInfluenceOnJudgment_Skill_Data,
    socialNormsInCommunities: socialNormsInCommunities_Skill_Data,
  },
  description: {
    methodological: "Social structures and mediated information influence beliefs, cooperation, and behavior beyond a single interpersonal exchange.",
    frontend: {
      en: "Explore how media and community conditions shape shared behavior and beliefs.",
    },
  },
});
