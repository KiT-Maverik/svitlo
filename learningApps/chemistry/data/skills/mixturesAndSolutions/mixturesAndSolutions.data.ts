import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { concentration_SkillGroup_Data } from './concentration/concentration.data';
import { dissolutionAndSolubility_SkillGroup_Data } from './dissolutionAndSolubility/dissolutionAndSolubility.data';
import { mixtureSystems_SkillGroup_Data } from './mixtureSystems/mixtureSystems.data';
import { separation_SkillGroup_Data } from './separation/separation.data';

export const mixturesAndSolutions_SkillDomain_Data = buildSkillDomainConfig({
  slug: "mixturesAndSolutions",
  id: "56676d37-6762-4935-8ad3-a5557de3cd5d",
  name: {
    en: "Mixtures and Solutions",
  },
  groups: {
    concentration: concentration_SkillGroup_Data,
    dissolutionAndSolubility: dissolutionAndSolubility_SkillGroup_Data,
    mixtureSystems: mixtureSystems_SkillGroup_Data,
    separation: separation_SkillGroup_Data,
  },
  description: {
    methodological: "Components of mixtures retain their chemical identities while distribution, solubility and relative amounts determine useful properties. Separation methods exploit differences in physical behavior rather than requiring reaction.",
    frontend: {
      en: "Explore how substances combine in mixtures, dissolve and can be separated again.",
    },
  },
});
