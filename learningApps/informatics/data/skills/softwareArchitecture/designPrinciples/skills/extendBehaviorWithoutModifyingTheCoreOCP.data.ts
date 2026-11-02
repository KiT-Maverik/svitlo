import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const extendBehaviorWithoutModifyingTheCoreOCP_Skill_Data = buildSkillConfig({
  slug: "extendBehaviorWithoutModifyingTheCoreOCP",
  id: "2300c155-5699-4e5f-bdc1-dd71cad8c059",
  name: {
    en: "Extend Behavior Without Modifying the Core (OCP)",
  },
  description: {
    methodological: "Identify extension points that allow a new implementation through a contract without rewriting tested shared logic. A stable core is a goal, not an absolute prohibition on changing existing code.",
    frontend: {
      en: "Design extension points for new behavior without rewriting stable core logic.",
    },
  },
});
