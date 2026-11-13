import assert from 'node:assert/strict';
import test from 'node:test';
import { prepareSkillPublication } from './prepareSkillsPublication.mjs';
import { renderSkillTree } from '../../generators/skills/publishSkillTree.mjs';

function domain(id, slug, translations = true) {
  const calls = [];
  return {
    id,
    slug,
    type: 'skillDomain',
    calls,
    build: {
      props: ({ languages }) => {
        calls.push([...languages]);
        return {
          base: {
            id,
            slug,
            description: { methodological: slug },
            skills: [{ id: slug + '-skill', slug: 'skill' }],
          },
          locale: translations
            ? Object.fromEntries(languages.map(language => [language, { locale: { title: language + ' ' + slug } }]))
            : undefined,
        };
      },
    },
  };
}

test('collects each Build result once into the complete textbook Skill tree', () => {
  const first = domain('id-1', 'colors');
  const second = domain('id-2', 'shapes');
  const publication = prepareSkillPublication([first, second], ['uk', 'en']);
  assert.deepEqual(first.calls, [['uk', 'en']]);
  assert.deepEqual(second.calls, [['uk', 'en']]);
  assert.deepEqual(Object.keys(publication.base), ['colors', 'shapes']);
  assert.deepEqual(Object.keys(publication.locale), ['uk', 'en']);
  assert.deepEqual(Object.keys(publication.locale.uk), ['colors', 'shapes']);
  assert.deepEqual(publication.locale.uk.colors.locale, { title: 'uk colors' });
  const files = renderSkillTree(publication);
  assert.deepEqual([...files.keys()], ['base.json', 'uk.json', 'en.json']);
  assert.equal(JSON.parse(files.get('base.json')).colors.skills[0].id, 'colors-skill');
});

test('omits absent translations rather than writing empty locale files', () => {
  const a = domain('id-1', 'colors', false);
  const publication = prepareSkillPublication([a], ['uk']);
  assert.equal(publication.locale, undefined);
  assert.deepEqual([...renderSkillTree(publication).keys()], ['base.json']);
});

test('rejects invalid domain identity, duplicate slugs, duplicate IDs and unknown locale results', () => {
  const a = domain('id-1', 'colors');
  assert.throws(() => prepareSkillPublication([a], []), /publication languages/);
  assert.throws(() => prepareSkillPublication([a], ['uk', 'uk']), /Duplicate publication language/);
  assert.throws(() => prepareSkillPublication([a, domain('id-2', 'colors')], ['en']), /Duplicate SkillDomain identity/);
  assert.throws(() => prepareSkillPublication([a, domain('id-1', 'shapes')], ['en']), /Duplicate SkillDomain identity/);
  assert.throws(() => prepareSkillPublication([{ ...a, type: 'skill' }], ['en']), /Expected SkillDomain/);
  const invalid = domain('id-3', 'invalid');
  invalid.build.props = () => ({ base: { id: 'id-3', slug: 'invalid' }, locale: { ru: { locale: {} } } });
  assert.throws(() => prepareSkillPublication([invalid], ['uk']), /Unrequested Skill language/);
});
