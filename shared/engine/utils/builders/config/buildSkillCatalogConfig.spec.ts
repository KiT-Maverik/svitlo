import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { DEFAULT_SUPPORTED_LANGUAGES } from '../../../localization';
import type { Skill_Config, SkillGroup_Config, SkillDomain_Config } from '../../../taxonomy';
import { buildSkillConfig, buildSkillGroupConfig, buildSkillDomainConfig } from '../../../taxonomy';

const names = () =>
  Object.fromEntries(
    DEFAULT_SUPPORTED_LANGUAGES.map(({ language }) => [language, 'A localized name']),
  ) as Skill_Config['name'];
const groupId = 'ae3a76b3-47eb-47b6-92df-2ffa7da52ceb' as const;
const domainId = '9de735b7-4bcd-4b58-8832-d2d5d15846cd' as const;
const skillId = '9d1e7906-fa72-4ac5-b313-b135333fb937' as const;
const skill = () =>
  buildSkillConfig({
    slug: 'testSkill',
    id: skillId,
    name: names(),
    description: {
      methodological: 'Skill meaning.',
      frontend: names(),
    },
  });

describe('Skill catalog builders', () => {
  it('retains complete child objects and collection discriminators', () => {
    const child = skill();
    const group = buildSkillGroupConfig({ slug: 'testGroup', id: groupId, name: names(), skills: { first: child } });
    const config = {
      slug: 'testDomain',
      id: domainId,
      name: names(),
      groups: { primary: group },
      skills: { direct: child },
    };
    const domain = buildSkillDomainConfig(config);
    assert.equal(group.collection, 'skillGroup');
    assert.equal(domain.collection, 'skillDomain');
    assert.strictEqual(group.skills.first, child);
    assert.strictEqual(domain.groups.primary, group);
    assert.strictEqual(domain.skills.direct, child);
    assert.notStrictEqual(domain, config);
    assert.equal(domain.groups.primary.skills.first.collection, 'skill');
  });

  it('rejects missing translations in groups and domains', () => {
    const partial = { ...names() } as Record<string, string>;
    delete partial.uk;
    assert.throws(
      () =>
        buildSkillGroupConfig({
          slug: 'testGroup',
          id: groupId,
          name: partial as SkillGroup_Config['name'],
          skills: { first: skill() },
        }),
      /uk/,
    );
    assert.throws(
      () =>
        buildSkillDomainConfig({
          slug: 'testDomain',
          id: domainId,
          name: partial as SkillDomain_Config['name'],
          groups: {},
          skills: { first: skill() },
        }),
      /uk/,
    );
  });

  it('rejects malformed child collections and duplicate child identities', () => {
    for (const children of [[], null, { first: '' }, { first: skillId }]) {
      assert.throws(
        () =>
          buildSkillGroupConfig({
            slug: 'testGroup',
            id: groupId,
            name: names(),
            skills: children as unknown as SkillGroup_Config['skills'],
          }),
        /SkillGroup skills/,
      );
    }
    assert.throws(
      () =>
        buildSkillGroupConfig({
          slug: 'testGroup',
          id: groupId,
          name: names(),
          skills: {},
        }),
      /SkillGroup skills must be non-empty/,
    );
    const child = skill();
    assert.throws(
      () =>
        buildSkillGroupConfig({
          slug: 'testGroup',
          id: groupId,
          name: names(),
          skills: { first: child, second: child },
        }),
      /duplicate id/,
    );
    assert.throws(
      () =>
        buildSkillDomainConfig({
          slug: 'testDomain',
          id: domainId,
          name: names(),
          groups: null as unknown as SkillDomain_Config['groups'],
        }),
      /SkillDomain groups/,
    );
  });

  it('requires one or more children, but does not forbid mixing', () => {
    const child = skill();
    const group = buildSkillGroupConfig({ slug: 'testGroup', id: groupId, name: names(), skills: { first: child } });
    assert.throws(
      () =>
        buildSkillDomainConfig({
          slug: 'testDomain',
          id: domainId,
          name: names(),
          groups: {},
          skills: {},
        }),
      /at least one Group or direct Skill/,
    );
    assert.equal(
      buildSkillDomainConfig({
        slug: 'testDomain',
        id: domainId,
        name: names(),
        groups: { primary: group },
        skills: { direct: child },
      }).collection,
      'skillDomain',
    );
  });

  it('does not add fileLocation or mutate the original config', () => {
    const config = { slug: 'testGroup', id: groupId, name: names(), skills: { first: skill() } };
    const group = buildSkillGroupConfig(config);
    assert.deepEqual(Object.keys(group).sort(), ['collection', 'id', 'name', 'skills', 'slug']);
    assert.strictEqual(group.skills, config.skills);
    assert.ok(!('collection' in config));
    assert.ok(!('fileLocation' in group));
  });
});
