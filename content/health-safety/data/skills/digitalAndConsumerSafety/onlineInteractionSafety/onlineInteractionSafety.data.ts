import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  manageADigitalFootprint_Skill_Data,
  protectAgainstOnlineSexualExploitation_Skill_Data,
  recognizeTechnologyFacilitatedHarassment_Skill_Data,
  respondToHarmfulOnlineContact_Skill_Data,
} from './skills';

export const onlineInteractionSafety_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'onlineInteractionSafety',
  id: '8167e596-e4d8-43f1-b31f-a33b819e8580',
  name: {
    en: 'Online Interaction Safety',
  },
  skills: {
    manageADigitalFootprint: manageADigitalFootprint_Skill_Data,
    protectAgainstOnlineSexualExploitation: protectAgainstOnlineSexualExploitation_Skill_Data,
    recognizeTechnologyFacilitatedHarassment: recognizeTechnologyFacilitatedHarassment_Skill_Data,
    respondToHarmfulOnlineContact: respondToHarmfulOnlineContact_Skill_Data,
  },
  description: {
    methodological:
      'Digital abuse can extend beyond the screen; protective responses should prioritize personal safety, consent, and trustworthy reporting channels.',
    frontend: {
      en: 'Discover how to respond to harmful interactions in digital spaces.',
    },
  },
});
