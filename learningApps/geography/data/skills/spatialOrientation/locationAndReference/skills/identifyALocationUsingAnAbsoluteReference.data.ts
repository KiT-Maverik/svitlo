import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyALocationUsingAnAbsoluteReference_Skill_Data = buildSkillConfig({
  slug: "identifyALocationUsingAnAbsoluteReference",
  id: "fd9370d5-f116-45b4-87c0-42235599551b",
  name: {
    en: "Identify a location using an absolute reference",
  },
  description: {
    methodological: "Use a stable agreed identifier, such as a coordinate pair in a named system or an address within a specified jurisdiction, to locate a place independently of a movable observer. Interpreting latitude and longitude is a separate cartographic competency.",
    frontend: {
      en: "Locate a place using a stable reference such as an address or coordinates.",
    },
  },
});
