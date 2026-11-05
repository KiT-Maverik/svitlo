import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  automatedManufacturingCells_Skill_Data,
  compareBatchAndContinuousProduction_Skill_Data,
  identifyProductionWaste_Skill_Data,
  traceProductionWorkflow_Skill_Data,
} from './skills';

export const productionFlow_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'productionFlow',
  id: '977b1b83-60b2-4ef9-ab30-0d18726d0587',
  name: {
    en: 'Production Flow',
  },
  skills: {
    automatedManufacturingCells: automatedManufacturingCells_Skill_Data,
    compareBatchAndContinuousProduction: compareBatchAndContinuousProduction_Skill_Data,
    identifyProductionWaste: identifyProductionWaste_Skill_Data,
    traceProductionWorkflow: traceProductionWorkflow_Skill_Data,
  },
  description: {
    methodological:
      'Repeated manufacture introduces throughput limits and choices between flexible batches and continuous processes.',
    frontend: {
      en: 'Explore how resources and components move through production.',
    },
  },
});
