import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishAPrivateChatFromAPublicLink_Skill_Data = buildSkillConfig({
  slug: "distinguishAPrivateChatFromAPublicLink",
  id: "cda01f72-5e9e-40a0-a12d-521db4611ec4",
  name: {
    en: "Distinguish a Private Chat from a Public Link",
  },
  description: {
    methodological: "Check who can access a shared conversation or document; do not automatically assume a link is private.",
    frontend: {
      en: "Check who can open a shared chat or document rather than assuming its link is private.",
    },
  },
});
