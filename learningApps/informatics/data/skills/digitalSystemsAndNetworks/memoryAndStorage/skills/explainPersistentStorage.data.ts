import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainPersistentStorage_Skill_Data = buildSkillConfig({
  slug: "explainPersistentStorage",
  id: "c29594da-7041-478d-9168-82eadbb6dbb7",
  name: {
    en: "Explain Persistent Storage",
  },
  description: {
    methodological: "An SSD, flash memory, or another nonvolatile medium stores files without continuous power, unlike the typical working state held in RAM.",
    frontend: {
      en: "Understand why storage devices preserve files after power is switched off.",
    },
  },
});
