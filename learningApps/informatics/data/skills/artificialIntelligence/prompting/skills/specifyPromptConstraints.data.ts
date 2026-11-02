import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const specifyPromptConstraints_Skill_Data = buildSkillConfig({
  slug: "specifyPromptConstraints",
  id: "c3fe58c1-9d38-4457-9f4b-0238f2bf5918",
  name: {
    en: "Specify Prompt Constraints",
  },
  description: {
    methodological: "Define the boundaries of acceptable output, such as permitted sources, length, exclusions, or a prohibition on inventing missing data. Unlike the objective, constraints define which responses are not acceptable.",
    frontend: {
      en: "Specify boundaries such as length, sources and information that must not be invented.",
    },
  },
});
