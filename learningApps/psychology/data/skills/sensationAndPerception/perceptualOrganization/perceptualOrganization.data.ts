import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { bottomUpAndTopDownProcessing_Skill_Data, figureGroundOrganization_Skill_Data, gestaltGrouping_Skill_Data, perceptualConstancy_Skill_Data } from './skills';

export const perceptualOrganization_SkillGroup_Data = buildSkillGroupConfig({
  slug: "perceptualOrganization",
  id: "c821fe61-e8e0-4e2d-81b3-001e392c44ab",
  name: {
    en: "Perceptual Organization",
  },
  skills: {
    bottomUpAndTopDownProcessing: bottomUpAndTopDownProcessing_Skill_Data,
    figureGroundOrganization: figureGroundOrganization_Skill_Data,
    gestaltGrouping: gestaltGrouping_Skill_Data,
    perceptualConstancy: perceptualConstancy_Skill_Data,
  },
  description: {
    methodological: "The mind uses grouping cues and expectations to construct coherent objects from ambiguous sensory input.",
    frontend: {
      en: "Learn how the mind groups sensory information into recognizable objects.",
    },
  },
});
