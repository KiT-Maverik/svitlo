import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { organizationalStressors_Skill_Data, personnelAssessmentFairness_Skill_Data, teamCoordination_Skill_Data, workMotivation_Skill_Data } from './skills';

export const workAndOrganizations_SkillGroup_Data = buildSkillGroupConfig({
  slug: "workAndOrganizations",
  id: "f03960a9-616f-4671-9cb9-dff1e7a7f208",
  name: {
    en: "Work and Organizations",
  },
  skills: {
    organizationalStressors: organizationalStressors_Skill_Data,
    personnelAssessmentFairness: personnelAssessmentFairness_Skill_Data,
    teamCoordination: teamCoordination_Skill_Data,
    workMotivation: workMotivation_Skill_Data,
  },
  description: {
    methodological: "Individual motivation, coordination, organizational culture, and workplace design shape performance and wellbeing at work.",
    frontend: {
      en: "Learn how psychology explains cooperation, stress and motivation at work.",
    },
  },
});
