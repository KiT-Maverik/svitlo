import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { canalLocks_Skill_Data, compareChannelsAndPipes_Skill_Data, flowControlValves_Skill_Data } from './skills';

export const hydraulicInfrastructure_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'hydraulicInfrastructure',
  id: '2eecd113-1105-4b05-9538-76847e2ac730',
  name: {
    en: 'Hydraulic Infrastructure',
  },
  skills: {
    canalLocks: canalLocks_Skill_Data,
    compareChannelsAndPipes: compareChannelsAndPipes_Skill_Data,
    flowControlValves: flowControlValves_Skill_Data,
  },
  description: {
    methodological:
      'Flow and water levels can be regulated by built chambers, gates and channels that connect transport or supply routes.',
    frontend: {
      en: 'Discover how canals, locks and valves manage moving water.',
    },
  },
});
