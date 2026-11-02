import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { biomesAndHabitats_SkillGroup_Data } from './biomesAndHabitats/biomesAndHabitats.data';
import { ecosystems_SkillGroup_Data } from './ecosystems/ecosystems.data';
import { environmentalGradients_SkillGroup_Data } from './environmentalGradients/environmentalGradients.data';

export const naturalRegionsAndBiogeography_SkillDomain_Data = buildSkillDomainConfig({
  slug: "naturalRegionsAndBiogeography",
  id: "adaee0e9-03d2-4164-bbb0-55486ad73346",
  name: {
    en: "Natural Regions and Biogeography",
  },
  groups: {
    biomesAndHabitats: biomesAndHabitats_SkillGroup_Data,
    ecosystems: ecosystems_SkillGroup_Data,
    environmentalGradients: environmentalGradients_SkillGroup_Data,
  },
  description: {
    methodological: "Natural conditions create geographic variation in ecosystems, biodiversity and habitat patterns on land and in water. This field describes where ecological regions occur, how their distributions vary and how landscape changes affect them; organism physiology and detailed food-web mechanisms belong primarily to Biology.",
    frontend: {
      en: "Explore how climate, terrain and water influence the geography of living systems.",
    },
  },
});
