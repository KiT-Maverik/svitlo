import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const interpretContourSpacingAsTerrainSteepness_Skill_Data = buildSkillConfig({
  slug: "interpretContourSpacingAsTerrainSteepness",
  id: "e2bf9045-9b91-4446-bf20-935a2ea9eed2",
  name: {
    en: "Interpret contour spacing as terrain steepness",
  },
  description: {
    methodological: "Read closely spaced elevation contours as a steeper surface than widely spaced contours under the same interval.",
    frontend: {
      en: "Use contour spacing to recognize steep and gentle terrain.",
    },
  },
});
