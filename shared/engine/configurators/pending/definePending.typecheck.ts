import { definePendingLesson, definePendingQuizSection, definePendingFlashcardsSection } from './definePending';
import { defineCourse } from '../courses/defineCourse/defineCourse';

function pendingTypeContracts() {
  const id = 'ba8157c6-ae4e-49dc-9672-73e09d441801';
  const lesson = definePendingLesson({ id, slug: 'pendingLesson' });
  const quiz = definePendingQuizSection({ id, slug: 'pendingQuiz' });
  const cards = definePendingFlashcardsSection({ id, slug: 'pendingCards' });

  const lessonSlug: 'pendingLesson' = lesson.slug;
  const sectionSlug: 'pendingContent' = lesson.section.items.pendingContent.slug;
  const quizSlug: 'pendingQuiz' = quiz.slug;
  const cardsSlug: 'pendingCards' = cards.slug;
  void lessonSlug;
  void sectionSlug;
  void quizSlug;
  void cardsSlug;

  lesson.build.props({ languages: ['pl', 'qm'] });
  quiz.build.props({ languages: ['pl', 'qm'] });
  cards.build.props({ languages: ['pl', 'qm'] });
  // @ts-expect-error Publication must explicitly select languages.
  lesson.build.props();
  // @ts-expect-error An invalid language cannot be published.
  quiz.build.props({ languages: ['xx'] });

  const course = defineCourse({
    id: 'ba8157c6-ae4e-49dc-9672-73e09d441802',
    slug: 'pendingCourse',
    type: 'course',
    params: { languages: ['pl', 'qm'] as const },
    locale: { title: 'Type fixture', description: 'Type fixture' },
    content: { items: { pendingLesson: lesson }, order: ['pendingLesson'] },
  });
  course.build.props({ languages: ['qm'] });

  // @ts-expect-error The pending API accepts only id and slug.
  definePendingLesson({ id, slug: 'badLesson', params: {} });
  // @ts-expect-error The pending API accepts only id and slug.
  definePendingQuizSection({ id, slug: 'badQuiz', selection: {} });
  // @ts-expect-error The pending API accepts only id and slug.
  definePendingFlashcardsSection({ id, slug: 'badCards', title: 'Invented' });
  // @ts-expect-error id is mandatory.
  definePendingLesson({ slug: 'missingId' });
}

void pendingTypeContracts;
