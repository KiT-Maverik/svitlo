import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { comparePhilosophicalAccountsOfTime_Skill_Data, distinguishCausationFromTemporalSuccession_Skill_Data, distinguishPossibilityFromNecessity_Skill_Data, evaluateACounterfactualClaim_Skill_Data } from './skills';

export const causationTimeAndPossibility_SkillGroup_Data = buildSkillGroupConfig({
  slug: "causationTimeAndPossibility",
  id: "0a0eec2f-b437-468f-9aad-d19d755aeac5",
  name: {
    en: "Causation, Time, and Possibility",
  },
  skills: {
    comparePhilosophicalAccountsOfTime: comparePhilosophicalAccountsOfTime_Skill_Data,
    distinguishCausationFromTemporalSuccession: distinguishCausationFromTemporalSuccession_Skill_Data,
    distinguishPossibilityFromNecessity: distinguishPossibilityFromNecessity_Skill_Data,
    evaluateACounterfactualClaim: evaluateACounterfactualClaim_Skill_Data,
  },
  description: {
    methodological: "Metaphysical inquiry asks what causal dependence means and how temporal or modal claims relate beyond specific measurements.",
    frontend: {
      en: "Examine philosophical ideas about cause, time and what could have happened.",
    },
  },
});
