import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyticalInterferences_Skill_Data, calibrationCurves_Skill_Data, qualitativeAnalyteIdentification_Skill_Data, quantitativeAnalyteDetermination_Skill_Data, samplePreparationForAnalysis_Skill_Data, spectroscopicEvidence_Skill_Data } from './skills';

export const analyticalChemistry_SkillGroup_Data = buildSkillGroupConfig({
  slug: "analyticalChemistry",
  id: "4dc9f8b6-b57e-4b0a-a105-5daa64c11978",
  name: {
    en: "Analytical Chemistry",
  },
  skills: {
    analyticalInterferences: analyticalInterferences_Skill_Data,
    calibrationCurves: calibrationCurves_Skill_Data,
    qualitativeAnalyteIdentification: qualitativeAnalyteIdentification_Skill_Data,
    quantitativeAnalyteDetermination: quantitativeAnalyteDetermination_Skill_Data,
    samplePreparationForAnalysis: samplePreparationForAnalysis_Skill_Data,
    spectroscopicEvidence: spectroscopicEvidence_Skill_Data,
  },
  description: {
    methodological: "Analytical chemistry identifies particular components in samples and determines their amounts. Sample treatment, chemical selectivity and calibration govern whether signals justify a conclusion; general observation and bulk property comparison are distinct competencies.",
    frontend: {
      en: "Discover how chemists identify substances and measure their amounts in samples.",
    },
  },
});
