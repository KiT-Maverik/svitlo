import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { collectiveActionProblem_Skill_Data, strategicEquilibrium_Skill_Data, strategicInterdependence_Skill_Data } from './skills';

export const strategicInteraction_SkillGroup_Data = buildSkillGroupConfig({
  slug: "strategicInteraction",
  id: "ec30f55d-327a-4dae-92a6-bf96746b685c",
  name: {
    en: "Стратегічна взаємодія",
  },
  skills: {
    collectiveActionProblem: collectiveActionProblem_Skill_Data,
    strategicEquilibrium: strategicEquilibrium_Skill_Data,
    strategicInterdependence: strategicInterdependence_Skill_Data,
  },
  description: {
    methodological: "The consequences of one participant's decision may depend on others' choices, and individual incentives can diverge from collective interests.",
    frontend: {
      en: "Discover why your best choice can depend on what others do.",
    },
  },
});
