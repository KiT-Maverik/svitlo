import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { everydayCopingAndAssistance_SkillGroup_Data } from './everydayCopingAndAssistance/everydayCopingAndAssistance.data';
import { mentalHealthCrises_SkillGroup_Data } from './mentalHealthCrises/mentalHealthCrises.data';
import { recognizingStrain_SkillGroup_Data } from './recognizingStrain/recognizingStrain.data';

export const mentalWellBeingAndSupport_SkillDomain_Data = buildSkillDomainConfig({
  slug: 'mentalWellBeingAndSupport',
  id: 'e64b92de-dd2d-4f80-ab3e-9d6f1e7577e7',
  name: {
    en: 'Mental Well-being and Support',
  },
  groups: {
    everydayCopingAndAssistance: everydayCopingAndAssistance_SkillGroup_Data,
    mentalHealthCrises: mentalHealthCrises_SkillGroup_Data,
    recognizingStrain: recognizingStrain_SkillGroup_Data,
  },
  description: {
    methodological:
      'Health protection includes noticing psychological strain, choosing supportive coping strategies, and connecting people with qualified help. The psychological mechanisms of emotion and cognition belong principally to Psychology.',
    frontend: {
      en: 'Learn to notice emotional strain, seek support and respond safely to crises.',
    },
  },
});
