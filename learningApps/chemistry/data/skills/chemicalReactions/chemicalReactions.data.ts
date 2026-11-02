import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { oxidationAndReduction_SkillGroup_Data } from './oxidationAndReduction/oxidationAndReduction.data';
import { reactionPatterns_SkillGroup_Data } from './reactionPatterns/reactionPatterns.data';
import { recognizingReactions_SkillGroup_Data } from './recognizingReactions/recognizingReactions.data';

export const chemicalReactions_SkillDomain_Data = buildSkillDomainConfig({
  slug: "chemicalReactions",
  id: "307ec31d-a1a3-41ab-8681-799f49aa1825",
  name: {
    en: "Chemical Reactions",
  },
  groups: {
    oxidationAndReduction: oxidationAndReduction_SkillGroup_Data,
    reactionPatterns: reactionPatterns_SkillGroup_Data,
    recognizingReactions: recognizingReactions_SkillGroup_Data,
  },
  description: {
    methodological: "This domain identifies and explains transformations in which constituent atoms are rearranged or electron/proton transfer occurs. Chemical equation notation and amount calculations remain in their dedicated domain.",
    frontend: {
      en: "Explore how chemical reactions change substances by rearranging atoms and transferring particles.",
    },
  },
});
