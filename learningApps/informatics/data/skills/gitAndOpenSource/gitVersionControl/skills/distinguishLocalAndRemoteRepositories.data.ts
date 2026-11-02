import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishLocalAndRemoteRepositories_Skill_Data = buildSkillConfig({
  slug: "distinguishLocalAndRemoteRepositories",
  id: "acd4b51c-984a-4310-b1da-5e6e75cbc3ff",
  name: {
    en: "Distinguish Local and Remote Repositories",
  },
  description: {
    methodological: "A local repository supports independent committing, while a remote repository enables sharing between contributors.",
    frontend: {
      en: "Distinguish work stored on your computer from copies shared through remotes.",
    },
  },
});
