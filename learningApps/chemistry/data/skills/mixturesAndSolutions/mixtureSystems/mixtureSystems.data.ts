import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { alloys_Skill_Data, colloids_Skill_Data, solutions_Skill_Data, suspensions_Skill_Data } from './skills';

export const mixtureSystems_SkillGroup_Data = buildSkillGroupConfig({
  slug: "mixtureSystems",
  id: "00bdfb4d-243a-4e7a-8983-155ffe616764",
  name: {
    en: "Mixture Systems",
  },
  skills: {
    alloys: alloys_Skill_Data,
    colloids: colloids_Skill_Data,
    solutions: solutions_Skill_Data,
    suspensions: suspensions_Skill_Data,
  },
  description: {
    methodological: "Mixtures may contain more than one phase or dispersed material with properties depending on particle size and composition.",
    frontend: {
      en: "Recognize different kinds of mixtures based on their components and phases.",
    },
  },
});
