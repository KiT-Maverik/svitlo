import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainHowInducedCurrentArises_Skill_Data, explainTheMagneticEffectOfElectricCurrent_Skill_Data } from './skills';

export const electromagnetsAndInduction_SkillGroup_Data = buildSkillGroupConfig({
  slug: "electromagnetsAndInduction",
  id: "50849984-5ce8-499c-9f7a-2230ce7370f8",
  name: {
    en: "Electromagnets and Induction",
  },
  skills: {
    explainHowInducedCurrentArises: explainHowInducedCurrentArises_Skill_Data,
    explainTheMagneticEffectOfElectricCurrent: explainTheMagneticEffectOfElectricCurrent_Skill_Data,
  },
  description: {
    methodological: "Electric current can create a magnetic field, and changing magnetic conditions can produce electrical effects, explaining many systems.",
    frontend: {
      en: "Discover how currents create magnetic fields and changing fields induce electricity.",
    },
  },
});
