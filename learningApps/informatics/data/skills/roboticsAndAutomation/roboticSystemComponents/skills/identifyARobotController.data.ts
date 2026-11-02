import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyARobotController_Skill_Data = buildSkillConfig({
  slug: "identifyARobotController",
  id: "a3167d48-7eae-40a8-8a98-649512347f92",
  name: {
    en: "Identify a Robot Controller",
  },
  description: {
    methodological: "Explain the component that reads inputs, executes programmed rules, and sends commands to actuators. The controller connects information with action and need not resemble a large standalone computer.",
    frontend: {
      en: "Identify the controller that converts sensor inputs into programmed actions.",
    },
  },
});
