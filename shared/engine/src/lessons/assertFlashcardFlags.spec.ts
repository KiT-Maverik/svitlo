import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { assertFlashcardFlags } from './assertFlashcardFlags';

const card = (flags: unknown) => ({ id: 'test-card', flags });

describe('assertFlashcardFlags', () => {
  it('accepts all four typed flag forms, localized values and multiple custom flags', () => {
    assert.doesNotThrow(() => assertFlashcardFlags([card([
      { type: 'list', count: 5 },
      { type: 'warning' },
      { type: 'acronym', value: { en: 'RED', uk: 'ЧЕР' } },
      { type: 'custom', value: 'Important', color: 'success', icon: 'star' },
      { type: 'custom', value: 'Practice', color: 'default' },
    ])]));
    assert.doesNotThrow(() => assertFlashcardFlags([card([])]));
  });

  it('rejects legacy strings and unknown flag types', () => {
    assert.throws(() => assertFlashcardFlags([card(['priority'])]), /typed Flashcard flag/);
    assert.throws(() => assertFlashcardFlags([card([{ type: 'unknown' }])]), /Unknown Flashcard flag/);
  });

  it('rejects invalid counts and duplicate built-in flags', () => {
    for (const count of [0, 1, -1, 3.2, Number.NaN]) {
      assert.throws(() => assertFlashcardFlags([card([{type:'list',count}])]), /list count/);
    }
    assert.throws(() => assertFlashcardFlags([card([{ type:'warning' }, { type:'warning' }])]), /Duplicate built-in/);
  });

  it('rejects unsafe custom icon or color and missing values', () => {
    const custom = (more: Record<string, unknown>) => ({
      type: 'custom', value: 'Review', color: 'warning', ...more,
    });
    assert.throws(() => assertFlashcardFlags([card([custom({color:'#ff0000'})])]), /custom flag/);
    assert.throws(() => assertFlashcardFlags([card([custom({icon:'<svg>'})])]), /custom flag/);
    assert.throws(() => assertFlashcardFlags([card([custom({value:''})])]), /custom flag/);
    assert.throws(() => assertFlashcardFlags([card([custom({onClick:'bad'})])]), /custom flag/);
  });

  it('rejects additional properties and invalid acronym payloads', () => {
    assert.throws(() => assertFlashcardFlags([card([{ type:'warning', value:'Warning' }])]), /warning flag/);
    assert.throws(() => assertFlashcardFlags([card([{ type:'acronym', value:'' }])]), /acronym flag/);
    assert.throws(() => assertFlashcardFlags([card([{ type:'list', count:4, value:'four' }])]), /list count/);
    assert.throws(() => assertFlashcardFlags([card(null)]), /flags must be an array/);
  });
});
