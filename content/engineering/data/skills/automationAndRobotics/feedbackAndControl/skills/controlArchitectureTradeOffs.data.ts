import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const controlArchitectureTradeOffs_Skill_Data = buildSkillConfig({
  slug: 'controlArchitectureTradeOffs',
  id: '783d4503-4231-4d22-9725-ba80a7209480',
  name: {
    en: 'Control architecture trade-offs',
  },
  description: {
    methodological:
      'Compare the robustness, sensing cost, responsiveness and stability implications of open-loop versus feedback control as an engineering architecture decision, not merely a definition quiz.',
    frontend: {
      en: 'Compare control approaches according to their intended behavior and limitations.',
    },
  },
});
