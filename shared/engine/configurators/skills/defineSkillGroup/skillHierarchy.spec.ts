import assert from 'node:assert/strict';
import test from 'node:test';

import { defineSkill } from '../defineSkill';
import { defineSkillGroup } from './defineSkillGroup';
import { defineSkillDomain } from '../defineSkillDomain';

const id = (suffix: string) => 'b775647f-203d-481a-a1c7-4d331c779d' + suffix;

const balance = defineSkill<'balance', ['en', 'uk']>({
  id: id('01'),
  slug: 'balance',
  name: { en: 'Balance', uk: 'Рівновага' },
  description: {
    methodological: 'Explain balance as a relation among forces.',
    frontend: { en: 'Balance forces', uk: 'Урівноваж сили' },
  },
});
const motion = defineSkill<'motion', ['en', 'uk']>({
  id: id('02'),
  slug: 'motion',
  name: 'Motion',
  description: {
    methodological: 'Explain changes of position.',
    frontend: { en: 'Describe movement', uk: 'Опиши рух' },
  },
});
const group = defineSkillGroup<'mechanics', { balance: typeof balance; motion: typeof motion }, ['uk']>({
  id: id('03'),
  slug: 'mechanics',
  name: { uk: 'Механіка', en: 'Mechanics' },
  description: { methodological: 'Basic mechanics' },
  skills: { items: { balance, motion }, order: ['balance', 'motion'] },
});
const domain = defineSkillDomain<'physics', { mechanics: typeof group }, {}, ['uk']>({
  id: id('04'),
  slug: 'physics',
  title: { en: 'Physics', uk: 'Фізика' },
  description: { methodological: 'Natural science' },
  groups: { items: { mechanics: group }, order: ['mechanics'] },
});

test('Skill publishes localized Props-shaped files and an invariant methodological description', () => {
  const result = balance.build.props();
  assert.equal(result.base.id, id('01'));
  assert.equal(result.base.slug, 'balance');
  assert.deepEqual(result.base.description, { methodological: 'Explain balance as a relation among forces.' });
  assert.deepEqual(result.locale?.uk, {
    name: 'Рівновага',
    description: { frontend: 'Урівноваж сили' },
  });
  assert.equal(result.locale?.en?.name, 'Balance');
  assert.equal(JSON.stringify(result).includes('function'), false);
});

test('Skill overrides are sparse, strict and immutable', () => {
  const override = balance.build.overrides({ name: { uk: 'Збалансованість' } });
  assert.deepEqual(override.base, {});
  assert.deepEqual(override.locale, { uk: { name: 'Збалансованість' } });
  assert.throws(() => balance.build.overrides({ slug: 'hijack' } as never), /Invalid Skill overrides/);
  assert.throws(() => balance.build.overrides({ description: { rogue: 'text' } } as never), /Invalid Skill overrides/);
  override.locale!.uk!.name = 'changed';
  assert.equal(balance.build.props().locale?.uk?.name, 'Рівновага');
  assert.equal(balance.build.overrides({ name: { en: 'Equilibrium' } }).locale?.en?.name, 'Equilibrium');
});

test('SkillGroup validates, orders, overrides and disables Skills without mutating the original', () => {
  const resource = group.build.props();
  assert.deepEqual(resource.base.skills?.map(item => item.slug), ['balance', 'motion']);
  assert.deepEqual(resource.locale?.uk?.skills?.map(item => item.name), ['Рівновага', 'Motion']);
  assert.equal('items' in resource.base, false);
  const patch = group.build.overrides({
    skills: { items: { balance: { name: { uk: 'Сила рівноваги' } } } },
  });
  assert.deepEqual(patch.locale?.uk?.skills?.map(item => item.name), ['Сила рівноваги', 'Motion']);
  assert.deepEqual(group.build.props().locale?.uk?.skills?.map(item => item.name), ['Рівновага', 'Motion']);

  const disabled = group.build.overrides({
    skills: { items: { motion: false }, order: ['balance'] },
  });
  assert.deepEqual(disabled.base.skills?.map(item => item.slug), ['balance']);
  assert.deepEqual(disabled.locale?.uk?.skills?.map(item => item.slug), ['balance']);
  assert.throws(() => group.build.overrides({ skills: { items: { motion: false } } }), /order is required/);
  assert.throws(() => group.build.overrides({ skills: { order: ['balance', 'balance'] } }), /Duplicate slug/);
  assert.throws(() => group.build.overrides({ skills: { items: { balance: false, motion: false }, order: [] } }), /At least one active/);
});

test('SkillGroup admits typed new children with complete order and rejects key collisions', () => {
  const added = defineSkill<'force', ['en', 'uk']>({
    id: id('05'), slug: 'force', name: { en: 'Force', uk: 'Сила' },
    description: { methodological: 'Define forces', frontend: { en: 'Define force', uk: 'Визнач силу' } },
  });
  const patch = group.build.overrides({
    skills: { additionalItems: { force: added }, order: ['force', 'balance', 'motion'] },
  });
  assert.deepEqual(patch.locale?.uk?.skills?.map(item => item.slug), ['force', 'balance', 'motion']);
  assert.throws(
    () => group.build.overrides({ skills: { additionalItems: { balance: added } as never, order: ['balance', 'motion'] } }),
    /Duplicate|does not match/,
  );
  assert.deepEqual(group.build.props().base.skills?.map(item => item.slug), ['balance', 'motion']);
  const duplicateId = defineSkill<'duplicate', ['en', 'uk']>({
    id: id('01'), slug: 'duplicate', name: { en: 'Duplicate', uk: 'Дублікат' },
    description: {
      methodological: 'Duplicate identity',
      frontend: { en: 'Duplicate', uk: 'Дублікат' },
    },
  });
  assert.throws(
    () => group.build.overrides({
      skills: { additionalItems: { duplicate: duplicateId }, order: ['balance', 'motion', 'duplicate'] },
    }),
    /Duplicate Skill ID/,
  );
});

test('SkillDomain composes nested Groups without publishing authoring maps', () => {
  const result = domain.build.props();
  assert.deepEqual(result.base.groups?.map(item => item.slug), ['mechanics']);
  assert.deepEqual(result.locale?.uk?.groups?.[0]?.skills?.map(item => item.name), ['Рівновага', 'Motion']);
  assert.equal(JSON.stringify(result).includes('"items"'), false);
  const patched = domain.build.overrides({ groups: { items: { mechanics: { name: { uk: 'Динаміка' } } } } });
  assert.equal(patched.locale?.uk?.groups?.[0]?.name, 'Динаміка');
  assert.equal(domain.build.props().locale?.uk?.groups?.[0]?.name, 'Механіка');
  assert.throws(() => domain.build.overrides({ title: { madeUp: 'Invalid' } } as never), /Invalid SkillDomain overrides/);
});
