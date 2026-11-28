import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { assessment_Completed_Data_Schema, assessmentConfigurator_Schema } from '../../assessments/defineAssessment';
import { episode_Completed_Data_Schema, episodeConfigurator_Schema } from '../../episodes/defineEpisode';
import { lesson_Completed_Data_Schema, lessonConfigurator_Schema } from '../../lessons/defineLesson';
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
          case 'lesson':
            return defineLessonStub(input);
          case 'episode':
            return defineEpisodeStub(input);
          case 'assessment':
            return defineAssessmentStub(input);
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
          const first = draft.build.data({ languages: ['en'] });
          const another = draft.build.data({ languages: ['en'] });
          assert.deepEqual(first, another);
          assert.equal(first.base.draft, true);
          assert.equal(first.base.id, draft.id);
          assert.equal(first.base.slug, draft.slug);
          const base = first.base as unknown as Record<string, unknown>;
          // Lesson/Episode draft previews are ordered Section placements.
          // Assessment drafts retain their semantically named preview Section.
          if (kind === 'assessment') {
            assert.equal('children' in base, false);
          } else {
            assert.deepEqual(base.children, ['preview']);
          }
          const preview = base.preview as {
            type: string;
            children: string[];
            message: { type: string; locale?: { value?: string } };
          };
          assert.equal(preview.type, 'content');
          assert.deepEqual(preview.children, ['message']);
          assert.equal(preview.message.type, 'text');
          assert.equal(preview.message.locale?.value, 'Not implemented');
          assert.equal('content' in preview, false);
          assert.equal('section' in base, false);
          assert.equal(first.locale, undefined);
          assert.equal('events' in first.base, false);
          assert.equal('questions' in first.base, false);
          assert.equal('flashcards' in first.base, false);
          assert.equal('quiz' in base, false);
          assert.throws(() => draft.build.overrides({} as never, { languages: ['en'] }), /cannot be overridden/);
          assert.doesNotThrow(() => draft.validate());
          assert.doesNotThrow(() => JSON.stringify(first));
          if (kind === 'lesson') {
            assert.equal(lesson_Completed_Data_Schema.safeParse(first.base).success, false);
            assert.equal(lessonConfigurator_Schema.safeParse(draft).success, false);
          }
          if (kind === 'episode') {
            assert.equal(episode_Completed_Data_Schema.safeParse(first.base).success, false);
            assert.equal(episodeConfigurator_Schema.safeParse(draft).success, false);
          }
          if (kind === 'assessment') {
            assert.equal(assessment_Completed_Data_Schema.safeParse(first.base).success, false);
            assert.equal(assessmentConfigurator_Schema.safeParse(draft).success, false);
          }
        }
      });

      test('validates UUIDs and never re-aliases a draft Lesson placement', () => {
        const malformed = defineLessonStub({ id: 'invalid-id', slug: 'slot' });
        assert.throws(() => malformed.validate(), /Invalid/i);
        const stub = defineLessonStub({ id: id('41'), slug: 'originalSlot' });
        const course = defineCourse({
          id: id('42'),
          slug: 'invalidPlacement',
          type: 'course',
          params: { languages: ['en'] as const },
          locale: { title: 'Draft', description: 'Only a preview' },
          children: ['renamedSlot'],
          renamedSlot: stub,
        });
        assert.throws(() => course.build.data({ languages: ['en'] }), /immutable child identity/i);
      });

      test('Course, Module and Chapter each retain the original ordered draft placement', () => {
        const lesson = defineLessonStub({ id: id('21'), slug: 'lessonSlot' });
        const episode = defineEpisodeStub({ id: id('22'), slug: 'episodeSlot' });
        const assessment = defineAssessmentStub({ id: id('23'), slug: 'assessmentSlot' });
        const chapter = defineChapter({
          id: id('24'),
          slug: 'chapter',
          type: 'chapter',
          params: {},
          locale: { title: 'Chapter' },
          children: ['assessmentSlot'],
          assessmentSlot: assessment,
        });
        const module = defineModule({
          id: id('25'),
          slug: 'module',
          type: 'module',
          params: {},
          locale: { title: 'Module' },
          children: ['episodeSlot', 'chapter'],
          chapter,
          episodeSlot: episode,
        });
        const course = defineCourse({
          id: id('26'),
          slug: 'course',
          type: 'course',
          params: { languages: ['en'] as const },
          locale: { title: 'Course', description: 'Draft preview' },
          children: ['lessonSlot', 'module'],
          module,
          lessonSlot: lesson,
        });
        const result = course.build.data({ languages: ['en'] });
        const root = result.base as unknown as Record<string, unknown> & { children: string[] };
        const lessonData = root.lessonSlot as { id: string; slug: string; draft: boolean };
        const moduleData = root.module as Record<string, unknown> & { children: string[] };
        const episodeData = moduleData.episodeSlot as { id: string; draft: boolean };
        const chapterData = moduleData.chapter as Record<string, unknown> & { children: string[] };
        const assessmentData = chapterData.assessmentSlot as { id: string; draft: boolean };
        assert.deepEqual(root.children, ['lessonSlot', 'module']);
        assert.equal(lessonData.id, lesson.id);
        assert.equal(lessonData.draft, true);
        assert.deepEqual(moduleData.children, ['episodeSlot', 'chapter']);
        assert.equal(episodeData.id, episode.id);
        assert.equal(episodeData.draft, true);
        assert.deepEqual(chapterData.children, ['assessmentSlot']);
        assert.equal(assessmentData.id, assessment.id);
        assert.equal(assessmentData.draft, true);
        assert.equal('content' in root, false);
        assert.equal('content' in moduleData, false);
        assert.equal('content' in chapterData, false);
        assert.doesNotThrow(() => JSON.stringify(result));
      });
    });
  });
});
