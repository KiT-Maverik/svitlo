import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { describingMotion_SkillGroup_Data } from './describingMotion/describingMotion.data';
import { inertiaAndChangesInMotion_SkillGroup_Data } from './inertiaAndChangesInMotion/inertiaAndChangesInMotion.data';
import { momentumAndCollisions_SkillGroup_Data } from './momentumAndCollisions/momentumAndCollisions.data';
import { newtonsLaws_SkillGroup_Data } from './newtonsLaws/newtonsLaws.data';
import { rotationalMotion_SkillGroup_Data } from './rotationalMotion/rotationalMotion.data';
import { simpleMachines_SkillGroup_Data } from './simpleMachines/simpleMachines.data';

export const mechanics_SkillDomain_Data = buildSkillDomainConfig({
  slug: "mechanics",
  id: "8aad83d7-dbc9-428d-b369-66913e81649c",
  name: {
    en: "Mechanics",
  },
  groups: {
    describingMotion: describingMotion_SkillGroup_Data,
    inertiaAndChangesInMotion: inertiaAndChangesInMotion_SkillGroup_Data,
    momentumAndCollisions: momentumAndCollisions_SkillGroup_Data,
    newtonsLaws: newtonsLaws_SkillGroup_Data,
    rotationalMotion: rotationalMotion_SkillGroup_Data,
    simpleMachines: simpleMachines_SkillGroup_Data,
  },
  description: {
    methodological: "Mechanics describes changes in bodies' positions over time, the inertial properties of motion, and the transmission of mechanical action through simple systems. Basic explanations of types of forces and equilibrium are assigned to the neighboring Domain.",
    frontend: {
      en: "Explore how bodies move, resist changes and transfer motion through mechanical systems.",
    },
  },
});
