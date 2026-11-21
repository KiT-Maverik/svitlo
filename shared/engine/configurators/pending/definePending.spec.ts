import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { z } from 'zod';

import { defineLesson } from '../lessons/defineLesson/defineLesson';
import { lesson_Props_Schema, lessonConfigurator_Schema } from '../lessons/defineLesson/defineLesson.schemas';
import { defineCourse } from '../courses/defineCourse/defineCourse';
import { course_Props_Schema } from '../courses/defineCourse/defineCourse.schemas';
import { quizSection_Props_Schema } from '../sections/defineQuizSection/defineQuizSection.schemas';
import { flashcardsSection_Props_Schema } from '../sections/defineFlashcardsSection/defineFlashcardsSection.schemas';
import { pendingUuid } from './pendingIdentity';
import { definePendingLesson, definePendingQuizSection, definePendingFlashcardsSection } from './definePending';

const id = (end: string) => 'ba8157c6-ae4e-49dc-9672-73e09d4418' + end;
const languages = ['en', 'pl', 'qm'] as const;

describe('Configurators', () => {
  describe('Pending', () => {
    describe('definePendingLesson', () => {
      test('publishes a real, invariant Lesson with visible ordered Content Section and no approvals', () => {
        const lesson = definePendingLesson({ id: id('01'), slug: 'awaitingLesson' });
        const publication = lesson.build.props({ languages });
        assert.equal(lesson.id, id('01'));
        assert.equal(lesson.slug, 'awaitingLesson');
        assert.equal(lesson.type, 'lesson');
        assert.equal(lessonConfigurator_Schema.safeParse(lesson).success, true);
        assert.equal(lesson_Props_Schema.safeParse(publication.base).success, true);
        assert.equal(publication.locale, undefined);
        assert.deepEqual(publication.base.params.languages, languages);
        assert.deepEqual(publication.base.skills, []);
        assert.equal(publication.base.locale?.title, 'Not implemented');
        assert.deepEqual(lesson.section.order, ['pendingContent']);
        assert.equal(publication.base.section[0]?.type, 'content');
        assert.equal(publication.base.section[0]?.locale?.title, 'Not implemented');
        assert.equal(publication.base.section[0]?.content?.[0]?.slug, 'pendingNotice');
        assert.deepEqual(publication.base.section[0]?.content?.[0]?.locale, { value: 'Not implemented' });
        for (const forbidden of ['production', 'review', 'completed', 'questions', 'flashcards', 'assets']) {
          assert.equal(Object.hasOwn(publication.base, forbidden), false);
        }
        assert.doesNotThrow(() => JSON.stringify(publication));
        assert.deepEqual(lesson.build.overrides({ params: { sections: { showIndexes: true } } }, { languages: ['pl'] }).base.params, {
          sections: { showIndexes: true },
        });
      });

      test('same authored identity gives stable distinct nested UUIDs and independent snapshots', () => {
        const first = definePendingLesson({ id: id('02'), slug: 'sameLesson' });
        const second = definePendingLesson({ id: id('02'), slug: 'sameLesson' });
        const a = first.build.props({ languages: ['uk'] });
        const b = second.build.props({ languages: ['en', 'pl'] });
        assert.equal(a.base.section[0]?.id, b.base.section[0]?.id);
        assert.equal(a.base.section[0]?.content?.[0]?.id, b.base.section[0]?.content?.[0]?.id);
        assert.notEqual(a.base.section[0]?.id, a.base.id);
        assert.notEqual(a.base.section[0]?.id, a.base.section[0]?.content?.[0]?.id);
        assert.equal(z.uuid().safeParse(a.base.section[0]?.id).success, true);
        assert.equal(z.uuid().safeParse(a.base.section[0]?.content?.[0]?.id).success, true);
        a.base.section[0]!.slug = 'tampered';
        assert.equal(first.build.props({ languages: ['uk'] }).base.section[0]?.slug, 'pendingContent');
        assert.equal(second.build.props({ languages: ['uk'] }).base.section[0]?.slug, 'pendingContent');
      });
    });

    describe('definePendingQuizSection', () => {
      test('uses real Quiz Props, safe non-executable defaults and a reserved Question ID', () => {
        const quiz = definePendingQuizSection({ id: id('03'), slug: 'pendingQuiz' });
        const publication = quiz.build.props({ languages });
        assert.equal(quiz.type, 'quiz');
        assert.equal(quizSection_Props_Schema.safeParse(publication.base).success, true);
        assert.equal(publication.locale, undefined);
        assert.deepEqual(publication.base.params.selection, {
          mode: 'all',
          questionIds: [pendingUuid(id('03'), 'quiz/questionSelection')],
        });
        assert.deepEqual(publication.base.params.layout, { mode: 'stack', showProgress: false });
        assert.equal(publication.base.params.disabled, true);
        assert.equal(publication.base.params.isBlocker, false);
        assert.equal(publication.base.params.skippable, true);
        assert.equal(publication.base.params.interaction.retries, 0);
        assert.equal(publication.base.params.interaction.skippable, true);
        assert.deepEqual(publication.base.params.results, { visibility: 'hidden', showScore: false });
        assert.deepEqual(publication.base.params.screen?.starting?.content, ['pendingNotice']);
        assert.deepEqual(publication.base.content[0]?.locale, { value: 'Not implemented' });
        assert.doesNotThrow(() => quiz.build.overrides({ params: { interaction: { retries: 1 } } }, { languages: ['qm'] }));
        assert.equal(quiz.build.props({ languages: ['qm'] }).base.params.interaction.retries, 0);
      });

      test('does not satisfy Lesson required-Quiz completion through a disabled placeholder', () => {
        const quiz = definePendingQuizSection({ id: id('04'), slug: 'quiz' });
        const lesson = defineLesson({
          id: id('05'),
          slug: 'requiredQuizLesson',
          type: 'lesson',
          skills: [],
          params: {
            languages: ['en'] as const,
            quizRequiredForCompletion: true,
            sections: { allowNavigation: true, allowSkipping: true, showIndexes: false },
          },
          locale: { title: 'Pending' },
          section: { items: { quiz }, order: ['quiz'] },
        });
        assert.throws(() => lesson.build.props({ languages: ['en'] }), /requires at least one enabled Quiz/);
      });
    });

    describe('definePendingFlashcardsSection', () => {
      test('uses real Flashcards Props and a reserved, non-bank Flashcard ID', () => {
        const section = definePendingFlashcardsSection({ id: id('06'), slug: 'pendingCards' });
        const publication = section.build.props({ languages });
        assert.equal(section.type, 'flashcards');
        assert.equal(flashcardsSection_Props_Schema.safeParse(publication.base).success, true);
        assert.equal(publication.locale, undefined);
        assert.equal(publication.base.params.disabled, true);
        assert.equal(publication.base.params.skippable, true);
        assert.deepEqual(publication.base.params.selection.flashcardIds, [
          pendingUuid(id('06'), 'flashcards/flashcardSelection'),
        ]);
        assert.deepEqual(publication.base.content[0]?.locale, { value: 'Not implemented' });
      });
    });

    describe('pending composition', () => {
      test('nests real pending Sections in Lesson and Lesson in Course for multiple locales', () => {
        const quiz = definePendingQuizSection({ id: id('07'), slug: 'pendingQuiz' });
        const cards = definePendingFlashcardsSection({ id: id('08'), slug: 'pendingCards' });
        const lesson = defineLesson({
          id: id('09'),
          slug: 'nestedLesson',
          type: 'lesson',
          skills: [],
          params: {
            languages: ['pl', 'qm'] as const,
            quizRequiredForCompletion: false,
            sections: { allowNavigation: true, allowSkipping: true, showIndexes: false },
          },
          locale: { title: 'Not implemented' },
          section: {
            items: { pendingQuiz: quiz, pendingCards: cards },
            order: ['pendingQuiz', 'pendingCards'],
          },
        });
        const course = defineCourse({
          id: id('10'),
          slug: 'nestedCourse',
          type: 'course',
          params: { languages: ['pl', 'qm'] as const },
          locale: { title: 'Contract fixture', description: 'Contract fixture' },
          content: { items: { nestedLesson: lesson }, order: ['nestedLesson'] },
        });
        for (const language of ['pl', 'qm'] as const) {
          const lessonPublication = lesson.build.props({ languages: [language] });
          const coursePublication = course.build.props({ languages: [language] });
          assert.equal(lesson_Props_Schema.safeParse(lessonPublication.base).success, true);
          assert.equal(course_Props_Schema.safeParse(coursePublication.base).success, true);
          assert.deepEqual(lessonPublication.base.section.map(section => section.slug), [
            'pendingQuiz',
            'pendingCards',
          ]);
          assert.equal(coursePublication.base.content[0]?.type, 'lesson');
        }
      });

      test('reserved UUIDs are deterministic across calls, roles and authored identities', () => {
        const roles = ['lesson/contentSection', 'lesson/notice', 'quiz/notice', 'quiz/questionSelection', 'flashcards/notice', 'flashcards/flashcardSelection'];
        const uuids = roles.map(role => pendingUuid(id('11'), role));
        assert.equal(new Set(uuids).size, roles.length);
        assert.equal(pendingUuid(id('11'), roles[0]), uuids[0]);
        assert.notEqual(pendingUuid(id('12'), roles[0]), uuids[0]);
        for (const uuid of uuids) {
          assert.match(uuid, /^feedc0de-[a-f0-9]{4}-8[a-f0-9]{3}-a[a-f0-9]{3}-[a-f0-9]{12}$/);
          assert.equal(z.uuid().safeParse(uuid).success, true);
        }
      });

      test('rejects unexpected caller fields at runtime', () => {
        assert.throws(
          () => definePendingLesson({ id: id('13'), slug: 'extra', params: {} } as never),
          /only id and slug/,
        );
        assert.throws(
          () => definePendingQuizSection({ id: id('14'), slug: 'extra', type: 'quiz' } as never),
          /only id and slug/,
        );
        assert.throws(
          () => definePendingFlashcardsSection({ id: id('15'), slug: 'extra', locale: {} } as never),
          /only id and slug/,
        );
      });
    });
  });
});
