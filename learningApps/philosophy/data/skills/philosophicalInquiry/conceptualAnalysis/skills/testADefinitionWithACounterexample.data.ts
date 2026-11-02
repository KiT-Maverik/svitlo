import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const testADefinitionWithACounterexample_Skill_Data = buildSkillConfig({
  slug: "testADefinitionWithACounterexample",
  id: "7cc71512-7230-4b4c-8364-dd07dd74c900",
  name: {
    en: "Test a definition with a counterexample",
  },
  description: {
    methodological: "Find a case included or excluded incorrectly by a proposed definition and explain what the case reveals about its limits.",
    frontend: {
      en: "Challenge a definition by finding a case it handles incorrectly.",
    },
  },
});
