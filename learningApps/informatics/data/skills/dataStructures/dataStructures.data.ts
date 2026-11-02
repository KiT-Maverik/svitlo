import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { dictionaries_SkillGroup_Data } from './dictionaries/dictionaries.data';
import { graphs_SkillGroup_Data } from './graphs/graphs.data';
import { queue_SkillGroup_Data } from './queue/queue.data';
import { sequences_SkillGroup_Data } from './sequences/sequences.data';
import { sets_SkillGroup_Data } from './sets/sets.data';
import { stack_SkillGroup_Data } from './stack/stack.data';
import { structureSelection_SkillGroup_Data } from './structureSelection/structureSelection.data';
import { trees_SkillGroup_Data } from './trees/trees.data';

export const dataStructures_SkillDomain_Data = buildSkillDomainConfig({
  slug: "dataStructures",
  id: "5babb94d-b2d6-45b8-9ccf-c81e976de325",
  name: {
    en: "Data Structures",
  },
  groups: {
    dictionaries: dictionaries_SkillGroup_Data,
    graphs: graphs_SkillGroup_Data,
    queue: queue_SkillGroup_Data,
    sequences: sequences_SkillGroup_Data,
    sets: sets_SkillGroup_Data,
    stack: stack_SkillGroup_Data,
    structureSelection: structureSelection_SkillGroup_Data,
    trees: trees_SkillGroup_Data,
  },
  description: {
    methodological: "Organization of values in sequences, stacks, queues, dictionaries, sets, trees, and graphs, including access, modification, and selection of appropriate structures. A structure is not an algorithm for processing it.",
    frontend: {
      en: "Learn how collections, keys, trees and networks organize data for different operations.",
    },
  },
});
