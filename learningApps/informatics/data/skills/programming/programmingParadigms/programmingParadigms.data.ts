import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishImperativeAndDeclarativeApproaches_Skill_Data, explainFunctionalProgramming_Skill_Data, explainObjectOrientedProgramming_Skill_Data, explainProceduralProgramming_Skill_Data } from './skills';

export const programmingParadigms_SkillGroup_Data = buildSkillGroupConfig({
  slug: "programmingParadigms",
  id: "70ac02c5-1133-4653-839f-8d8e1ebc906e",
  name: {
    en: "Programming Paradigms",
  },
  skills: {
    distinguishImperativeAndDeclarativeApproaches: distinguishImperativeAndDeclarativeApproaches_Skill_Data,
    explainFunctionalProgramming: explainFunctionalProgramming_Skill_Data,
    explainObjectOrientedProgramming: explainObjectOrientedProgramming_Skill_Data,
    explainProceduralProgramming: explainProceduralProgramming_Skill_Data,
  },
  description: {
    methodological: "Compare code organization through stepwise state changes, functional transformation of values, object modeling, and description of desired results. A language may support several paradigms.",
    frontend: {
      en: "Discover different ways of organizing program logic and behavior.",
    },
  },
});
