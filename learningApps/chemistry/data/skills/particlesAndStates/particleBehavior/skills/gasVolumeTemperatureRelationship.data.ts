import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const gasVolumeTemperatureRelationship_Skill_Data = buildSkillConfig({
  slug: "gasVolumeTemperatureRelationship",
  id: "6fe238cc-f9e4-4a52-b983-58ccc84246ab",
  name: {
    en: "Gas Volume–Temperature Relationship",
  },
  description: {
    methodological: "Relate gas volume to absolute temperature when pressure and gas amount remain fixed under appropriate conditions.",
    frontend: {
      en: "Connect gas volume with absolute temperature under fixed pressure.",
    },
  },
});
