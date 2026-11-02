import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { communityMediaAndEnvironment_SkillGroup_Data } from './communityMediaAndEnvironment/communityMediaAndEnvironment.data';
import { healthBehavior_SkillGroup_Data } from './healthBehavior/healthBehavior.data';
import { humanFactorsAndUserResearch_SkillGroup_Data } from './humanFactorsAndUserResearch/humanFactorsAndUserResearch.data';
import { learningEnvironments_SkillGroup_Data } from './learningEnvironments/learningEnvironments.data';
import { workAndOrganizations_SkillGroup_Data } from './workAndOrganizations/workAndOrganizations.data';

export const appliedPsychology_SkillDomain_Data = buildSkillDomainConfig({
  slug: "appliedPsychology",
  id: "68fe1f06-3d3d-4bfb-9328-0a3a0c41f585",
  name: {
    en: "Applied Psychology",
  },
  groups: {
    communityMediaAndEnvironment: communityMediaAndEnvironment_SkillGroup_Data,
    healthBehavior: healthBehavior_SkillGroup_Data,
    humanFactorsAndUserResearch: humanFactorsAndUserResearch_SkillGroup_Data,
    learningEnvironments: learningEnvironments_SkillGroup_Data,
    workAndOrganizations: workAndOrganizations_SkillGroup_Data,
  },
  description: {
    methodological: "Psychological knowledge informs educational, occupational, health, design, and community settings. Applications translate evidence about people into context-sensitive decisions without claiming that a single intervention suits everyone.",
    frontend: {
      en: "Explore how psychological evidence informs education, workplaces, health and communities.",
    },
  },
});
