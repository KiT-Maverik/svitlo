import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { DEFAULT_SUPPORTED_LANGUAGES } from '../../../localization';
import type { SkillDomain_Config, Skill_Config } from '../../../taxonomy';
import { buildSkillConfig, buildSkillGroupConfig, buildSkillDomainConfig } from '../../../taxonomy';

const domainId = '11111111-1111-4111-8111-111111111111';
const groupId = '22222222-2222-4222-8222-222222222222';
const skillId = '33333333-3333-4333-8333-333333333333';
const name = Object.fromEntries(
  DEFAULT_SUPPORTED_LANGUAGES.map(({ language }) => [language, 'Test domain']),
) as SkillDomain_Config['name'];
const skill = buildSkillConfig({
  slug: 'testSkill',
  id: skillId,
  name,
  description: {
    methodological: 'Test Skill meaning.',
    frontend: name as Skill_Config['description']['frontend'],
  },
});
const group = buildSkillGroupConfig({ slug: 'testGroup', id: groupId, name, skills: { identify: skill } });

function createDomain(groups: SkillDomain_Config['groups'], skills?: SkillDomain_Config['skills']): SkillDomain_Config {
  return { slug: 'testDomain', id: domainId, name, groups, ...(skills === undefined ? {} : { skills }) };
}

describe('buildSkillDomainConfig', () => {
  it('keeps full Group entities rather than their IDs', () => {
    const config = createDomain({ organisms: group });
    const result = buildSkillDomainConfig(config);
    assert.equal(result.collection, 'skillDomain');
    assert.strictEqual(result.groups.organisms, group);
    assert.strictEqual(result.groups.organisms.skills.identify, skill);
    assert.equal(result.skills, undefined);
    assert.ok(!('collection' in config));
  });
  it('keeps full direct Skill entities', () => {
    const result = buildSkillDomainConfig(createDomain({}, { identify: skill }));
    assert.strictEqual(result.skills?.identify, skill);
    assert.deepEqual(result.groups, {});
  });
  it('supports mixed Group and direct Skill children in one Domain', () => {
    const result = buildSkillDomainConfig(createDomain({ organisms: group }, { identify: skill }));
    assert.strictEqual(result.groups.organisms, group);
    assert.strictEqual(result.skills?.identify, skill);
  });
  it('rejects a Domain with neither Groups nor Skills', () => {
    assert.throws(() => buildSkillDomainConfig(createDomain({})), /at least one Group or direct Skill/);
    assert.throws(() => buildSkillDomainConfig(createDomain({}, {})), /at least one Group or direct Skill/);
  });
  it('validates nested descriptions on a Domain', () => {
    const config = {
      ...createDomain({ organisms: group }),
      description: { methodological: 'The conceptual scope of the domain.' },
    };
    assert.deepEqual(buildSkillDomainConfig(config).description, config.description);
    const invalid = {
      ...config,
      description: {
        methodological: 'Valid text',
        frontend: { en: 'Partial locale' },
      },
    } as unknown as SkillDomain_Config;
    assert.throws(() => buildSkillDomainConfig(invalid), /Skill description.frontend/);
  });
  it('rejects bare IDs in Group or Skill collections', () => {
    assert.throws(
      () => buildSkillDomainConfig(createDomain({ bad: groupId } as unknown as SkillDomain_Config['groups'])),
      /must be a built skillGroup entity/,
    );
    assert.throws(
      () => buildSkillDomainConfig(createDomain({}, { bad: skillId } as unknown as SkillDomain_Config['skills'])),
      /must be a built skill entity/,
    );
  });
  it('rejects wrong discriminator, duplicate child UUIDs and malformed IDs', () => {
    const wrong = { ...skill, collection: 'skillGroup' } as unknown as typeof skill;
    assert.throws(() => buildSkillDomainConfig(createDomain({}, { identify: wrong })), /must be a built skill entity/);
    assert.throws(() => buildSkillDomainConfig(createDomain({}, { a: skill, b: skill })), /contains duplicate id/);
    const bad = { ...skill, id: 'not-a-uuid' } as unknown as typeof skill;
    assert.throws(() => buildSkillDomainConfig(createDomain({}, { invalid: bad })), /must be a UUID/);
  });
});
