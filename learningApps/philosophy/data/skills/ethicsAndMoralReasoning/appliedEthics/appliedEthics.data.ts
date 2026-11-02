import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { evaluateConsentInAnEthicalScenario_Skill_Data, evaluateDutiesTowardNonhumanAnimals_Skill_Data, evaluateEnvironmentalObligations_Skill_Data, evaluateEthicalImplicationsOfAutomatedDecisions_Skill_Data, evaluatePrivacyAsAnEthicalValue_Skill_Data } from './skills';

export const appliedEthics_SkillGroup_Data = buildSkillGroupConfig({
  slug: "appliedEthics",
  id: "a60ee55b-42f1-43f9-a976-4c7cd1809b23",
  name: {
    en: "Applied Ethics",
  },
  skills: {
    evaluateConsentInAnEthicalScenario: evaluateConsentInAnEthicalScenario_Skill_Data,
    evaluateDutiesTowardNonhumanAnimals: evaluateDutiesTowardNonhumanAnimals_Skill_Data,
    evaluateEnvironmentalObligations: evaluateEnvironmentalObligations_Skill_Data,
    evaluateEthicalImplicationsOfAutomatedDecisions: evaluateEthicalImplicationsOfAutomatedDecisions_Skill_Data,
    evaluatePrivacyAsAnEthicalValue: evaluatePrivacyAsAnEthicalValue_Skill_Data,
  },
  description: {
    methodological: "Ethical principles face distinctive challenges when rights, vulnerable people, nonhuman life, and emerging technologies are involved.",
    frontend: {
      en: "Explore ethical questions about consent, privacy, animals, nature and technology.",
    },
  },
});
