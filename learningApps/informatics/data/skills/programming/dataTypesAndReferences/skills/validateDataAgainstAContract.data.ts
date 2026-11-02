import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const validateDataAgainstAContract_Skill_Data = buildSkillConfig({
  slug: "validateDataAgainstAContract",
  id: "c148f5f4-d326-4263-b3bd-ded33b46cd8b",
  name: {
    en: "Validate Data Against a Contract",
  },
  description: {
    methodological: "Identify when received values violate an expected type or format and use validation or explicit conversion instead of silently assuming compatibility.",
    frontend: {
      en: "Check whether input matches a required type or structure before using it.",
    },
  },
});
