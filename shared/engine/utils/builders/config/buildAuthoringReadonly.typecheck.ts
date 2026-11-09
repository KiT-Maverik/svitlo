import type { Skill_Config } from '@svitlo/contracts/taxonomy';
import { buildSkillConfig } from './buildSkillConfig.utils';
import { buildSkillGroupConfig } from './buildSkillGroupConfig.utils';
import { buildSkillDomainConfig } from './buildSkillDomainConfig.utils';

const names = {} as Skill_Config['name'];
const skill = buildSkillConfig({
  slug: 'testSkill',
  id: 'ae3a76b3-47eb-47b6-92df-2ffa7da52ceb',
  name: names,
  description: { methodological: 'English conceptual boundaries.', frontend: names },
});
// @ts-expect-error Skill slug is readonly.
skill.slug = 'changed';
// @ts-expect-error Skill names are readonly.
skill.name.uk = 'Changed';

const group = buildSkillGroupConfig({
  slug: 'testGroup',
  id: 'ae3a76b3-47eb-47b6-92df-2ffa7da52ceb',
  name: names,
  skills: { first: skill },
});
// @ts-expect-error Skill Group references are readonly.
group.skills.first = skill;

const domain = buildSkillDomainConfig({
  slug: 'testDomain',
  id: 'ae3a76b3-47eb-47b6-92df-2ffa7da52ceb',
  name: names,
  groups: { first: group },
});
// @ts-expect-error Skill Domain references are readonly.
domain.groups.first = group;

void [skill, group, domain];
