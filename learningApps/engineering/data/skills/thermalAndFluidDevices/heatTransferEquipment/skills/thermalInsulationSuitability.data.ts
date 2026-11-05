import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const thermalInsulationSuitability_Skill_Data = buildSkillConfig({
  slug: 'thermalInsulationSuitability',
  id: '40d0db59-d8fc-4e20-89fc-8439e34a5295',
  name: {
    en: 'Thermal insulation suitability',
  },
  description: {
    methodological:
      'Assess how an insulating arrangement manages conductive, convective and radiative heat transfer in an intended enclosure.',
    frontend: {
      en: 'Compare insulation arrangements by how they reduce unwanted heat transfer.',
    },
  },
});
