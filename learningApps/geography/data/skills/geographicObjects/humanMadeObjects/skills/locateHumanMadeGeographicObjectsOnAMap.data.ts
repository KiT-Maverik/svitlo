import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const locateHumanMadeGeographicObjectsOnAMap_Skill_Data = buildSkillConfig({
  slug: "locateHumanMadeGeographicObjectsOnAMap",
  id: "117274cb-f401-4cba-a17b-7b115cb3e8ff",
  name: {
    en: "Locate human-made geographic objects on a map",
  },
  description: {
    methodological: "Identify the location of a described settlement or infrastructure feature using its representation and spatial relationships, independently of its engineering design or ownership.",
    frontend: {
      en: "Find settlements and infrastructure features using a map and spatial clues.",
    },
  },
});
