import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { goalPursuitAndSelfControl_SkillGroup_Data } from './goalPursuitAndSelfControl/goalPursuitAndSelfControl.data';
import { habitMechanisms_SkillGroup_Data } from './habitMechanisms/habitMechanisms.data';
import { motivationalMechanisms_SkillGroup_Data } from './motivationalMechanisms/motivationalMechanisms.data';

export const motivationGoalsAndHabits_SkillDomain_Data = buildSkillDomainConfig({
  slug: "motivationGoalsAndHabits",
  id: "14003706-7eb5-4c06-b244-5ddcb6e450a7",
  name: {
    en: "Motivation, Goals, and Habits",
  },
  groups: {
    goalPursuitAndSelfControl: goalPursuitAndSelfControl_SkillGroup_Data,
    habitMechanisms: habitMechanisms_SkillGroup_Data,
    motivationalMechanisms: motivationalMechanisms_SkillGroup_Data,
  },
  description: {
    methodological: "Motivation concerns what initiates, directs, and sustains action. Goals and habits reflect interactions among needs, rewards, expectations, self-control, and environmental cues rather than an unchanging amount of willpower.",
    frontend: {
      en: "Explore why people act, pursue goals and develop automatic routines.",
    },
  },
});
