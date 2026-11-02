import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const traceTechnicalFaults_Skill_Data = buildSkillConfig({
  slug: "traceTechnicalFaults",
  id: "9c1ede4e-664a-4096-9284-507be793e26c",
  name: {
    en: "Trace technical faults",
  },
  description: {
    methodological: "Use symptoms and dependencies to locate a likely malfunction in a connected system.",
    frontend: {
      en: "Trace the symptoms of a malfunction through dependent components.",
    },
  },
});
