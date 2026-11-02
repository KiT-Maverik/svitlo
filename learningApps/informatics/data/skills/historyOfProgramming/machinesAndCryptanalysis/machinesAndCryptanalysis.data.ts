import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainHistoricalCryptanalysisMethods_Skill_Data, explainTheDevelopmentOfProgrammableComputers_Skill_Data, explainThePurposeOfTheBombe_Skill_Data } from './skills';

export const machinesAndCryptanalysis_SkillGroup_Data = buildSkillGroupConfig({
  slug: "machinesAndCryptanalysis",
  id: "fc8df315-fb6e-40e2-ac23-35404245f12b",
  name: {
    en: "Machines and Cryptanalysis",
  },
  skills: {
    explainHistoricalCryptanalysisMethods: explainHistoricalCryptanalysisMethods_Skill_Data,
    explainTheDevelopmentOfProgrammableComputers: explainTheDevelopmentOfProgrammableComputers_Skill_Data,
    explainThePurposeOfTheBombe: explainThePurposeOfTheBombe_Skill_Data,
  },
  description: {
    methodological: "The development of computing devices and specialized cryptanalytic machines illustrates how formal instructions and mechanized checking addressed historical problems. Philosophical issues of imitation and understanding belong to AI instead.",
    frontend: {
      en: "Discover how machines and mathematical methods supported historical cryptanalysis.",
    },
  },
});
