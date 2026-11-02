import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const applyObjectAbstraction_Skill_Data = buildSkillConfig({
  slug: "applyObjectAbstraction",
  id: "13839a46-aec2-4764-bf85-88e7ebbd35de",
  name: {
    en: "Apply Object Abstraction",
  },
  description: {
    methodological: "Identify the minimal set of operations or properties relevant to a component's user while hiding details that do not affect the contract. For example, a 'move' operation need not expose a robot's motor-control logic.",
    frontend: {
      en: "Choose the essential operations a component should reveal to its users.",
    },
  },
});
