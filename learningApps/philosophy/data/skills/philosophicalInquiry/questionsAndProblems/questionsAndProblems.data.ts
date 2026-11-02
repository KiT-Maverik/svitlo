import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishAPhilosophicalProblemFromAnExample_Skill_Data, distinguishPhilosophicalQuestionsFromEmpiricalQuestions_Skill_Data, formulateAPhilosophicalQuestion_Skill_Data, identifyAssumptionsInAPhilosophicalProblem_Skill_Data } from './skills';

export const questionsAndProblems_SkillGroup_Data = buildSkillGroupConfig({
  slug: "questionsAndProblems",
  id: "278bb972-fc1c-4cd2-8c68-a4c4d0009fbc",
  name: {
    en: "Questions and Problems",
  },
  skills: {
    distinguishAPhilosophicalProblemFromAnExample: distinguishAPhilosophicalProblemFromAnExample_Skill_Data,
    distinguishPhilosophicalQuestionsFromEmpiricalQuestions: distinguishPhilosophicalQuestionsFromEmpiricalQuestions_Skill_Data,
    formulateAPhilosophicalQuestion: formulateAPhilosophicalQuestion_Skill_Data,
    identifyAssumptionsInAPhilosophicalProblem: identifyAssumptionsInAPhilosophicalProblem_Skill_Data,
  },
  description: {
    methodological: "A productive philosophical problem can be examined through competing answers, explicit concepts, and reasons. The object is to make a question discussable without assuming that every question has a single empirical test.",
    frontend: {
      en: "Learn to turn puzzling ideas into questions that can be discussed thoughtfully.",
    },
  },
});
