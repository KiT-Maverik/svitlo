import { allLanguageCodes } from '../../schemas/languages.schemas';
import { defineText } from '../contentBlocks/defineText/defineText';
import { defineContentSection } from '../sections/defineContentSection/defineContentSection';
import { defineQuizSection } from '../sections/defineQuizSection/defineQuizSection';
import { defineFlashcardsSection } from '../sections/defineFlashcardsSection/defineFlashcardsSection';
import { defineLesson } from '../lessons/defineLesson/defineLesson';
import { pendingUuid } from './pendingIdentity';

type PendingIdentity<Slug extends string> = { id: string; slug: Slug };
const NOT_IMPLEMENTED = 'Not implemented';

/** Reject even JavaScript callers that attempt to supply provisional metadata or content. */
const assertIdentityOnly = (identity: PendingIdentity<string>): void => {
  const keys = Object.keys(identity);
  if (keys.length !== 2 || !keys.includes('id') || !keys.includes('slug')) {
    throw new Error('Pending configurators accept only id and slug');
  }
};

const pendingNotice = (id: string, role: string) =>
  defineText({
    id: pendingUuid(id, role + '/notice'),
    slug: 'pendingNotice',
    type: 'text',
    params: {},
    locale: { value: NOT_IMPLEMENTED },
  });

/**
 * Draft-only Lesson scaffold. It is a normal defineLesson configurator, with a
 * real Content Section and Text block for a visible invariant draft notice.
 * The authored id/slug survive replacement with the completed Lesson.
 */
export const definePendingLesson = <const Slug extends string>(identity: PendingIdentity<Slug>) => {
  assertIdentityOnly(identity);
  const { id, slug } = identity;
  const pendingContent = defineContentSection({
    id: pendingUuid(id, 'lesson/contentSection'),
    slug: 'pendingContent',
    type: 'content',
    params: {},
    locale: { title: NOT_IMPLEMENTED, navigationLabel: NOT_IMPLEMENTED },
    content: {
      items: { pendingNotice: pendingNotice(id, 'lesson') },
      order: ['pendingNotice'],
    },
  });
  return defineLesson({
    id,
    slug,
    type: 'lesson',
    skills: [],
    params: {
      languages: allLanguageCodes,
      quizRequiredForCompletion: false,
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: false },
    },
    locale: { title: NOT_IMPLEMENTED },
    section: { items: { pendingContent }, order: ['pendingContent'] },
  });
};

/**
 * Draft-only Quiz scaffold. Disabled by default: its reserved Question UUID
 * must never be treated as a real bank, a playable Quiz, or a completed
 * required assessment. Draft Preview handling of disabled Sections belongs to H.
 */
export const definePendingQuizSection = <const Slug extends string>(identity: PendingIdentity<Slug>) => {
  assertIdentityOnly(identity);
  const { id, slug } = identity;
  return defineQuizSection({
    id,
    slug,
    type: 'quiz',
    params: {
      disabled: true,
      skippable: true,
      isBlocker: false,
      selection: { mode: 'all', questionIds: [pendingUuid(id, 'quiz/questionSelection')] },
      layout: { mode: 'stack', showProgress: false },
      feedbackMode: 'after-completion',
      interaction: {
        retries: 0,
        showErrors: false,
        showCorrectAnswers: false,
        allowExplanations: false,
        allowDeferring: false,
        allowQuestionNavigation: false,
        skippable: true,
      },
      results: { visibility: 'hidden', showScore: false },
      screen: { starting: { showDefaultContent: true, content: ['pendingNotice'] } },
    },
    locale: { title: NOT_IMPLEMENTED, navigationLabel: NOT_IMPLEMENTED },
    content: {
      items: { pendingNotice: pendingNotice(id, 'quiz') },
      order: ['pendingNotice'],
    },
  });
};

/**
 * Draft-only Flashcards Section scaffold. The reserved Flashcard UUID is not
 * a resource and must be replaced with an independently authored bank UUID.
 */
export const definePendingFlashcardsSection = <const Slug extends string>(identity: PendingIdentity<Slug>) => {
  assertIdentityOnly(identity);
  const { id, slug } = identity;
  return defineFlashcardsSection({
    id,
    slug,
    type: 'flashcards',
    params: {
      disabled: true,
      skippable: true,
      selection: { flashcardIds: [pendingUuid(id, 'flashcards/flashcardSelection')] },
    },
    locale: { title: NOT_IMPLEMENTED, navigationLabel: NOT_IMPLEMENTED },
    content: {
      items: { pendingNotice: pendingNotice(id, 'flashcards') },
      order: ['pendingNotice'],
    },
  });
};
