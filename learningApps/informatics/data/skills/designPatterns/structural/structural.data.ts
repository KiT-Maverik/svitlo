import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { adapter_Skill_Data, bridge_Skill_Data, composite_Skill_Data, decorator_Skill_Data, facade_Skill_Data, flyweight_Skill_Data, proxy_Skill_Data } from './skills';

export const structural_SkillGroup_Data = buildSkillGroupConfig({
  slug: "structural",
  id: "c33084e6-0f4c-43c3-af2d-309e0f6cbf62",
  name: {
    en: "Structural",
  },
  skills: {
    adapter: adapter_Skill_Data,
    bridge: bridge_Skill_Data,
    composite: composite_Skill_Data,
    decorator: decorator_Skill_Data,
    facade: facade_Skill_Data,
    flyweight: flyweight_Skill_Data,
    proxy: proxy_Skill_Data,
  },
  description: {
    methodological: "Seven methods of combining components through adaptation, wrapping, nesting, intermediaries, or shared state.",
    frontend: {
      en: "Discover patterns for connecting, wrapping and sharing software components.",
    },
  },
});
