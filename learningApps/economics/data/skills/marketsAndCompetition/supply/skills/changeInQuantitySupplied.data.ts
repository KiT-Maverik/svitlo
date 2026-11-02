import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const changeInQuantitySupplied_Skill_Data = buildSkillConfig({
  slug: "changeInQuantitySupplied",
  id: "c31d2b2a-f83c-4434-972a-4cec905c4506",
  name: {
    en: "Зміна величини пропозиції",
  },
  description: {
    methodological: "Identify movement along an unchanged supply curve caused by the good's own price, other factors fixed; quantity supplied is what sellers are willing and able to offer, not necessarily actual sales.",
    frontend: {
      en: "Distinguish willingness to supply from what is actually sold.",
    },
  },
});
