import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { convertBetweenBinaryAndDecimal_Skill_Data, distinguishBinaryAndHexadecimal_Skill_Data, explainComputerBinaryLogic_Skill_Data, explainPositionalNumeralSystems_Skill_Data } from './skills';

export const numeralSystems_SkillGroup_Data = buildSkillGroupConfig({
  slug: "numeralSystems",
  id: "bbae0d23-ce7b-409e-90ab-6a696ba38781",
  name: {
    en: "Numeral Systems",
  },
  skills: {
    convertBetweenBinaryAndDecimal: convertBetweenBinaryAndDecimal_Skill_Data,
    distinguishBinaryAndHexadecimal: distinguishBinaryAndHexadecimal_Skill_Data,
    explainComputerBinaryLogic: explainComputerBinaryLogic_Skill_Data,
    explainPositionalNumeralSystems: explainPositionalNumeralSystems_Skill_Data,
  },
  description: {
    methodological: "Positional numeral notation, bases, and place values; binary states connect mathematical notation to the technical representation of information.",
    frontend: {
      en: "Learn how digits represent numbers in systems with different bases.",
    },
  },
});
