import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { mergeForValidation } from '../../_shared__configurators';
import { assessment_Completed_Props_Schema, assessmentConfigurator_Schema } from '../../assessments/defineAssessment';
import { episode_Completed_Props_Schema, episodeConfigurator_Schema } from '../../episodes/defineEpisode';
import { lesson_Completed_Props_Schema, lessonConfigurator_Schema } from '../../lessons/defineLesson';
import { defineChapter } from '../defineChapter';
import { defineCourse } from '../defineCourse';
import { defineModule } from '../defineModule';
import { defineAssessmentStub, defineEpisodeStub, defineLessonStub } from './defineCourseChildStubs';

describe('Configurators', () => {
  describe('Courses', () => {
    describe('defineCourseChildStubs', () => {
      const id = (suffix: string) => 'a275647f-203d-481a-a1c7-4d331c779d' + suffix;
      const stub = (kind: 'lesson' | 'episode' | 'assessment', suffix: string) => {
        const input = { id: id(suffix), slug: 'placement' + suffix };
        switch (kind) {
          case 'lesson': return defineLessonStub(input);
          case 'episode': return defineEpisodeStub(input);
          case 'assessment': return defineAssessmentStub(input);
        }
      };

      test('all three are genuine, ordered ContentSection/Text previews, not completed resources', () => {
        for (const kind of ['lesson', 'episode', 'assessment'] as const) {
          const draft = stub(kind, kind === 'lesson' ? '11' : kind === 'episode' ? '12' : '13');
          assert.equal(draft.draft, true);
          assert.equal(draft.type, kind);
          assert.equal(draft.config.base.id, draft.id);
          assert.equal(draft.config.base.slug, draft.slug);
          assert.equal(draft.config.base.type, draft.type);
          const first = draft.build.props({ languages: ['en'] });
          const another = draft.build.props({ languages: ['en'] });
          assert.deepEqual(first, another);
          assert.equal(first.base.draft, true);
          assert.equal(first.base.id, draft.id);
          assert.equal(first.base.slug, draft.slug);
          assert.equal(first.base.section.length, 1);
          assert.equal(first.base.section[0]?.type, 'content');
          assert.deepEqual(first.base.section[0]?.content.map(item => item.type), ['text']);
          assert.equal(first.base.section[0]?.content[0]?.locale?.value, 'Not implemented');
          assert.equal(first.locale, undefined);
          assert.equal('events' in first.base, false);
          assert.equal('questions' in first.base, false);
          assert.equal('flashcards' in first.base, false);
          assert.equal(first.base.section.some(section => section.type === 'quiz'), false);
          assert.throws(() => draft.build.overrides({} as never, { languages: ['en'] }), /cannot be overridden/);
          assert.doesNotThrow(() => draft.validate());
          assert.doesNotThrow(() => JSON.stringify(first));
          if (kind === 'lesson') {
            assert.equal(lesson_Completed_Props_Schema.safeParse(first.base).success, false);
            assert.equal(lessonConfigurator_Schema.safeParse(draft).success, false);
          }
          if (kind === 'episode') {
            assert.equal(episode_Completed_Props_Schema.safeParse(first.base).success, false);
            assert.equal(episodeConfigurator_Schema.safeParse(draft).success, false);
          }
          if (kind === 'assessment') {
            assert.equal(assessment_Completed_Props_Schema.safeParse(first.base).success, false);
            assert.equal(assessmentConfigurator_Schema.safeParse(draft).success, false);
          }
        }
      });

      test('Course, Module and Chapter preserve all three placeholders at original ordered slots', () => {
        const lesson = defineLessonStub({ id: id('21'), slug: 'lessonSlot' });
        const episode = defineEpisodeStub({ id: id('22'), slug: 'episodeSlot' });
        const assessment = defineAssessmentStub({ id: id('23'), slug: 'assessmentSlot' });
        const chapter = defineChapter({
          id: id('24'), slug: 'chapter', type: 'chapter', params: {},
          locale: { title: 'Chapter' },
          content: { items: { lessonSlot: lesson, episodeSlot: episode, assessmentSlot: assessment },
            order: ['assessmentSlot', 'lessonSlot', 'episodeSlot'] },
        });
        const module = defineModule({
          id: id('25'), slug: 'module', type: 'module', params: {},
          locale: { title: 'Module' },
          content: { items: { chapter, lessonSlot: lesson, episodeSlot: episode, assessmentSlot: assessment },
            order: ['episodeSlot', 'chapter', 'assessmentSlot', 'lessonSlot'] },
        });
        const course = defineCourse({
          id: id('26'), slug: 'course', type: 'course', params: { languages: ['en'] as const },
          locale: { title: 'Course', description: 'Draft preview' },
          content: { items: { module, lessonSlot: lesson, episodeSlot: episode, assessmentSlot: assessment },
            order: ['lessonSlot', 'module', 'assessmentSlot', 'episodeSlot'] },
        });
        const result = course.build.props({ languages: ['en'] });
        assert.deepEqual(result.base.content.map(child => child!.slug),
          ['lessonSlot', 'module', 'assessmentSlot', 'episodeSlot']);
        const moduleProps = result.base.content[1] as { content: Array<{ type: string; slug: string; content?: Array<{ slug: string }> }> };
        assert.deepEqual(moduleProps.content.map(child => child.slug),
          ['episodeSlot', 'chapter', 'assessmentSlot', 'lessonSlot']);
        assert.deepEqual(moduleProps.content[1]?.content?.map(child => child.slug),
          ['assessmentSlot', 'lessonSlot', 'episodeSlot']);
        assert.equal(result.base.content[0]?.draft, true);
        assert.equal(result.base.content[2]?.draft, true);
        assert.equal(result.base.content[3]?.draft, true);
        assert.doesNotThrow(() => JSON.stringify(mergeForValidation(result.base, result.locale?.en ?? {})));
      });
    });
  });
});
