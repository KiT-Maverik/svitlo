import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const accessASequenceElementByIndex_Skill_Data = buildSkillConfig({
  slug: "accessASequenceElementByIndex",
  id: "4e72e841-71fa-4a8f-9800-96aacd392d0a",
  name: {
    en: "Access a Sequence Element by Index",
  },
  description: {
    methodological: "Retrieve an element of an ordered collection by its position, accounting for indexing origin and valid bounds in the selected language.",
    frontend: {
      en: "Retrieve a sequence item using its index without going outside valid positions.",
    },
  },
});
