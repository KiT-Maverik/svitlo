import { defineFlashcard, defineFlashcardSide, defineText } from '@svitlo/engine/build';

const front = defineText({
  id: '00000000-0000-4000-8000-000000000041',
  slug: 'front',
  type: 'text',
  params: {},
  locale: { value: { en: 'Remember this', uk: 'Пригадайте це' } },
});
const back = defineText({
  id: '00000000-0000-4000-8000-000000000042',
  slug: 'back',
  type: 'text',
  params: {},
  locale: { value: { en: 'Fixture answer', uk: 'Тестова відповідь' } },
});

const sampleFlashcard = defineFlashcard({
  id: '00000000-0000-4000-8000-000000000002',
  slug: 'sampleFlashcard',
  parameters: { tags: [], flags: [] },
  content: {
    front: defineFlashcardSide({ items: { front }, order: ['front'] }),
    back: defineFlashcardSide({ items: { back }, order: ['back'] }),
  },
});

export const fixtureFlashcards = { items: { sampleFlashcard } };
