import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const bridge_Skill_Data = buildSkillConfig({
  slug: "bridge",
  id: "bd54e532-c277-4768-99af-996bbb4d0fe1",
  name: {
    en: "Bridge",
  },
  description: {
    methodological: "Separate abstraction and implementation into two independent hierarchies so each dimension can vary without an explosion of class combinations.",
    frontend: {
      en: "Separate a component's abstraction from the implementation it uses.",
    },
  },
});
