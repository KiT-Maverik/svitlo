import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const createAStrongPassphrase_Skill_Data = buildSkillConfig({
  slug: "createAStrongPassphrase",
  id: "a6c3728d-8d3d-4cf1-a5d9-d5494d64706a",
  name: {
    en: "Create a Strong Passphrase",
  },
  description: {
    methodological: "Select a sufficiently long, unpredictable, account-specific sequence of words or symbols without readily accessible personal details. Do not require daily password changes without a reason or mistake character variety for overall security.",
    frontend: {
      en: "Create long, unpredictable passphrases that are different for each account.",
    },
  },
});
