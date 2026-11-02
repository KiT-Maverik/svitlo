import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { ancientEgypt_SkillGroup_Data } from './ancientEgypt/ancientEgypt.data';
import { hornOfAfrica_SkillGroup_Data } from './hornOfAfrica/hornOfAfrica.data';
import { northAfricaBeyondTheNile_SkillGroup_Data } from './northAfricaBeyondTheNile/northAfricaBeyondTheNile.data';
import { nubiaAndKush_SkillGroup_Data } from './nubiaAndKush/nubiaAndKush.data';
import { saharaAndSubSaharanAfrica_SkillGroup_Data } from './saharaAndSubSaharanAfrica/saharaAndSubSaharanAfrica.data';

export const ancientAfrica_SkillDomain_Data = buildSkillDomainConfig({
  slug: "ancientAfrica",
  id: "c73e038b-1bfd-421b-adb5-b75dd00cebb0",
  name: {
    en: "Африка",
  },
  groups: {
    ancientEgypt: ancientEgypt_SkillGroup_Data,
    hornOfAfrica: hornOfAfrica_SkillGroup_Data,
    northAfricaBeyondTheNile: northAfricaBeyondTheNile_SkillGroup_Data,
    nubiaAndKush: nubiaAndKush_SkillGroup_Data,
    saharaAndSubSaharanAfrica: saharaAndSubSaharanAfrica_SkillGroup_Data,
  },
  description: {
    methodological: "Africa's ancient history extends beyond the Nile through independent political traditions, migrations, crafts, trade, and adaptation to varied environments.",
    frontend: {
      en: "Explore the varied societies and cultures of ancient Africa.",
    },
  },
});
