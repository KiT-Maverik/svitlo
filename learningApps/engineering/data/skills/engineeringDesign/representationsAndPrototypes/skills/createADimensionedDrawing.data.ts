import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const createADimensionedDrawing_Skill_Data = buildSkillConfig({
  slug: 'createADimensionedDrawing',
  id: '9f211857-0a0e-4347-8b45-15b317ec9419',
  name: {
    en: 'Create a dimensioned drawing',
  },
  description: {
    methodological: 'Specify relevant sizes and geometric relations so another person could reproduce a part.',
    frontend: {
      en: 'Draw a part with dimensions that communicate its intended size.',
    },
  },
});
