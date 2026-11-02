import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeAuthenticityAsAPhilosophicalConcept_Skill_Data, analyzeThePhilosophicalSignificanceOfMortality_Skill_Data, comparePhilosophicalAccountsOfMeaningInLife_Skill_Data, distinguishALifePurposeFromAPassingPreference_Skill_Data } from './skills';

export const humanExistenceAndMeaning_SkillGroup_Data = buildSkillGroupConfig({
  slug: "humanExistenceAndMeaning",
  id: "90504c2d-cce8-4feb-93fa-34689676c527",
  name: {
    en: "Human Existence and Meaning",
  },
  skills: {
    analyzeAuthenticityAsAPhilosophicalConcept: analyzeAuthenticityAsAPhilosophicalConcept_Skill_Data,
    analyzeThePhilosophicalSignificanceOfMortality: analyzeThePhilosophicalSignificanceOfMortality_Skill_Data,
    comparePhilosophicalAccountsOfMeaningInLife: comparePhilosophicalAccountsOfMeaningInLife_Skill_Data,
    distinguishALifePurposeFromAPassingPreference: distinguishALifePurposeFromAPassingPreference_Skill_Data,
  },
  description: {
    methodological: "Existential reflection examines how people understand purpose, authenticity, finitude, and commitments, without prescribing a single life ideal or substituting for mental-health care.",
    frontend: {
      en: "Explore philosophical approaches to living a meaningful and authentic life.",
    },
  },
});
