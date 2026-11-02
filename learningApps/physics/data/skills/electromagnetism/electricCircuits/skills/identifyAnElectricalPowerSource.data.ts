import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyAnElectricalPowerSource_Skill_Data = buildSkillConfig({
  slug: "identifyAnElectricalPowerSource",
  id: "0d1b8c0c-20cc-450f-bbd6-623dab8ec2d3",
  name: {
    en: "Identify an electrical power source",
  },
  description: {
    methodological: "A source maintains a potential difference between its terminals and converts other forms of energy into electrical energy, unlike a passive conductor.",
    frontend: {
      en: "Identify the component that maintains a potential difference in a circuit.",
    },
  },
});
