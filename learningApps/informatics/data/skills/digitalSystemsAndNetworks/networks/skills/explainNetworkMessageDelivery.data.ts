import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainNetworkMessageDelivery_Skill_Data = buildSkillConfig({
  slug: "explainNetworkMessageDelivery",
  id: "8c0afe9a-0d97-4afc-a89e-e8ea8f002cbb",
  name: {
    en: "Explain Network Message Delivery",
  },
  description: {
    methodological: "Model a data path from a sender through intermediary network nodes to the recipient; separate destination addressing and transport from message content. Delivery need not occur over one direct physical cable.",
    frontend: {
      en: "Trace how messages travel through network devices to their destination.",
    },
  },
});
