import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { groupDynamics_SkillGroup_Data } from './groupDynamics/groupDynamics.data';
import { influenceAndPersuasion_SkillGroup_Data } from './influenceAndPersuasion/influenceAndPersuasion.data';
import { relationshipsAndCommunication_SkillGroup_Data } from './relationshipsAndCommunication/relationshipsAndCommunication.data';
import { socialPerception_SkillGroup_Data } from './socialPerception/socialPerception.data';

export const socialPsychology_SkillDomain_Data = buildSkillDomainConfig({
  slug: "socialPsychology",
  id: "bb5e56e5-17d7-4ae3-aac3-260f60352c56",
  name: {
    en: "Social Psychology",
  },
  groups: {
    groupDynamics: groupDynamics_SkillGroup_Data,
    influenceAndPersuasion: influenceAndPersuasion_SkillGroup_Data,
    relationshipsAndCommunication: relationshipsAndCommunication_SkillGroup_Data,
    socialPerception: socialPerception_SkillGroup_Data,
  },
  description: {
    methodological: "Thought and behavior change in the actual or imagined presence of others. Social processes involve interpretation, group membership, influence, and relationships without assuming all people respond alike.",
    frontend: {
      en: "Discover how other people influence our beliefs, actions and relationships.",
    },
  },
});
