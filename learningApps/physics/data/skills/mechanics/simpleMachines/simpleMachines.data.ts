import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainHowALeverWorks_Skill_Data, explainHowAPulleyWorks_Skill_Data, explainHowAWheelAndAxleWork_Skill_Data, predictTheRotationOfMeshedGears_Skill_Data } from './skills';

export const simpleMachines_SkillGroup_Data = buildSkillGroupConfig({
  slug: "simpleMachines",
  id: "2265cb35-ba2e-4a3f-86b8-3c476fb31ab4",
  name: {
    en: "Simple Machines",
  },
  skills: {
    explainHowALeverWorks: explainHowALeverWorks_Skill_Data,
    explainHowAPulleyWorks: explainHowAPulleyWorks_Skill_Data,
    explainHowAWheelAndAxleWork: explainHowAWheelAndAxleWork_Skill_Data,
    predictTheRotationOfMeshedGears: predictTheRotationOfMeshedGears_Skill_Data,
  },
  description: {
    methodological: "Levers, pulleys, wheels, and gears demonstrate the transmission of force and rotation. The focus here is on physical principles, not selecting a design or engineering a machine.",
    frontend: {
      en: "Understand how levers, wheels, pulleys and gears transmit motion and force.",
    },
  },
});
