import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const selectAGeographicRepresentationForAPurpose_Skill_Data = buildSkillConfig({
  slug: "selectAGeographicRepresentationForAPurpose",
  id: "3a1cb473-69f6-4eeb-b7e9-8044cf40e73a",
  name: {
    en: "Select a geographic representation for a purpose",
  },
  description: {
    methodological: "Choose a globe, world or regional map, or detailed street plan according to the required spatial extent, scale and projection properties. This concerns the _representation and coverage_; choosing the subject matter of a political, geological or population map is a separate Skill.",
    frontend: {
      en: "Choose between a globe, broad-area map and detailed plan for a geographic purpose.",
    },
  },
});
