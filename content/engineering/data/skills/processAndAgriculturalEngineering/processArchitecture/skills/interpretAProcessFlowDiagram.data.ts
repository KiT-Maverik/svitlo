import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const interpretAProcessFlowDiagram_Skill_Data = buildSkillConfig({
  slug: 'interpretAProcessFlowDiagram',
  id: '7df4e618-4953-4f21-9801-e320b1e2c7f6',
  name: {
    en: 'Interpret a process flow diagram',
  },
  description: {
    methodological:
      'Trace named material streams and equipment blocks to determine the order and purpose of operations in a production process.',
    frontend: {
      en: 'Read a diagram showing how a production process connects its equipment.',
    },
  },
});
