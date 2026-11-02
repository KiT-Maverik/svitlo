import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const specifyAnOutputFormat_Skill_Data = buildSkillConfig({
  slug: "specifyAnOutputFormat",
  id: "27de7e92-d880-4429-8c99-bc65f7babec4",
  name: {
    en: "Specify an Output Format",
  },
  description: {
    methodological: "Describe the required structure, such as a table with named columns or JSON with defined fields, without confusing formatting with factual correctness.",
    frontend: {
      en: "Ask for an explicit output structure such as a table or defined fields.",
    },
  },
});
