import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { assemblyAndQuality_SkillGroup_Data } from './assemblyAndQuality/assemblyAndQuality.data';
import { materialShaping_SkillGroup_Data } from './materialShaping/materialShaping.data';
import { productionFlow_SkillGroup_Data } from './productionFlow/productionFlow.data';

export const manufacturingAndProduction_SkillDomain_Data = buildSkillDomainConfig({
  slug: "manufacturingAndProduction",
  id: "f7851bd5-c6a1-4715-9e3b-00d856f9e215",
  name: {
    en: "Manufacturing and Production",
  },
  groups: {
    assemblyAndQuality: assemblyAndQuality_SkillGroup_Data,
    materialShaping: materialShaping_SkillGroup_Data,
    productionFlow: productionFlow_SkillGroup_Data,
  },
  description: {
    methodological: "Finished products require suitable forming processes, assembly, tolerances and inspection. Production engineering addresses repeatable manufacture under resource, quality and throughput limits.",
    frontend: {
      en: "Explore how materials are shaped, products assembled and production quality controlled.",
    },
  },
});
