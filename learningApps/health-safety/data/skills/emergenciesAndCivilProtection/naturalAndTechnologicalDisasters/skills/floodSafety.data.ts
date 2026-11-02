import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const floodSafety_Skill_Data = buildSkillConfig({
  slug: "floodSafety",
  id: "c3642cfc-6b35-41bd-9d5d-6a94afd0567d",
  name: {
    en: "Flood safety",
  },
  description: {
    methodological: "Avoid floodwater and unstable crossings, recognize sudden changes in water levels, and follow verified evacuation guidance.",
    frontend: {
      en: "Avoid floodwater and follow reliable instructions about dangerous rising water.",
    },
  },
});
