import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { chainOfResponsibility_Skill_Data, command_Skill_Data, interpreter_Skill_Data, iterator_Skill_Data, mediator_Skill_Data, memento_Skill_Data, observer_Skill_Data, state_Skill_Data, strategy_Skill_Data, templateMethod_Skill_Data, visitor_Skill_Data } from './skills';

export const behavioral_SkillGroup_Data = buildSkillGroupConfig({
  slug: "behavioral",
  id: "5c278519-00a4-4122-9d85-c576c398fb91",
  name: {
    en: "Behavioral",
  },
  skills: {
    chainOfResponsibility: chainOfResponsibility_Skill_Data,
    command: command_Skill_Data,
    interpreter: interpreter_Skill_Data,
    iterator: iterator_Skill_Data,
    mediator: mediator_Skill_Data,
    memento: memento_Skill_Data,
    observer: observer_Skill_Data,
    state: state_Skill_Data,
    strategy: strategy_Skill_Data,
    templateMethod: templateMethod_Skill_Data,
    visitor: visitor_Skill_Data,
  },
  description: {
    methodological: "Eleven approaches to handling requests, selecting algorithms, delivering notifications, managing state, and distributing responsibility.",
    frontend: {
      en: "Explore ways objects coordinate requests and change behavior.",
    },
  },
});
