import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const decorator_Skill_Data = buildSkillConfig({
  slug: "decorator",
  id: "a6e9ebc0-ccc7-4a38-a328-442c168392b6",
  name: {
    en: "Decorator",
  },
  description: {
    methodological: "Add behavior through successive wrappers sharing an interface instead of creating a separate subclass for every combination.",
    frontend: {
      en: "Add behavior by wrapping an object instead of multiplying subclasses.",
    },
  },
});
