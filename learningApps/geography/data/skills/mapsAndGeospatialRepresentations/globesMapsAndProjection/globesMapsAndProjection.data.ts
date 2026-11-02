import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishAGlobeFromAFlatMapAsEarthModels_Skill_Data, recognizeProjectionDistortionInAreaOrShape_Skill_Data, selectAGeographicRepresentationForAPurpose_Skill_Data } from './skills';

export const globesMapsAndProjection_SkillGroup_Data = buildSkillGroupConfig({
  slug: "globesMapsAndProjection",
  id: "ff4e9a7d-282b-4e27-a446-b470dfd89cf0",
  name: {
    en: "Globes, Maps, and Projection",
  },
  skills: {
    distinguishAGlobeFromAFlatMapAsEarthModels: distinguishAGlobeFromAFlatMapAsEarthModels_Skill_Data,
    recognizeProjectionDistortionInAreaOrShape: recognizeProjectionDistortionInAreaOrShape_Skill_Data,
    selectAGeographicRepresentationForAPurpose: selectAGeographicRepresentationForAPurpose_Skill_Data,
  },
  description: {
    methodological: "A spherical Earth cannot be shown on a flat sheet without some distortion, and different representations support different questions. Choosing one is a reasoning decision rather than a display preference.",
    frontend: {
      en: "Explore how maps and globes represent Earth's curved surface in different ways.",
    },
  },
});
