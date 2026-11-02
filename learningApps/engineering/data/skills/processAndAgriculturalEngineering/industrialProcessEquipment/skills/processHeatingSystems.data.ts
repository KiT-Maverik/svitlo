import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const processHeatingSystems_Skill_Data = buildSkillConfig({
  slug: "processHeatingSystems",
  id: "0771fce1-c22f-4ea3-91ee-c5a294e4284c",
  name: {
    en: "Process heating systems",
  },
  description: {
    methodological: "Trace heat delivery and temperature regulation through industrial apparatus rather than treating a heater as an isolated element.",
    frontend: {
      en: "Trace how heating equipment transfers energy to a process stream.",
    },
  },
});
