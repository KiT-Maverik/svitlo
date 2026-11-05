import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const opticalComponentSuitability_Skill_Data = buildSkillConfig({
  slug: 'opticalComponentSuitability',
  id: '3c9b4ca1-eb54-4ec4-a645-9ea37485c702',
  name: {
    en: 'Optical component suitability',
  },
  description: {
    methodological:
      'Assess the functional fit of lenses, mirrors, filters or detectors for an imaging, transmission or measurement purpose.',
    frontend: {
      en: 'Compare optical components against the function they must serve.',
    },
  },
});
