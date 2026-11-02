import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { evaluateAPhilosophicalTextCritically_Skill_Data, identifyTheCentralProblemInAPhilosophicalText_Skill_Data, interpretAPhilosopherInHistoricalContext_Skill_Data, reconstructAHistoricalPhilosophicalArgument_Skill_Data } from './skills';

export const readingPhilosophicalWorks_SkillGroup_Data = buildSkillGroupConfig({
  slug: "readingPhilosophicalWorks",
  id: "89ad430b-07d6-4e89-80ca-00b65dbb6696",
  name: {
    en: "Reading Philosophical Works",
  },
  skills: {
    evaluateAPhilosophicalTextCritically: evaluateAPhilosophicalTextCritically_Skill_Data,
    identifyTheCentralProblemInAPhilosophicalText: identifyTheCentralProblemInAPhilosophicalText_Skill_Data,
    interpretAPhilosopherInHistoricalContext: interpretAPhilosopherInHistoricalContext_Skill_Data,
    reconstructAHistoricalPhilosophicalArgument: reconstructAHistoricalPhilosophicalArgument_Skill_Data,
  },
  description: {
    methodological: "Texts require interpreting claims, their argumentative context, and the questions the author sought to answer; historical wording cannot always be mapped directly to modern categories.",
    frontend: {
      en: "Learn to read philosophical works with attention to their questions and context.",
    },
  },
});
