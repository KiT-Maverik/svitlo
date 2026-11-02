import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { advertisingCampaign_Skill_Data, advertisingClaims_Skill_Data, advertisingEffectiveness_Skill_Data, advertisingObjectivesAndChannels_Skill_Data, sponsoredEndorsementsAndInfluencerAdvertising_Skill_Data } from './skills';

export const advertisingAndCommunications_SkillGroup_Data = buildSkillGroupConfig({
  slug: "advertisingAndCommunications",
  id: "177fda88-84e8-4f05-8ac7-94b98ea5a139",
  name: {
    en: "Реклама та комунікації",
  },
  skills: {
    advertisingCampaign: advertisingCampaign_Skill_Data,
    advertisingClaims: advertisingClaims_Skill_Data,
    advertisingEffectiveness: advertisingEffectiveness_Skill_Data,
    advertisingObjectivesAndChannels: advertisingObjectivesAndChannels_Skill_Data,
    sponsoredEndorsementsAndInfluencerAdvertising: sponsoredEndorsementsAndInfluencerAdvertising_Skill_Data,
  },
  description: {
    methodological: "Commercial messages can inform, remind, or persuade; effectiveness and truthfulness must be evaluated independently.",
    frontend: {
      en: "Learn how advertising communicates and how to judge its claims.",
    },
  },
});
