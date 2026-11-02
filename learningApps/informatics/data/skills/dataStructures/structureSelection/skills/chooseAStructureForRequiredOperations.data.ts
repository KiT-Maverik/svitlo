import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const chooseAStructureForRequiredOperations_Skill_Data = buildSkillConfig({
  slug: "chooseAStructureForRequiredOperations",
  id: "a76b95ef-efed-47ce-a4de-5056e19e0f22",
  name: {
    en: "Choose a Structure for Required Operations",
  },
  description: {
    methodological: "Identify whether a task needs positional indexing, uniqueness, key lookup, FIFO/LIFO order, or hierarchical relationships.",
    frontend: {
      en: "Select a collection that suits indexing, membership, queues or relationships.",
    },
  },
});
