import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const indoorAirAndVentilation_Skill_Data = buildSkillConfig({
  slug: "indoorAirAndVentilation",
  id: "8af94903-ecd2-401d-84bd-e790c667be27",
  name: {
    en: "Indoor air and ventilation",
  },
  description: {
    methodological: "Identify circumstances in which fresh-air exchange and source control reduce airborne exposure, while accounting for outdoor hazards.",
    frontend: {
      en: "Use ventilation to reduce indoor exposure while considering outside hazards.",
    },
  },
});
