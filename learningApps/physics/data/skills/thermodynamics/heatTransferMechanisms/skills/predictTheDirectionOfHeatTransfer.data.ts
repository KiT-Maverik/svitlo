import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const predictTheDirectionOfHeatTransfer_Skill_Data = buildSkillConfig({
  slug: "predictTheDirectionOfHeatTransfer",
  id: "f256429d-bbdd-42e3-adf2-600c0a375361",
  name: {
    en: "Predict the direction of heat transfer",
  },
  description: {
    methodological: "In the absence of external work, heat spontaneously flows from a warmer body to a colder one until thermal equilibrium is reached.",
    frontend: {
      en: "Predict which way thermal energy flows between objects at different temperatures.",
    },
  },
});
