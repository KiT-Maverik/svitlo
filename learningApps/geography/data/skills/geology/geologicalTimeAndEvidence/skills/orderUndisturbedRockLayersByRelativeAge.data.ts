import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const orderUndisturbedRockLayersByRelativeAge_Skill_Data = buildSkillConfig({
  slug: "orderUndisturbedRockLayersByRelativeAge",
  id: "c22de2a5-b447-4971-bb8d-84410b80ecc6",
  name: {
    en: "Order undisturbed rock layers by relative age",
  },
  description: {
    methodological: "Infer that in an originally deposited, undisturbed sedimentary sequence lower layers are generally older than higher layers, and recognize that folding or faulting can complicate the pattern.",
    frontend: {
      en: "Use rock-layer order to infer which layers are older in an undisturbed sequence.",
    },
  },
});
