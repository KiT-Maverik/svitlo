import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyticalReproducibility_Skill_Data, confoundingVariables_Skill_Data, correlationAndCausation_Skill_Data, descriptiveStatisticsInResearch_Skill_Data, evidenceQuality_Skill_Data, studyReplication_Skill_Data } from './skills';

export const evidenceAndInterpretation_SkillGroup_Data = buildSkillGroupConfig({
  slug: "evidenceAndInterpretation",
  id: "90ad88f5-40e1-42aa-b189-abd6d989f07a",
  name: {
    en: "Evidence and Interpretation",
  },
  skills: {
    analyticalReproducibility: analyticalReproducibility_Skill_Data,
    confoundingVariables: confoundingVariables_Skill_Data,
    correlationAndCausation: correlationAndCausation_Skill_Data,
    descriptiveStatisticsInResearch: descriptiveStatisticsInResearch_Skill_Data,
    evidenceQuality: evidenceQuality_Skill_Data,
    studyReplication: studyReplication_Skill_Data,
  },
  description: {
    methodological: "Quantitative summaries and research transparency help discriminate robust patterns from noise and misleading causal stories.",
    frontend: {
      en: "Learn how evidence and transparent analysis support research conclusions.",
    },
  },
});
