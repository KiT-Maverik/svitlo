import assert from 'node:assert/strict';
import test from 'node:test';

import { defineText } from '../../contentBlocks/defineText/defineText';
import { defineTheorySection } from '../defineTheorySection/defineTheorySection';
import { defineQuizSection } from './defineQuizSection';
import { quizSection_Config_Schema } from './defineQuizSection.schemas';

const id = (suffix: string) => 'b775647f-203d-481a-a1c7-4d331c779d' + suffix;
const block = defineText({
  type: 'text',
  id: id('b1'),
  slug: 'prompt',
  params: {},
  value: { en: 'Read', uk: 'Читай' },
});

test('Regular Section localizes titles without embedding ContentBlock definitions', () => {
  const section = defineTheorySection({
    type: 'theory',
    id: id('b2'),
    slug: 'intro',
    title: { en: 'Theory', uk: 'Теорія' },
    navigationLabel: '1',
    content: [block],
  });
  assert.equal(section.config.base.slug, 'intro');
  assert.equal(section.config.base.navigationLabel, '1');
  assert.deepEqual(section.config.locales(), { title: { en: 'Theory', uk: 'Теорія' } });
  assert.equal(section.content[0], block);
  assert.equal(JSON.stringify(section.config.base).includes('function'), false);
  assert.throws(() =>
    defineTheorySection({
      type: 'theory',
      id: id('b3'),
      slug: 'invalid',
      title: 'T',
      navigationLabel: '1',
      // @ts-expect-error Authored ContentBlocks are not nested configurators.
      content: [block.config.base],
    }),
  );
});

test('Quiz keeps validated options and screen children outside its base', () => {
  const parameters = {
    selection: { mode: 'sample' as const, count: 3 },
    layout: { mode: 'stepper' as const, showProgress: true },
    feedbackMode: 'after-completion' as const,
    interaction: {
      retries: 1,
      showErrors: true,
      showCorrectAnswers: false,
      allowExplanations: true,
      allowDeferring: false,
      allowQuestionNavigation: true,
      skippable: false,
    },
    results: { visibility: 'immediate' as const, showScore: true },
    screen: { starting: { content: [block] } },
  };
  const section = defineQuizSection({
    type: 'quiz',
    id: id('b4'),
    slug: 'quiz',
    title: 'Quiz',
    navigationLabel: 'Q',
    parameters,
  });
  assert.equal(section.sectionType, 'quiz');
  assert.equal(section.parameters.screen.starting?.content?.[0], block);
  assert.equal(section.config.base.parameters.selection.count, 3);
  assert.equal('screen' in section.config.base.parameters, false);
  assert.equal(
    quizSection_Config_Schema.safeParse({
      type: 'quiz',
      id: id('b4'),
      slug: 'quiz',
      title: 'Quiz',
      navigationLabel: 'Q',
      parameters: { ...parameters, interaction: { ...parameters.interaction, retries: -1 } },
    }).success,
    false,
  );
});
