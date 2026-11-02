import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { decompositionAndAbstraction_SkillGroup_Data } from './decompositionAndAbstraction/decompositionAndAbstraction.data';
import { logicAndPatterns_SkillGroup_Data } from './logicAndPatterns/logicAndPatterns.data';

export const computationalThinking_SkillDomain_Data = buildSkillDomainConfig({
  slug: "computationalThinking",
  id: "fe626b09-cb42-4cc5-9694-7c31fa3e55b3",
  name: {
    en: "Computational Thinking",
  },
  groups: {
    decompositionAndAbstraction: decompositionAndAbstraction_SkillGroup_Data,
    logicAndPatterns: logicAndPatterns_SkillGroup_Data,
  },
  description: {
    methodological: "Turning open-ended problems into formalized tasks by identifying relevant information, defining rules, and constructing solutions that can be repeated and checked. Unlike programming, this does not necessarily require expressing the solution as executable code.",
    frontend: {
      en: "Explore how to break complex problems into clear steps, patterns and rules.",
    },
  },
});
