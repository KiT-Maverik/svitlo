import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishAScientificTheoryFromAHypothesis_Skill_Data, evaluateScientificPeerReview_Skill_Data, evaluateTheFalsifiabilityOfAClaim_Skill_Data, explainScientificSelfCorrection_Skill_Data, explainTheRoleOfReplication_Skill_Data, identifyConflictsOfInterestInResearch_Skill_Data } from './skills';

export const theoriesAndScientificPractice_SkillGroup_Data = buildSkillGroupConfig({
  slug: "theoriesAndScientificPractice",
  id: "86bbfcd5-0ed7-428a-93de-1c61ec1ecf64",
  name: {
    en: "Theories and Scientific Practice",
  },
  skills: {
    distinguishAScientificTheoryFromAHypothesis: distinguishAScientificTheoryFromAHypothesis_Skill_Data,
    evaluateScientificPeerReview: evaluateScientificPeerReview_Skill_Data,
    evaluateTheFalsifiabilityOfAClaim: evaluateTheFalsifiabilityOfAClaim_Skill_Data,
    explainScientificSelfCorrection: explainScientificSelfCorrection_Skill_Data,
    explainTheRoleOfReplication: explainTheRoleOfReplication_Skill_Data,
    identifyConflictsOfInterestInResearch: identifyConflictsOfInterestInResearch_Skill_Data,
  },
  description: {
    methodological: "Scientific conclusions are provisional but not arbitrary: shared procedures, criticism, reproducibility, and explanatory success distinguish responsible inquiry from mere assertion.",
    frontend: {
      en: "Discover how scientific theories improve through criticism and new evidence.",
    },
  },
});
