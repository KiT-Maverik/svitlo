import type { ChildSupporting, ChildrenSupporting } from '#types';

import { defineText } from '../contentBlocks/defineText/defineText';
import { defineLesson } from '../lessons/defineLesson/defineLesson';
import { defineContentSection } from './defineContentSection/defineContentSection';

/** Compile-time evidence: a parent may advertise only languages each child supports. */
function authoringLanguageContracts() {
  const enUkText = defineText<'paragraph', ['en', 'uk']>({
    id: '663572e7-bd85-4516-86e2-3de07d209e01',
    slug: 'paragraph', type: 'text', params: {},
    locale: { value: { en: 'Hello', uk: 'Привіт' } },
  });
  const ukText = defineText<'ukOnly', ['uk']>({
    id: '663572e7-bd85-4516-86e2-3de07d209e02',
    slug: 'ukOnly', type: 'text', params: {},
    locale: { value: { uk: 'Тільки українська' } },
  });

  const allowed: ChildSupporting<['uk'], typeof enUkText> = enUkText;
  // @ts-expect-error A child supporting only Ukrainian cannot support an English + Ukrainian parent.
  const forbidden: ChildSupporting<['en', 'uk'], typeof ukText> = ukText;
  void allowed;
  void forbidden;

  const bilingual = defineContentSection<'intro', { paragraph: typeof enUkText }, ['en', 'uk']>({
    id: '663572e7-bd85-4516-86e2-3de07d209e03',
    slug: 'intro', type: 'content', params: {},
    locale: { title: { en: 'Intro', uk: 'Вступ' }, navigationLabel: '1' },
    content: { items: { paragraph: enUkText }, order: ['paragraph'] },
  });
  bilingual.build.overrides({
    content: {
      additionalItems: {
        // @ts-expect-error A new child must support every language of the parent Section.
        ukOnly: ukText,
      },
      order: ['paragraph', 'ukOnly'],
    },
  });
  bilingual.build.overrides({
    content: {
      items: {
        // @ts-expect-error Existing child slugs remain literal keys; unknown keys are rejected.
        missing: false,
      },
    },
  });

  const ukrainian = defineContentSection<'onlyUkrainian', { ukOnly: typeof ukText }, ['uk']>({
    id: '663572e7-bd85-4516-86e2-3de07d209e04',
    slug: 'onlyUkrainian', type: 'content', params: {},
    locale: { title: { uk: 'Вступ' }, navigationLabel: '1' },
    content: { items: { ukOnly: ukText }, order: ['ukOnly'] },
  });

  const impossible: ChildrenSupporting<['en', 'uk'], { onlyUkrainian: typeof ukrainian }> = {
    // @ts-expect-error Section child fails bilingual Lesson's required language coverage.
    onlyUkrainian: ukrainian,
  };
  void impossible;

  const lesson = defineLesson({
    id: '663572e7-bd85-4516-86e2-3de07d209e05',
    slug: 'typedLesson', type: 'lesson', skills: [],
    params: {
      requireQuiz: false, languages: ['uk'] as const,
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: false },
    },
    locale: { title: { uk: 'Урок' } },
    section: { items: { intro: bilingual }, order: ['intro'] },
    flashcards: { items: {}, order: [] },
  });
  lesson.build.overrides({ section: { items: { intro: { locale: { title: { uk: 'Оновлено' } } } } } });
}

void authoringLanguageContracts;
