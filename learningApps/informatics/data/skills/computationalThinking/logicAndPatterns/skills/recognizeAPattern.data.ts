import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const recognizeAPattern_Skill_Data = buildSkillConfig({
  slug: "recognizeAPattern",
  id: "19dbf903-354a-41cb-90a1-07633df5f480",
  name: {
    en: "Recognize a Pattern",
  },
  description: {
    methodological: "Infer a rule governing changes in a sequence's values or structure and test it against several elements. An observed repetition suggests a rule but does not guarantee what unseen data will contain.",
    frontend: {
      en: "Recognize patterns in sequences and check whether a proposed rule fits.",
    },
  },
});
