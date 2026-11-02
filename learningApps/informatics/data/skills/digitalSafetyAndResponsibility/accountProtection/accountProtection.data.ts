import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { assessAnEmailSendersAuthenticity_Skill_Data, assessTheRiskOfFollowingALink_Skill_Data, configureMultiFactorAuthentication_Skill_Data, createAStrongPassphrase_Skill_Data, explainMultiFactorAuthentication_Skill_Data, explainWhySoftwareUpdatesMatter_Skill_Data, recognizeAPhishingMessage_Skill_Data, respondToSuspiciousDigitalContact_Skill_Data, verifyAWebsitesDomain_Skill_Data } from './skills';

export const accountProtection_SkillGroup_Data = buildSkillGroupConfig({
  slug: "accountProtection",
  id: "2f427b97-a872-4c05-a2bb-72e839f8fb87",
  name: {
    en: "Account Protection",
  },
  skills: {
    assessAnEmailSendersAuthenticity: assessAnEmailSendersAuthenticity_Skill_Data,
    assessTheRiskOfFollowingALink: assessTheRiskOfFollowingALink_Skill_Data,
    configureMultiFactorAuthentication: configureMultiFactorAuthentication_Skill_Data,
    createAStrongPassphrase: createAStrongPassphrase_Skill_Data,
    explainMultiFactorAuthentication: explainMultiFactorAuthentication_Skill_Data,
    explainWhySoftwareUpdatesMatter: explainWhySoftwareUpdatesMatter_Skill_Data,
    recognizeAPhishingMessage: recognizeAPhishingMessage_Skill_Data,
    respondToSuspiciousDigitalContact: respondToSuspiciousDigitalContact_Skill_Data,
    verifyAWebsitesDomain: verifyAWebsitesDomain_Skill_Data,
  },
  description: {
    methodological: "Reducing unauthorized access involves strong passwords, independent authentication factors, phishing detection, link risk assessment, address verification, and safe responses to contacts. Technical security settings and behavioral choices reinforce one another.",
    frontend: {
      en: "Explore how to protect accounts and respond to suspicious messages.",
    },
  },
});
