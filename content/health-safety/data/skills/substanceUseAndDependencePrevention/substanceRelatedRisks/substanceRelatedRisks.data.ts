import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  recognizeAlcoholRelatedRisks_Skill_Data,
  recognizeDrugRelatedRisks_Skill_Data,
  recognizeMedicineMisuse_Skill_Data,
  recognizeTobaccoAndNicotineRisks_Skill_Data,
} from './skills';

export const substanceRelatedRisks_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'substanceRelatedRisks',
  id: 'a5bdfa8f-8081-4d4f-8fc3-d5fa60482616',
  name: {
    en: 'Substance-Related Risks',
  },
  skills: {
    recognizeAlcoholRelatedRisks: recognizeAlcoholRelatedRisks_Skill_Data,
    recognizeDrugRelatedRisks: recognizeDrugRelatedRisks_Skill_Data,
    recognizeMedicineMisuse: recognizeMedicineMisuse_Skill_Data,
    recognizeTobaccoAndNicotineRisks: recognizeTobaccoAndNicotineRisks_Skill_Data,
  },
  description: {
    methodological:
      'Effects depend on the substance, amount, context, interactions, and vulnerability; legal availability does not imply harmlessness.',
    frontend: {
      en: 'Explore how substance effects and risks vary with circumstances.',
    },
  },
});
