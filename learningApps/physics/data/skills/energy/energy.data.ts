import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { conservationOfEnergy_SkillGroup_Data } from './conservationOfEnergy/conservationOfEnergy.data';
import { energyTransferAndTransformation_SkillGroup_Data } from './energyTransferAndTransformation/energyTransferAndTransformation.data';
import { formsOfEnergy_SkillGroup_Data } from './formsOfEnergy/formsOfEnergy.data';
import { workAndPower_SkillGroup_Data } from './workAndPower/workAndPower.data';

export const energy_SkillDomain_Data = buildSkillDomainConfig({
  slug: "energy",
  id: "76805f1f-0b1c-43fc-9f9c-e52f7441626c",
  name: {
    en: "Energy",
  },
  groups: {
    conservationOfEnergy: conservationOfEnergy_SkillGroup_Data,
    energyTransferAndTransformation: energyTransferAndTransformation_SkillGroup_Data,
    formsOfEnergy: formsOfEnergy_SkillGroup_Data,
    workAndPower: workAndPower_SkillGroup_Data,
  },
  description: {
    methodological: "Energy is a quantity that helps describe physical changes and connect phenomena involving motion, heating, light, and electricity. The emphasis is on energy transfer, transformation, and conservation rather than arithmetic formulas.",
    frontend: {
      en: "Explore how energy is stored, transferred, transformed and conserved in physical systems.",
    },
  },
});
