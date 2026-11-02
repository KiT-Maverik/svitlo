import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const testTheBalanceOfASimpleGame_Skill_Data = buildSkillConfig({
  slug: "testTheBalanceOfASimpleGame",
  id: "bbb9fc02-f6b5-4cfd-acb3-589509ee959d",
  name: {
    en: "Test the Balance of a Simple Game",
  },
  description: {
    methodological: "Test whether rules and limitations make one choice always winning or render a game impossible to finish; compare outcomes with the design goal. Balance depends on game objectives; equal odds for every action are not universal requirements.",
    frontend: {
      en: "Test whether a game's rules make it fair, challenging and possible to finish.",
    },
  },
});
