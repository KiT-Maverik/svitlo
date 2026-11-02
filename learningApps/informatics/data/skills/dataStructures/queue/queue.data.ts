import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { dequeueAnElement_Skill_Data, enqueueAnElement_Skill_Data, explainFIFO_Skill_Data } from './skills';

export const queue_SkillGroup_Data = buildSkillGroupConfig({
  slug: "queue",
  id: "b02a645d-3062-4d00-90c6-0e9ae9958d87",
  name: {
    en: "Queue",
  },
  skills: {
    dequeueAnElement: dequeueAnElement_Skill_Data,
    enqueueAnElement: enqueueAnElement_Skill_Data,
    explainFIFO: explainFIFO_Skill_Data,
  },
  description: {
    methodological: "A structure following first-in, first-out (FIFO) order: elements join at the back and leave from the front.",
    frontend: {
      en: "Learn how a queue processes items in the order they arrived.",
    },
  },
});
