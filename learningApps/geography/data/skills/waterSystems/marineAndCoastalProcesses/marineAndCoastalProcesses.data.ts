import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { identifyCoastalErosionAndDepositionFeatures_Skill_Data, interpretGeographicPatternsOfOceanCurrents_Skill_Data, interpretGeographicPatternsOfOceanTides_Skill_Data } from './skills';

export const marineAndCoastalProcesses_SkillGroup_Data = buildSkillGroupConfig({
  slug: "marineAndCoastalProcesses",
  id: "63e99f33-ae1e-4269-aa0d-a9fa80f739e2",
  name: {
    en: "Marine and Coastal Processes",
  },
  skills: {
    identifyCoastalErosionAndDepositionFeatures: identifyCoastalErosionAndDepositionFeatures_Skill_Data,
    interpretGeographicPatternsOfOceanCurrents: interpretGeographicPatternsOfOceanCurrents_Skill_Data,
    interpretGeographicPatternsOfOceanTides: interpretGeographicPatternsOfOceanTides_Skill_Data,
  },
  description: {
    methodological: "Coastal and marine environments differ in exposure, enclosure, water movement, and relation to land. The emphasis is on geographic patterns and coastal form rather than detailed fluid dynamics.",
    frontend: {
      en: "Explore how waves, tides and currents affect coasts and oceans.",
    },
  },
});
