import type { SkillGroup_Config } from '../../../taxonomy';
import { buildSkillConfig, buildSkillGroupConfig, buildSkillDomainConfig } from '../../../taxonomy';

declare const names: SkillGroup_Config['name'];
const child = buildSkillConfig({
  slug: 'testEntity',
  id: '9de735b7-4bcd-4b58-8832-d2d5d15846cd',
  name: names,
  description: { methodological: 'A defined Skill.', frontend: names },
});
const group = buildSkillGroupConfig({
  slug: 'testEntity',
  id: 'ae3a76b3-47eb-47b6-92df-2ffa7da52ceb',
  name: names,
  skills: { basic: child },
});
const groupId: 'ae3a76b3-47eb-47b6-92df-2ffa7da52ceb' = group.id;
void groupId;
const groupCollection: 'skillGroup' = group.collection;
void groupCollection;
const childCollection: 'skill' = group.skills.basic.collection;
void childCollection;
const domain = buildSkillDomainConfig({
  slug: 'testEntity',
  id: '9de735b7-4bcd-4b58-8832-d2d5d15846cd',
  name: names,
  groups: { group },
  skills: { direct: child },
});
const domainCollection: 'skillDomain' = domain.collection;
void domainCollection;
const nestedSkill: 'skill' = domain.groups.group.skills.basic.collection;
void nestedSkill;
// @ts-expect-error Missing localized name.
buildSkillGroupConfig({
  slug: 'testEntity',
  id: 'ae3a76b3-47eb-47b6-92df-2ffa7da52ceb',
  skills: { basic: child },
});
// @ts-expect-error Missing Groups collection.
buildSkillDomainConfig({ slug: 'testDomain', id: '9de735b7-4bcd-4b58-8832-d2d5d15846cd', name: names });
buildSkillGroupConfig({
  slug: 'testEntity',
  id: 'ae3a76b3-47eb-47b6-92df-2ffa7da52ceb',
  name: names,
  skills: {
    // @ts-expect-error A UUID string is not a built Skill entity.
    basic: '9de735b7-4bcd-4b58-8832-d2d5d15846cd',
  },
});
buildSkillDomainConfig({
  slug: 'testEntity',
  id: '9de735b7-4bcd-4b58-8832-d2d5d15846cd',
  name: names,
  groups: {
    // @ts-expect-error A UUID string is not a built Group entity.
    bad: 'ae3a76b3-47eb-47b6-92df-2ffa7da52ceb',
  },
});
