import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const evaluateSafeRobotOperation_Skill_Data = buildSkillConfig({
  slug: "evaluateSafeRobotOperation",
  id: "a6acf9e9-9950-40e3-b80e-980f31ab1e97",
  name: {
    en: "Evaluate safe robot operation",
  },
  description: {
    methodological: "Identify guards, speed limits, stop systems or separation required around moving robots.",
    frontend: {
      en: "Assess how a robot's operating conditions affect safety.",
    },
  },
});
