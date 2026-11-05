import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  compareStructuralModelsUnderLoad_Skill_Data,
  evaluateStructuralStability_Skill_Data,
  interpretStructuralDeformation_Skill_Data,
  traceStructuralLoadPaths_Skill_Data,
} from './skills';

export const stabilityAndTesting_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'stabilityAndTesting',
  id: '37a29f5a-5fbe-45e2-aa63-5514f9a8f35d',
  name: {
    en: 'Stability and Testing',
  },
  skills: {
    compareStructuralModelsUnderLoad: compareStructuralModelsUnderLoad_Skill_Data,
    evaluateStructuralStability: evaluateStructuralStability_Skill_Data,
    interpretStructuralDeformation: interpretStructuralDeformation_Skill_Data,
    traceStructuralLoadPaths: traceStructuralLoadPaths_Skill_Data,
  },
  description: {
    methodological:
      'Deformation, loss of equilibrium and local failure can all compromise a structure before every component breaks.',
    frontend: {
      en: 'Discover how engineers evaluate whether a structure remains stable.',
    },
  },
});
