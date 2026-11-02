import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const configureARepeatedRobotAction_Skill_Data = buildSkillConfig({
  slug: "configureARepeatedRobotAction",
  id: "80a463db-ee01-4900-a039-5a24f3711dda",
  name: {
    en: "Configure a Repeated Robot Action",
  },
  description: {
    methodological: "Control the number of repetitions or termination condition of a physical or simulated operation, such as repeatedly checking a sensor while moving. Account for environmental changes between iterations.",
    frontend: {
      en: "Set how many times a robot repeats an action or when it should stop.",
    },
  },
});
