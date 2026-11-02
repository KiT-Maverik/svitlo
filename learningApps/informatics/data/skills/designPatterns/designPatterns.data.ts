import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { behavioral_SkillGroup_Data } from './behavioral/behavioral.data';
import { creational_SkillGroup_Data } from './creational/creational.data';
import { structural_SkillGroup_Data } from './structural/structural.data';

export const designPatterns_SkillDomain_Data = buildSkillDomainConfig({
  slug: "designPatterns",
  id: "566394c0-8f6c-4372-82b7-7384498fa095",
  name: {
    en: "Design Patterns",
  },
  groups: {
    behavioral: behavioral_SkillGroup_Data,
    creational: creational_SkillGroup_Data,
    structural: structural_SkillGroup_Data,
  },
  description: {
    methodological: "The classic Gang of Four catalog describes 23 reusable structures for common object-design problems. Its three families focus on instance creation, component composition, and interactions. The existence of a pattern does not mean every problem should be made more complex to use one.",
    frontend: {
      en: "Explore reusable ways to create, combine and coordinate software objects.",
    },
  },
});
