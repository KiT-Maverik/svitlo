import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const chemicalIncidentProtection_Skill_Data = buildSkillConfig({
  slug: "chemicalIncidentProtection",
  id: "e4f7969b-0328-406a-85ee-b0decf750b79",
  name: {
    en: "Chemical incident protection",
  },
  description: {
    methodological: "Follow authoritative shelter or evacuation directions and avoid direct exposure or self-directed decontamination beyond safe guidance.",
    frontend: {
      en: "Follow verified protective instructions during a chemical release.",
    },
  },
});
