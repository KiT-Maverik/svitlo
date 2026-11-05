import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  designErrorResistantControls_Skill_Data,
  evaluatePhysicalControlDiscoverability_Skill_Data,
  evaluatePhysicalFeedback_Skill_Data,
  testPhysicalProductUsability_Skill_Data,
} from './skills';

export const physicalInteraction_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'physicalInteraction',
  id: 'b0b71eb9-2627-4b2e-b4d1-49193af0ecd4',
  name: {
    en: 'Physical Interaction',
  },
  skills: {
    designErrorResistantControls: designErrorResistantControls_Skill_Data,
    evaluatePhysicalControlDiscoverability: evaluatePhysicalControlDiscoverability_Skill_Data,
    evaluatePhysicalFeedback: evaluatePhysicalFeedback_Skill_Data,
    testPhysicalProductUsability: testPhysicalProductUsability_Skill_Data,
  },
  description: {
    methodological:
      'Users should perceive the purpose of controls and the effects of their actions through appropriately designed physical cues.',
    frontend: {
      en: 'Learn to improve how people discover and operate physical controls.',
    },
  },
});
