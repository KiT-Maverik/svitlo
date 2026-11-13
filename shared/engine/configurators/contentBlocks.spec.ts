import { describe } from 'node:test';
import assert from 'node:assert/strict';
import test from 'node:test';

import {
  defineText,
  defineCode,
  defineCheckpoint,
  defineCheckpointItem,
  text_Config_Schema,
  code_Props_Schema,
} from './contentBlocks';

describe('Configurators', () => {
  describe('ContentBlocks', () => {
    describe('schemas', () => {
      const id = (suffix: string) => 'b775647f-203d-481a-a1c7-4d331c779d' + suffix;

      test('Text publishes complete selected-language Props and a sparse, immutable patch', () => {
        const text = defineText<'greeting', ['en', 'uk']>({
          id: id('01'),
          slug: 'greeting',
          type: 'text',
          params: {},
          locale: { value: { en: 'Hello', uk: 'Привіт' } },
        });
        const original = text.build.props({ languages: ['uk'] });
        assert.deepEqual(Object.keys(original.locale ?? {}), ['uk']);
        assert.deepEqual(original.locale?.uk, { locale: { value: 'Привіт' } });
        assert.deepEqual(text.build.overrides({ locale: { value: { uk: 'Вітаю' } } }, { languages: ['uk'] }), {
          base: {},
          locale: { uk: { locale: { value: 'Вітаю' } } },
        });
        assert.deepEqual(text.build.props({ languages: ['uk'] }), original);
        assert.equal(
          text_Config_Schema.safeParse({
            id: id('01'),
            slug: 'greeting',
            type: 'text',
            params: {},
            locale: { value: { en: 'Hello', uk: 'Привіт' } },
          }).success,
          true,
        );
        assert.equal('override' in text, false);
        assert.equal('disable' in text, false);
      });

      test('Code may contain only static source text without a redundant locale object', () => {
        const code = defineCode({
          id: id('02'),
          slug: 'source',
          type: 'code',
          params: { language: 'typescript', codeAsText: 'const answer = 42;' },
          locale: {},
        });
        const result = code.build.props({ languages: ['uk'] });
        assert.equal(result.locale, undefined);
        assert.equal(code_Props_Schema.safeParse(result.base).success, true);
        assert.deepEqual(code.build.overrides({ params: { disabled: true } }, { languages: ['uk'] }), {
          base: { params: { disabled: true } },
          locale: undefined,
        });
        assert.throws(() => code.build.overrides({ params: { unexpected: true } } as never, { languages: ['uk'] }));
      });

      test('Checkpoint publishes ordered nested plain Props, without mutable authoring collections', () => {
        const question = defineText({
          id: id('03'),
          slug: 'question',
          type: 'text',
          params: {},
          locale: { value: 'Question?' },
        });
        const answer = defineText({ id: id('04'), slug: 'answer', type: 'text', params: {}, locale: { value: 'Yes' } });
        const item = defineCheckpointItem({
          id: id('05'),
          slug: 'item',
          type: 'checkpointItem',
          question,
          check: true,
          answer: { items: { answer }, order: ['answer'] },
        });
        const checkpoint = defineCheckpoint({
          id: id('06'),
          slug: 'checkpoint',
          type: 'checkpoint',
          params: {},
          locale: { title: 'Review' },
          content: { items: { item }, order: ['item'] },
        });
        const output = checkpoint.build.props({ languages: ['en'] });
        assert.equal(output.base.content.length, 1);
        assert.equal(output.base.content[0]?.question.slug, 'question');
        assert.equal(output.base.content[0]?.answer[0]?.slug, 'answer');
        assert.equal(output.locale, undefined);
        assert.equal(JSON.stringify(output).includes('"items"'), false);
        assert.equal(JSON.stringify(output).includes('"order"'), false);
      });
    });
  });
});
