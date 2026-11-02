import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { collaborativeDigitalProductDevelopment_SkillGroup_Data } from './collaborativeDigitalProductDevelopment/collaborativeDigitalProductDevelopment.data';
import { gitVersionControl_SkillGroup_Data } from './gitVersionControl/gitVersionControl.data';
import { openSource_SkillGroup_Data } from './openSource/openSource.data';

export const gitAndOpenSource_SkillDomain_Data = buildSkillDomainConfig({
  slug: "gitAndOpenSource",
  id: "ecbff879-3706-40da-a4c1-0cdeb2611bb8",
  name: {
    en: "Git and Open Source",
  },
  groups: {
    collaborativeDigitalProductDevelopment: collaborativeDigitalProductDevelopment_SkillGroup_Data,
    gitVersionControl: gitVersionControl_SkillGroup_Data,
    openSource: openSource_SkillGroup_Data,
  },
  description: {
    methodological: "A distinct subject area covering software change history, collaboration in repositories, and licensed cooperative software creation rather than an automatic component of every digital lesson.",
    frontend: {
      en: "Explore how developers track changes, collaborate and share software with clear permissions.",
    },
  },
});
