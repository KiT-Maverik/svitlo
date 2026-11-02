import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainTheStructureOfASoftwareObject_Skill_Data = buildSkillConfig({
  slug: "explainTheStructureOfASoftwareObject",
  id: "a827a8b7-36b9-48f5-8295-32019503251d",
  name: {
    en: "Explain the Structure of a Software Object",
  },
  description: {
    methodological: "Analyze a given object's identity, the properties storing state values, and methods defining its operations. For example, two Counter instances can share `increment()` yet have different `count` values. This concerns understanding an existing software structure rather than independently choosing its parts.",
    frontend: {
      en: "Identify the identity, properties and methods of an existing software object.",
    },
  },
});
