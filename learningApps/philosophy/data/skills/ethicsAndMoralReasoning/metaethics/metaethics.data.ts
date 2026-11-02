import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeMoralDisagreement_Skill_Data, compareMoralRealismAndAntiRealism_Skill_Data, distinguishMetaethicalFromNormativeQuestions_Skill_Data, distinguishMoralCognitivismFromNonCognitivism_Skill_Data, evaluateMoralRelativism_Skill_Data, examineMoralMotivation_Skill_Data } from './skills';

export const metaethics_SkillGroup_Data = buildSkillGroupConfig({
  slug: "metaethics",
  id: "ebf74a2c-0e22-4f8a-aab8-7177789729d3",
  name: {
    en: "Metaethics",
  },
  skills: {
    analyzeMoralDisagreement: analyzeMoralDisagreement_Skill_Data,
    compareMoralRealismAndAntiRealism: compareMoralRealismAndAntiRealism_Skill_Data,
    distinguishMetaethicalFromNormativeQuestions: distinguishMetaethicalFromNormativeQuestions_Skill_Data,
    distinguishMoralCognitivismFromNonCognitivism: distinguishMoralCognitivismFromNonCognitivism_Skill_Data,
    evaluateMoralRelativism: evaluateMoralRelativism_Skill_Data,
    examineMoralMotivation: examineMoralMotivation_Skill_Data,
  },
  description: {
    methodological: "Inquiry into the meaning, objectivity, and epistemic standing of moral discourse underlies but does not itself prescribe codes of conduct. Normative theories decide how to act; metaethical theories examine the status of such judgments.",
    frontend: {
      en: "Explore what moral claims mean and whether moral truths depend on personal beliefs.",
    },
  },
});
