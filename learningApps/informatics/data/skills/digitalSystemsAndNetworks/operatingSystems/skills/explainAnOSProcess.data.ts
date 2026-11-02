import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainAnOSProcess_Skill_Data = buildSkillConfig({
  slug: "explainAnOSProcess",
  id: "b8101fdb-f626-4995-be7c-e05e25a8e3a2",
  name: {
    en: "Explain an OS Process",
  },
  description: {
    methodological: "A running program has current state and allocated resources; a program file on disk is not itself a process.",
    frontend: {
      en: "Distinguish a running process from the program file stored on disk.",
    },
  },
});
