import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { blindingInResearch_Skill_Data, controlledExperiments_Skill_Data, correlationalStudies_Skill_Data, expectationEffects_Skill_Data, questionnaireResearch_Skill_Data, randomAssignment_Skill_Data, researchableHypotheses_Skill_Data, researchInterviews_Skill_Data, systematicObservation_Skill_Data } from './skills';

export const studyDesigns_SkillGroup_Data = buildSkillGroupConfig({
  slug: "studyDesigns",
  id: "f5e74fc5-0e0f-47b7-a305-dd59686daabb",
  name: {
    en: "Study Designs",
  },
  skills: {
    blindingInResearch: blindingInResearch_Skill_Data,
    controlledExperiments: controlledExperiments_Skill_Data,
    correlationalStudies: correlationalStudies_Skill_Data,
    expectationEffects: expectationEffects_Skill_Data,
    questionnaireResearch: questionnaireResearch_Skill_Data,
    randomAssignment: randomAssignment_Skill_Data,
    researchableHypotheses: researchableHypotheses_Skill_Data,
    researchInterviews: researchInterviews_Skill_Data,
    systematicObservation: systematicObservation_Skill_Data,
  },
  description: {
    methodological: "Different ways of collecting evidence answer different questions and support different levels of causal inference.",
    frontend: {
      en: "Learn why different research designs support different conclusions.",
    },
  },
});
