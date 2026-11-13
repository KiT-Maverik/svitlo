import { describe } from 'node:test';
import assert from 'node:assert/strict';
import test from 'node:test';

import { defineText } from './contentBlocks/defineText';
import { defineContentSection } from './sections/defineContentSection';
import { defineLesson } from './lessons/defineLesson';
import { defineSkill, defineSkillGroup, defineSkillDomain } from './skills';
import { defineAssessmentMethod } from './assessmentMethods/defineAssessmentMethod';

describe('Configurators', () => {
  describe('Composition', () => {
    describe('build', () => {
      const id = (suffix: string) => 'b775647f-203d-481a-a1c7-4d331c779d' + suffix;

      test('Lesson composes typed Section and ContentBlock resources without mutating the original', () => {
        const text = defineText<'text', ['uk']>({
          id: id('01'),
          slug: 'text',
          type: 'text',
          params: {},
          locale: { value: 'Hello' },
        });
        const section = defineContentSection<'intro', { text: typeof text }, ['uk']>({
          id: id('02'),
          slug: 'intro',
          type: 'content',
          params: {},
          locale: { title: 'Introduction', navigationLabel: '1' },
          content: { items: { text }, order: ['text'] },
        });
        const lesson = defineLesson({
          id: id('03'),
          slug: 'lesson',
          type: 'lesson',
          skills: [],
          params: {
            requireQuiz: false,
            languages: ['uk'] as const,
            sections: { allowNavigation: true, allowSkipping: true, showIndexes: false },
          },
          locale: { title: 'Lesson' },
          section: { items: { intro: section }, order: ['intro'] },
          flashcards: { items: {}, order: [] },
        });
        const resource = lesson.build.props({ languages: ['uk'] });
        assert.deepEqual(
          resource.base.section.map(item => item!.slug),
          ['intro'],
        );
        assert.equal(resource.base.section[0]?.content[0]?.slug, 'text');
        assert.equal(resource.locale, undefined);
        assert.equal('overrides' in lesson.config, false);
        assert.deepEqual(lesson.build.props({ languages: ['uk'] }), resource);
      });

      test('Skill hierarchy and Assessment Method publish data-only results with explicit languages', () => {
        const skill = defineSkill({
          id: id('04'),
          slug: 'reading',
          name: 'Reading',
          description: { methodological: 'Identify words', frontend: 'Read words' },
        });
        const group = defineSkillGroup({
          id: id('05'),
          slug: 'literacy',
          name: 'Literacy',
          description: { methodological: 'Reading fundamentals', frontend: 'Reading' },
          skills: { items: { reading: skill }, order: ['reading'] },
        });
        const domain = defineSkillDomain({
          id: id('06'),
          slug: 'language',
          title: 'Language',
          description: { methodological: 'Language learning', frontend: 'Language' },
          groups: { items: { literacy: group }, order: ['literacy'] },
        });
        const result = domain.build.props({ languages: ['uk'] });
        assert.deepEqual(
          result.base.groups?.map(item => item!.slug),
          ['literacy'],
        );
        assert.equal(JSON.stringify(result).includes('"items"'), false);
        const method = defineAssessmentMethod({
          id: id('07'),
          slug: 'retrieval',
          title: 'Retrieval',
          description: 'Recall facts',
        });
        assert.equal(method.build.props({ languages: ['uk'] }).base.slug, 'retrieval');
      });
    });
  });
});
