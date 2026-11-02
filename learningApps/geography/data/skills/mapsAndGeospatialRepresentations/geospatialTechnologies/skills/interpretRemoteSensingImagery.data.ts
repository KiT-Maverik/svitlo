import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const interpretRemoteSensingImagery_Skill_Data = buildSkillConfig({
  slug: "interpretRemoteSensingImagery",
  id: "e55f4186-858c-462d-91f7-adb25f70eab1",
  name: {
    en: "Interpret remote-sensing imagery",
  },
  description: {
    methodological: "Use spatial patterns, scale, source limitations and visible characteristics in aerial or satellite observations to infer geographic features and land-cover change. Comparing two dated images is one application of this competence.",
    frontend: {
      en: "Interpret aerial or satellite images to investigate geographic features and change.",
    },
  },
});
