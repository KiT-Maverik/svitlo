import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { classicalConditioning_Skill_Data, conditionedResponseAcquisition_Skill_Data, conditionedResponseExtinction_Skill_Data, spontaneousRecovery_Skill_Data, stimulusDiscrimination_Skill_Data, stimulusGeneralization_Skill_Data } from './skills';

export const respondentConditioning_SkillGroup_Data = buildSkillGroupConfig({
  slug: "respondentConditioning",
  id: "6e513523-15a7-4b60-adab-682df24ecd4a",
  name: {
    en: "Respondent Conditioning",
  },
  skills: {
    classicalConditioning: classicalConditioning_Skill_Data,
    conditionedResponseAcquisition: conditionedResponseAcquisition_Skill_Data,
    conditionedResponseExtinction: conditionedResponseExtinction_Skill_Data,
    spontaneousRecovery: spontaneousRecovery_Skill_Data,
    stimulusDiscrimination: stimulusDiscrimination_Skill_Data,
    stimulusGeneralization: stimulusGeneralization_Skill_Data,
  },
  description: {
    methodological: "Previously neutral cues can acquire the capacity to elicit responses through repeated relationships with consequential events.",
    frontend: {
      en: "Discover how associations between stimuli can produce learned responses.",
    },
  },
});
