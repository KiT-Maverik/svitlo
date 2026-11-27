import type { ChildrenSupporting, ChildSupporting } from '#types';

import { defineText } from '../contentBlocks/primitive/defineText/defineText';
import { defineLesson } from '../lessons/defineLesson/defineLesson';
import { defineContentSection } from './defineContentSection/defineContentSection';

/** Compile-time evidence: a parent may advertise only languages each child supports. */
function authoringLanguageContracts() {
  const enUkText = defineText<'paragraph', ['en', 'uk']>({
    id: '663572e7-bd85-4516-86e2-3de07d209e01',
    slug: 'paragraph',
    type: 'text',
    params: {},
    locale: { value: { en: 'Hello', uk: 'Привіт' } },
  });
  const ukText = defineText<'ukOnly', ['uk']>({
    id: '663572e7-bd85-4516-86e2-3de07d209e02',
    slug: 'ukOnly',
    type: 'text',
    params: {},
    locale: { value: { uk: 'Тільки українська' } },
  });

  const allowed: ChildSupporting<['uk'], typeof enUkText> = enUkText;
  // @ts-expect-error A child supporting only Ukrainian cannot support an English + Ukrainian parent.
  const forbidden: ChildSupporting<['en', 'uk'], typeof ukText> = ukText;
  void allowed;
  void forbidden;

  const bilingual = defineContentSection<'intro', { paragraph: typeof enUkText }, ['en', 'uk']>({
    id: '663572e7-bd85-4516-86e2-3de07d209e03',
    slug: 'intro',
    type: 'content',
    params: {},
    locale: { title: { en: 'Intro', uk: 'Вступ' }, navigationLabel: '1' },
    children: ['paragraph'], paragraph: enUkText,
  });
  // @ts-expect-error Build publication always requires explicit selected languages.
  bilingual.build.data();
  // @ts-expect-error Section can publish only its authored language tuple.
  bilingual.build.data({ languages: ['pl'] });
  // @ts-expect-error Patch publication also requires explicit selected languages.
  bilingual.build.overrides({});
  bilingual.build.overrides(
    {
      children: ['paragraph', 'ukOnly'],
      // @ts-expect-error A new child must support every language of the parent Section.
      ukOnly: ukText,
    },
    { languages: ['uk'] },
  );
  bilingual.build.overrides(
    {
      // @ts-expect-error Unknown child slugs cannot be removed as if they already existed.
      missing: false,
    },
    { languages: ['uk'] },
  );

  const ukrainian = defineContentSection<'onlyUkrainian', { ukOnly: typeof ukText }, ['uk']>({
    id: '663572e7-bd85-4516-86e2-3de07d209e04',
    slug: 'onlyUkrainian',
    type: 'content',
    params: {},
    locale: { title: { uk: 'Вступ' }, navigationLabel: '1' },
    children: ['ukOnly'], ukOnly: ukText,
  });

  const impossible: ChildrenSupporting<['en', 'uk'], { onlyUkrainian: typeof ukrainian }> = {
    // @ts-expect-error Section child fails bilingual Lesson's required language coverage.
    onlyUkrainian: ukrainian,
  };
  void impossible;

  const lesson = defineLesson({
    id: '663572e7-bd85-4516-86e2-3de07d209e05',
    slug: 'typedLesson',
    type: 'lesson',
    skills: [],
    params: {
      quizRequiredForCompletion: false,
      languages: ['uk'] as const,
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: false },
    },
    locale: { title: { uk: 'Урок' } },
    children: ['intro'], intro: bilingual,
  });
  lesson.build.overrides(
    { intro: { locale: { title: { uk: 'Оновлено' } } } },
    { languages: ['uk'] },
  );
  // @ts-expect-error Lesson supports only the authored Ukrainian publication scope.
  lesson.build.data({ languages: ['en'] });
}

void authoringLanguageContracts;
