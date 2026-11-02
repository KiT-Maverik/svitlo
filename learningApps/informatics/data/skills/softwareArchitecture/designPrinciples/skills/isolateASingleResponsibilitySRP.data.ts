import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const isolateASingleResponsibilitySRP_Skill_Data = buildSkillConfig({
  slug: "isolateASingleResponsibilitySRP",
  id: "3da073e9-ec55-4ab5-94c7-20664d21e94d",
  name: {
    en: "Isolate a Single Responsibility (SRP)",
  },
  description: {
    methodological: "Explain why a module should be organized around one coherent reason to change rather than independent needs of different stakeholders. A class can have many methods if they all support that responsibility.",
    frontend: {
      en: "Organize a module around one coherent reason to change.",
    },
  },
});
