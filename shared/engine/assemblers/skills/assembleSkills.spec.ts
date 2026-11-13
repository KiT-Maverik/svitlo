import assert from 'node:assert/strict';
import test from 'node:test';

import { defineSkill } from '../../configurators/skills/defineSkill';
import { defineSkillGroup } from '../../configurators/skills/defineSkillGroup';
import { defineSkillDomain } from '../../configurators/skills/defineSkillDomain';
import { skillDomain_Props_Schema } from '../../configurators/skills/defineSkillDomain/defineSkillDomain.schemas';
import { skillGroup_Props_Schema } from '../../configurators/skills/defineSkillGroup/defineSkillGroup.schemas';
import { assembleSkills, type Skills_Publication } from './assembleSkills';

const id = (n: string) => '00000000-0000-4000-8000-0000000000' + n;
const skill = (slug: string, n: string, name: string) => ({
  id: id(n),
  slug,
  name,
  description: { methodological: 'Method for ' + slug, frontend: 'Learn ' + name },
});

const a = skill('balance', '01', 'Balance');
const b = skill('motion', '02', 'Motion');
const group = {
  id: id('03'),
  slug: 'mechanics',
  name: 'Mechanics',
  description: { methodological: 'Mechanics methodology' },
  skills: [a, b],
};

function publication(): Skills_Publication {
  return {
    base: {
      physics: {
        id: id('04'),
        slug: 'physics',
        description: { methodological: 'Physics methodology' },
        groups: [group],
        skills: [a, b],
      },
    },
    locale: {
      en: { physics: { title: 'Physics' } },
      uk: {
        physics: {
          title: 'Фізика',
          description: { frontend: 'Вивчай фізику' },
          groups: [
            {
              ...group,
              name: 'Механіка',
              skills: [{ ...a, name: 'Рівновага', description: { ...a.description, frontend: 'Вивчай рівновагу' } }, b],
            },
          ],
          skills: [{ ...a, name: 'Рівновага', description: { ...a.description, frontend: 'Вивчай рівновагу' } }, b],
        },
      },
    },
  };
}

test('resolves the requested language into Schema-validated, nested Skill Props', () => {
  const resource = publication();
  const uk = assembleSkills(resource, 'uk');
  const en = assembleSkills(resource, 'en');
  assert.deepEqual(Object.keys(uk), ['physics']);
  assert.equal(uk.physics.title, 'Фізика');
  assert.equal(uk.physics.description.methodological, 'Physics methodology');
  assert.equal(uk.physics.groups?.[0].name, 'Механіка');
  assert.equal(uk.physics.groups?.[0].skills[0].name, 'Рівновага');
  assert.equal(uk.physics.groups?.[0].skills[1].name, 'Motion');
  assert.equal(uk.physics.skills?.[0].description.frontend, 'Вивчай рівновагу');
  assert.equal(en.physics.title, 'Physics');
  assert.equal(en.physics.groups?.[0].name, 'Mechanics');
  assert.deepEqual(assembleSkills(resource, 'uk'), uk);
  assert.deepEqual(publication(), resource, 'Never modify the authored publication');
  assert.equal('collection' in uk.physics, false);
  assert.equal('items' in (uk.physics.groups?.[0] ?? {}), false);
});

test('applies locale patches and immutable base overrides in the documented four-layer order', () => {
  const resource = publication();
  const resolved = assembleSkills(resource, 'uk', {
    base: {
      physics: {
        title: 'Invariant override',
        description: { methodological: 'Overridden methodology' },
        skills: [b],
      },
    },
    locale: { uk: { physics: { title: 'Українська назва', description: { frontend: 'Новий опис' } } } },
  });
  assert.equal(resolved.physics.title, 'Українська назва');
  assert.equal(resolved.physics.description.methodological, 'Overridden methodology');
  assert.equal(resolved.physics.description.frontend, 'Новий опис');
  assert.deepEqual(
    resolved.physics.skills?.map(s => s.slug),
    ['motion'],
  );
  assert.equal(resolved.physics.skills?.[0].name, 'Motion');
  assert.deepEqual(resource.base.physics.skills, [a, b]);
});

test('a base override deletes translated A without resurrecting it from the resource locale array', () => {
  const result = assembleSkills(publication(), 'uk', { base: { physics: { skills: [b] } } });
  assert.deepEqual(result.physics.skills, [b]);
  assert.equal(result.physics.groups?.[0].skills[0].name, 'Рівновага');
});

test('reordered and newly added published children replace the entire array per language', () => {
  const c = skill('force', '05', 'Force');
  const result = assembleSkills(publication(), 'uk', {
    base: { physics: { skills: [c, b] } },
    locale: { uk: { physics: { skills: [{ ...c, name: 'Сила' }, b] } } },
  });
  assert.deepEqual(
    result.physics.skills?.map(s => s.slug),
    ['force', 'motion'],
  );
  assert.deepEqual(
    result.physics.skills?.map(s => s.name),
    ['Сила', 'Motion'],
  );
});

test('rejects a missing required translation rather than falling back', () => {
  assert.throws(() => assembleSkills(publication(), 'ar'), /Invalid assembled SkillDomain physics for ar/);
});

test('rejects unknown domains and identity fields in locale/override patches', () => {
  const source = publication();
  assert.throws(
    () => assembleSkills({ ...source, locale: { uk: { unknown: { title: 'X' } } } }, 'uk'),
    /Unknown SkillDomain/,
  );
  assert.throws(
    () => assembleSkills(source, 'uk', { base: { physics: { slug: 'other' } } }),
    /Cannot override SkillDomain identity/,
  );
});

test('rejects mismatched root slugs, malformed data, and unsafe JSON keys', () => {
  const source = publication();
  assert.throws(
    () => assembleSkills({ ...source, base: { physics: { ...source.base.physics, slug: 'different' } } }, 'uk'),
    /Domain slug does not match/,
  );
  assert.throws(() => assembleSkills({ ...source, base: {} }, 'uk'), /Empty published Skills taxonomy/);
  const unsafe = JSON.parse('{"physics":{"__proto__":{"polluted":true}}}');
  assert.throws(() => assembleSkills({ ...source, locale: { uk: unsafe } }, 'uk'), /Forbidden Skills key/);
  assert.equal(({} as { polluted?: boolean }).polluted, undefined);
});

test('consumes actual SkillDomain Build output without a second translation wrapper', () => {
  const leaf = defineSkill<'balance', ['en', 'uk']>({
    id: id('11'),
    slug: 'balance',
    name: { en: 'Balance', uk: 'Рівновага' },
    description: {
      methodological: 'Learn what balance means',
      frontend: { en: 'Learn balance', uk: 'Вивчай рівновагу' },
    },
  });
  const cluster = defineSkillGroup<'mechanics', { balance: typeof leaf }, ['uk']>({
    id: id('12'),
    slug: 'mechanics',
    name: { en: 'Mechanics', uk: 'Механіка' },
    description: { methodological: 'Mechanics methodology' },
    skills: { items: { balance: leaf }, order: ['balance'] },
  });
  const root = defineSkillDomain<'physics', { mechanics: typeof cluster }, {}, ['uk']>({
    id: id('13'),
    slug: 'physics',
    title: { en: 'Physics', uk: 'Фізика' },
    description: { methodological: 'Physics methodology' },
    groups: { items: { mechanics: cluster }, order: ['mechanics'] },
  });
  const built = root.build.props({ languages: ['uk'] });
  const result = assembleSkills(
    { base: { physics: built.base }, locale: { uk: { physics: built.locale?.uk ?? {} } } },
    'uk',
  );
  assert.equal(result.physics.title, 'Фізика');
  assert.equal(result.physics.groups?.[0].name, 'Механіка');
  assert.equal(result.physics.groups?.[0].skills[0].name, 'Рівновага');
  assert.equal(result.physics.groups?.[0].skills[0].description.frontend, 'Вивчай рівновагу');
});

test('published Skill Props reject unresolved locale dictionaries at domain and group levels', () => {
  const domain = assembleSkills(publication(), 'uk').physics;
  const group = domain.groups?.[0];
  assert.ok(group);
  assert.equal(
    skillDomain_Props_Schema.safeParse({ ...domain, title: { uk: 'Фізика' } }).success,
    false,
  );
  assert.equal(
    skillGroup_Props_Schema.safeParse({ ...group, name: { uk: 'Механіка' } }).success,
    false,
  );
  assert.equal(
    skillGroup_Props_Schema.safeParse({
      ...group,
      description: { ...group.description, frontend: { uk: 'Вивчай механіку' } },
    }).success,
    false,
  );
});
