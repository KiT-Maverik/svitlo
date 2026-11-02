import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { biodegradationAndPersistence_Skill_Data, chemicalLifeCycles_Skill_Data, greenChemistryPrinciples_Skill_Data, recyclingChemistry_Skill_Data } from './skills';

export const sustainableChemicalChoices_SkillGroup_Data = buildSkillGroupConfig({
  slug: "sustainableChemicalChoices",
  id: "e52a754e-4fdc-44ad-a881-9131c6ecfc7a",
  name: {
    en: "Sustainable Chemical Choices",
  },
  skills: {
    biodegradationAndPersistence: biodegradationAndPersistence_Skill_Data,
    chemicalLifeCycles: chemicalLifeCycles_Skill_Data,
    greenChemistryPrinciples: greenChemistryPrinciples_Skill_Data,
    recyclingChemistry: recyclingChemistry_Skill_Data,
  },
  description: {
    methodological: "Environmental and resource decisions benefit from chemical evidence about composition, persistence, transformations and alternatives.",
    frontend: {
      en: "Use chemical evidence to make better decisions about materials, waste and resources.",
    },
  },
});
