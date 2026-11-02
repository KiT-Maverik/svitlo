import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const describeALocationRelativeToAReferencePoint_Skill_Data = buildSkillConfig({
  slug: "describeALocationRelativeToAReferencePoint",
  id: "358058fc-13d9-403e-a25a-f08cfd8d9a2d",
  name: {
    en: "Describe a location relative to a reference point",
  },
  description: {
    methodological: "Express where a place lies by referring to another identifiable object or location, such as 'east of the station' or 'next to the bridge'. The statement changes meaning when its reference point changes.",
    frontend: {
      en: "Describe where something is in relation to another identifiable place.",
    },
  },
});
