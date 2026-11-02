import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishRAMROMAndStorage_Skill_Data = buildSkillConfig({
  slug: "distinguishRAMROMAndStorage",
  id: "ed6e27d5-70d8-4241-9b74-10f093ac2ed3",
  name: {
    en: "Distinguish RAM, ROM, and Storage",
  },
  description: {
    methodological: "Working memory, firmware memory, and storage for user files serve different purposes; the term 'permanent memory' is ambiguous without context.",
    frontend: {
      en: "Compare what RAM, ROM and persistent storage are designed to hold.",
    },
  },
});
