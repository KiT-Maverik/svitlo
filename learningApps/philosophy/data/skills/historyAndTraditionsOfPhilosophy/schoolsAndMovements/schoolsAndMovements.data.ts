import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeAnEnlightenmentPhilosophicalArgument_Skill_Data, compareExistentialistAndAnalyticApproachesToAProblem_Skill_Data, compareMajorModernEpistemologicalApproaches_Skill_Data } from './skills';

export const schoolsAndMovements_SkillGroup_Data = buildSkillGroupConfig({
  slug: "schoolsAndMovements",
  id: "ef8fce1e-df27-4702-9d54-1040f4e0965e",
  name: {
    en: "Schools and Movements",
  },
  skills: {
    analyzeAnEnlightenmentPhilosophicalArgument: analyzeAnEnlightenmentPhilosophicalArgument_Skill_Data,
    compareExistentialistAndAnalyticApproachesToAProblem: compareExistentialistAndAnalyticApproachesToAProblem_Skill_Data,
    compareMajorModernEpistemologicalApproaches: compareMajorModernEpistemologicalApproaches_Skill_Data,
  },
  description: {
    methodological: "Philosophical movements and schools arise around distinctive approaches to knowledge, reason, liberty, and existence; their boundaries and internal disagreements cannot be reduced to dates alone.",
    frontend: {
      en: "Discover how different philosophical schools approach shared questions.",
    },
  },
});
