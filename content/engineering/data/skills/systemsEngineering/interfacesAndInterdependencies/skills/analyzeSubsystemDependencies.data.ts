import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const analyzeSubsystemDependencies_Skill_Data = buildSkillConfig({
  slug: 'analyzeSubsystemDependencies',
  id: '8dc55400-10b9-40c7-a1d4-74dca8819455',
  name: {
    en: 'Analyze subsystem dependencies',
  },
  description: {
    methodological: "Show how a limitation or interruption in one part influences another part's operation.",
    frontend: {
      en: 'Explain how a problem in one subsystem affects other parts.',
    },
  },
});
