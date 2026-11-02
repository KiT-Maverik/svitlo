import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { evaluateSafeRobotOperation_Skill_Data, identifyRobotSubsystems_Skill_Data, robotDegreesOfFreedom_Skill_Data, robotLocalizationHardware_Skill_Data } from './skills';

export const robotSystems_SkillGroup_Data = buildSkillGroupConfig({
  slug: "robotSystems",
  id: "40388970-e98e-43c1-8dcc-cc192a8546bd",
  name: {
    en: "Robot Systems",
  },
  skills: {
    evaluateSafeRobotOperation: evaluateSafeRobotOperation_Skill_Data,
    identifyRobotSubsystems: identifyRobotSubsystems_Skill_Data,
    robotDegreesOfFreedom: robotDegreesOfFreedom_Skill_Data,
    robotLocalizationHardware: robotLocalizationHardware_Skill_Data,
  },
  description: {
    methodological: "Robots combine mobile or articulated structure with localization, motion control, power and protection; not all robots operate autonomously.",
    frontend: {
      en: "Learn to analyze a robot as connected physical subsystems.",
    },
  },
});
