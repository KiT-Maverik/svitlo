import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainAerodynamicLift_Skill_Data = buildSkillConfig({
  slug: "explainAerodynamicLift",
  id: "a43841f0-4bc5-496f-abe9-3ed421012e34",
  name: {
    en: "Explain aerodynamic lift",
  },
  description: {
    methodological: "Airflow interacting with a body can produce a force perpendicular to the flow; it should not be explained solely by differences in air-path length.",
    frontend: {
      en: "Explore how airflow can produce lift without relying on a false equal-path explanation.",
    },
  },
});
