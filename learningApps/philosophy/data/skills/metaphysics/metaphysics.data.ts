import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { causationTimeAndPossibility_SkillGroup_Data } from './causationTimeAndPossibility/causationTimeAndPossibility.data';
import { existenceAndCategories_SkillGroup_Data } from './existenceAndCategories/existenceAndCategories.data';
import { identityAndPersistence_SkillGroup_Data } from './identityAndPersistence/identityAndPersistence.data';
import { mathematicalReality_SkillGroup_Data } from './mathematicalReality/mathematicalReality.data';

export const metaphysics_SkillDomain_Data = buildSkillDomainConfig({
  slug: "metaphysics",
  id: "7545dc5f-4946-408c-897f-e4e5eb78c460",
  name: {
    en: "Metaphysics",
  },
  groups: {
    causationTimeAndPossibility: causationTimeAndPossibility_SkillGroup_Data,
    existenceAndCategories: existenceAndCategories_SkillGroup_Data,
    identityAndPersistence: identityAndPersistence_SkillGroup_Data,
    mathematicalReality: mathematicalReality_SkillGroup_Data,
  },
  description: {
    methodological: "Metaphysics examines the most general categories of reality, such as what exists, how things persist, and what makes events possible. Its conceptual questions differ from describing particular natural mechanisms in the sciences.",
    frontend: {
      en: "Explore philosophical questions about existence, identity, reality, time and possibility.",
    },
  },
});
