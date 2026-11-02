import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { aegeanBronzeAge_SkillGroup_Data } from './aegeanBronzeAge/aegeanBronzeAge.data';
import { greekCultureAndIdeas_SkillGroup_Data } from './greekCultureAndIdeas/greekCultureAndIdeas.data';
import { greekPoleis_SkillGroup_Data } from './greekPoleis/greekPoleis.data';
import { macedoniaAndHellenisticWorld_SkillGroup_Data } from './macedoniaAndHellenisticWorld/macedoniaAndHellenisticWorld.data';
import { romanEmpire_SkillGroup_Data } from './romanEmpire/romanEmpire.data';
import { romanRepublic_SkillGroup_Data } from './romanRepublic/romanRepublic.data';

export const ancientMediterranean_SkillDomain_Data = buildSkillDomainConfig({
  slug: "ancientMediterranean",
  id: "af195a28-6cbe-4020-b737-663f4bd36ccb",
  name: {
    en: "Середземномор'я",
  },
  groups: {
    aegeanBronzeAge: aegeanBronzeAge_SkillGroup_Data,
    greekCultureAndIdeas: greekCultureAndIdeas_SkillGroup_Data,
    greekPoleis: greekPoleis_SkillGroup_Data,
    macedoniaAndHellenisticWorld: macedoniaAndHellenisticWorld_SkillGroup_Data,
    romanEmpire: romanEmpire_SkillGroup_Data,
    romanRepublic: romanRepublic_SkillGroup_Data,
  },
  description: {
    methodological: "Aegean societies, Greek poleis, Hellenistic kingdoms, and Rome formed an interconnected but heterogeneous Mediterranean world.",
    frontend: {
      en: "Explore how different ancient societies shaped the Mediterranean.",
    },
  },
});
