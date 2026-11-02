import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { carbonFrameworks_SkillGroup_Data } from './carbonFrameworks/carbonFrameworks.data';
import { functionalGroups_SkillGroup_Data } from './functionalGroups/functionalGroups.data';
import { macromolecules_SkillGroup_Data } from './macromolecules/macromolecules.data';
import { organicTransformations_SkillGroup_Data } from './organicTransformations/organicTransformations.data';

export const organicChemistry_SkillDomain_Data = buildSkillDomainConfig({
  slug: "organicChemistry",
  id: "cffb6d73-9d15-4add-85f2-ce68a70cd249",
  name: {
    en: "Organic Chemistry",
  },
  groups: {
    carbonFrameworks: carbonFrameworks_SkillGroup_Data,
    functionalGroups: functionalGroups_SkillGroup_Data,
    macromolecules: macromolecules_SkillGroup_Data,
    organicTransformations: organicTransformations_SkillGroup_Data,
  },
  description: {
    methodological: "Carbon compounds are organized by connectivity, functional groups and reaction pathways. This domain focuses on chemical structure and transformations, distinct from physiological roles discussed in biology.",
    frontend: {
      en: "Explore how carbon compounds are structured, classified and transformed.",
    },
  },
});
