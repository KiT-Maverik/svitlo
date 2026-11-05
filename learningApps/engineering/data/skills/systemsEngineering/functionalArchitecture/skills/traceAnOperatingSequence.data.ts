import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const traceAnOperatingSequence_Skill_Data = buildSkillConfig({
  slug: 'traceAnOperatingSequence',
  id: '31e4a562-9672-4145-afba-6462233624e8',
  name: {
    en: 'Trace an operating sequence',
  },
  description: {
    methodological: 'Describe the causal order of events through startup, normal operation or shutdown.',
    frontend: {
      en: 'Follow the events involved in starting, using and stopping a system.',
    },
  },
});
