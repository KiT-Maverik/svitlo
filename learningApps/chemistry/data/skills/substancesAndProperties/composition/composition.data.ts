import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { elementsAndCompounds_Skill_Data, homogeneousAndHeterogeneousSamples_Skill_Data, mixtures_Skill_Data, pureSubstances_Skill_Data } from './skills';

export const composition_SkillGroup_Data = buildSkillGroupConfig({
  slug: "composition",
  id: "adf759a2-583e-4c1a-961e-a5095f8e54ee",
  name: {
    en: "Composition",
  },
  skills: {
    elementsAndCompounds: elementsAndCompounds_Skill_Data,
    homogeneousAndHeterogeneousSamples: homogeneousAndHeterogeneousSamples_Skill_Data,
    mixtures: mixtures_Skill_Data,
    pureSubstances: pureSubstances_Skill_Data,
  },
  description: {
    methodological: "A specimen may be a single chemical substance or a combination of substances; its everyday name does not establish its composition.",
    frontend: {
      en: "Learn to distinguish a single substance from combinations of different substances.",
    },
  },
});
