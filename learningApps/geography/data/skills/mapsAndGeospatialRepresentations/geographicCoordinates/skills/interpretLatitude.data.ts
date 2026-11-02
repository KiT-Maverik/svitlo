import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const interpretLatitude_Skill_Data = buildSkillConfig({
  slug: "interpretLatitude",
  id: "b7bfe83d-5dec-44cb-abc4-a52e29f84bcc",
  name: {
    en: "Interpret latitude",
  },
  description: {
    methodological: "Recognize the Equator as zero latitude and compare how far a point lies toward either pole.",
    frontend: {
      en: "Read latitude as a position north or south of the Equator.",
    },
  },
});
