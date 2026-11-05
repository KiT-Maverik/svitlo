import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  recognizeBullying_Skill_Data,
  recognizeDomesticAndSexualViolence_Skill_Data,
  recognizeHarassment_Skill_Data,
  respondSafelyToBullying_Skill_Data,
  seekProtectionAfterViolence_Skill_Data,
  supportAPersonAffectedByViolence_Skill_Data,
} from './skills';

export const violenceAndProtection_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'violenceAndProtection',
  id: 'e2d120cc-42ab-4840-b8da-275e385a5e6a',
  name: {
    en: 'Violence and Protection',
  },
  skills: {
    recognizeBullying: recognizeBullying_Skill_Data,
    recognizeDomesticAndSexualViolence: recognizeDomesticAndSexualViolence_Skill_Data,
    recognizeHarassment: recognizeHarassment_Skill_Data,
    respondSafelyToBullying: respondSafelyToBullying_Skill_Data,
    seekProtectionAfterViolence: seekProtectionAfterViolence_Skill_Data,
    supportAPersonAffectedByViolence: supportAPersonAffectedByViolence_Skill_Data,
  },
  description: {
    methodological:
      'Violence can be physical, psychological, sexual, economic, or digital; protection and reporting should avoid exposing affected people to retaliation.',
    frontend: {
      en: 'Recognize harmful behaviors and learn how to seek protection.',
    },
  },
});
