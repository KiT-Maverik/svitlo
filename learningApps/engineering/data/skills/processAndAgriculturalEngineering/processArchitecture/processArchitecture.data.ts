import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  dosingEquipment_Skill_Data,
  identifyProcessBottlenecks_Skill_Data,
  industrialMixingEquipment_Skill_Data,
  interpretAProcessFlowDiagram_Skill_Data,
  traceMaterialBalances_Skill_Data,
} from './skills';

export const processArchitecture_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'processArchitecture',
  id: 'aee6a5b2-0a46-468a-b0c1-389ecefef283',
  name: {
    en: 'Process Architecture',
  },
  skills: {
    dosingEquipment: dosingEquipment_Skill_Data,
    identifyProcessBottlenecks: identifyProcessBottlenecks_Skill_Data,
    industrialMixingEquipment: industrialMixingEquipment_Skill_Data,
    interpretAProcessFlowDiagram: interpretAProcessFlowDiagram_Skill_Data,
    traceMaterialBalances: traceMaterialBalances_Skill_Data,
  },
  description: {
    methodological:
      'Large production processes connect material inputs, transformations, recirculation and waste streams in a sequence where one operation constrains others.',
    frontend: {
      en: 'Learn how industrial processes organize equipment and material flows.',
    },
  },
});
