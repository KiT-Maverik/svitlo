import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { createContentBlock } from './createContentBlock.utils';
import { createSection } from './createSection.utils';

const intro = createContentBlock({
  type: 'markdown', id: 'intro-id', slug: 'intro',
  locales: { language: 'en', value: '# Introduction' },
});
const outro = createContentBlock({
  type: 'markdown', id: 'outro-id', slug: 'outro',
  locales: { en: '# Summary', uk: '# Підсумок', fallback: 'en' },
});
const task = createContentBlock({
  type: 'text', id: 'task-id', slug: 'task',
  value: { language: 'en', value: 'Read' },
  wrap: { enabled: false as const },
});

function section() {
  return createSection({
    id: 'section-id',
    slug: 'theory',
    type: 'theory',
    title: { en: 'Theory', uk: 'Теорія', fallback: 'en' },
    navigationLabel: { language: 'en', value: 'Theory' },
    content: {
      markdown: { intro, outro },
      text: { task },
    },
  });
}

describe('Section Builder', () => {
  it('builds a flat Response array, by default in catalog insertion order', () => {
    const response = section().build('en');
    assert.deepEqual(response?.content.map(item => item.id), ['intro-id', 'outro-id', 'task-id']);
    assert.equal(response?.content[0].type, 'markdown');
    assert.equal(response?.content[2].type, 'text');
    assert.equal('order' in (response ?? {}), false);
    assert.deepEqual(response?.locale, { code: 'en' });
  });

  it('prioritizes typed type.alias paths and appends all omitted keys', () => {
    const source = section();
    const custom = source.setOrder(['text.task', 'markdown.outro']);
    assert.deepEqual(custom.build('uk')?.content.map(item => item.id),
      ['task-id', 'outro-id', 'intro-id']);
    assert.deepEqual(source.build('uk')?.content.map(item => item.id),
      ['intro-id', 'outro-id', 'task-id']);
    assert.deepEqual(custom.build('uk')?.locale, { code: 'uk', isFallback: true });
    assert.deepEqual(custom.setOrder([]).build('en')?.content.map(item => item.id),
      ['intro-id', 'outro-id', 'task-id']);

    assert.throws(() => source.setOrder(['text.badAlias'] as never), /Unknown Section order key/);
    assert.throws(() => source.setOrder(['text.task', 'text.task']), /Duplicate Section order key/);
    // @ts-expect-error Order accepts existing type.alias paths, not bare aliases.
    if (false) source.setOrder(['intro']);
    // @ts-expect-error Order rejects nonexistent content aliases.
    if (false) source.setOrder(['markdown.unknown']);
  });

  it('allows duplicate alias names under different block types', () => {
    const withSameAlias = section().addBlock('text', 'intro', createContentBlock({
      type: 'text', id: 'second-intro-id', slug: 'secondIntro',
      value: { language: 'en', value: 'Another intro' },
    }));
    assert.deepEqual(withSameAlias.setOrder(['text.intro', 'markdown.intro'])
      .build('en')?.content.map(item => item.type), ['text', 'markdown', 'markdown', 'text']);
  });

  it('adds blocks without modifying the source and preserves inferred keys', () => {
    const original = section();
    const added = original.addBlock('text', 'extra', createContentBlock({
      type: 'text', id: 'extra-id', slug: 'extra',
      value: { language: 'en', value: 'Extra' },
    }));
    assert.deepEqual(original.build('en')?.content.map(item => item.id),
      ['intro-id', 'outro-id', 'task-id']);
    assert.deepEqual(added.setOrder(['text.extra']).build('en')?.content.map(item => item.id),
      ['extra-id', 'intro-id', 'outro-id', 'task-id']);
    assert.throws(() => original.addBlock('text', 'task', task), /Duplicate Section block alias/);
    assert.throws(() => original.addBlock('markdown', 'wrong', task as never), /must match/);
  });

  it('updates nested builder configurations and skips disabled children', () => {
    const original = section();
    const changed = original.updateBlock('text', 'task', block =>
      block.withConfig({ wrap: { typographyProps: { component: 'h3' } } }));
    const configured = changed.content.text.task.build('en');
    assert.deepEqual(configured?.wrap, {
      enabled: false,
      typographyProps: { component: 'h3' },
    });
    assert.equal(original.content.text.task.build('en')?.wrap?.typographyProps, undefined);

    const disabledChild = changed.updateBlock('markdown', 'intro', block => block.disable());
    assert.deepEqual(disabledChild.build('en')?.content.map(item => item.id),
      ['outro-id', 'task-id']);
    assert.equal(changed.build('en')?.content.length, 3);
    assert.equal(disabledChild.disable().build('en'), undefined);
  });

  it('preserves metadata and applies independent Section-level config updates', () => {
    const original = section();
    const changed = original.withConfig({
      title: { language: 'en', value: 'Updated theory' },
      skippable: true,
    });
    assert.equal(changed.build('en')?.title, 'Updated theory');
    assert.equal(changed.build('en')?.skippable, true);
    assert.equal(original.build('en')?.title, 'Theory');
    assert.equal(original.build('en')?.skippable, undefined);
    assert.throws(() => original.withConfig({ id: 'other' } as never), /Cannot override/);
  });
});
