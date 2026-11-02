import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishAnArgumentFromAnExplanation_Skill_Data, identifyAnArgumentsConclusion_Skill_Data, identifyPremisesInAnArgument_Skill_Data, reconstructAnArgumentInStandardForm_Skill_Data } from './skills';

export const argumentsAndInference_SkillGroup_Data = buildSkillGroupConfig({
  slug: "argumentsAndInference",
  id: "e54cbf83-391d-4ce6-8a32-a4bd08930486",
  name: {
    en: "Arguments and Inference",
  },
  skills: {
    distinguishAnArgumentFromAnExplanation: distinguishAnArgumentFromAnExplanation_Skill_Data,
    identifyAnArgumentsConclusion: identifyAnArgumentsConclusion_Skill_Data,
    identifyPremisesInAnArgument: identifyPremisesInAnArgument_Skill_Data,
    reconstructAnArgumentInStandardForm: reconstructAnArgumentInStandardForm_Skill_Data,
  },
  description: {
    methodological: "Arguments connect propositions through an inferential claim; assertions, explanations, and rhetorical appeals may occur nearby without playing the same role.",
    frontend: {
      en: "Discover how premises and conclusions form an argument.",
    },
  },
});
