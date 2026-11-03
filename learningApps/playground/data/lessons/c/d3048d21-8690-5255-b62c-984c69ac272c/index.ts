import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine';
import { defineLessonData, type Lesson } from '@svitlo/engine/content';
import { howLightMoves_Flashcards } from './flashcards';
import { howLightMoves_Questions } from './questions';
import { practice_Section } from './sections/practice';
import { quiz_Section } from './sections/quiz';
import { theoryData } from './sections/theory/theory.data';

export const howLightMoves_Data = defineLessonData({
  id: 'd3048d21-8690-5255-b62c-984c69ac272c',
  slug: 'howLightMoves',
  title:  {
    en: 'How Light Travels',
    qm: 'Yarıq nasıl yayıla?',
    lt: 'Kaip sklinda šviesa',
    lv: 'Kā izplatās gaisma',
    et: 'Kuidas valgus levib',
    be: 'Як пашыраецца сьвятло',
    ka: 'როგორ ვრცელდება სინათლე',
    kk: 'Жарық қалай таралады',
    zh: '光是如何传播的',
    hi: 'प्रकाश कैसे चलता है',
    es: 'Cómo se propaga la luz',
    ar: 'كيف ينتشر الضوء',
    fr: 'Comment la lumière se propage',
    bn: 'আলো কীভাবে চলাচল করে',
    pt: 'Como a luz se propaga',
    ur: 'روشنی کیسے سفر کرتی ہے',
    id: 'Bagaimana Cahaya Merambat',
    de: 'Wie sich Licht ausbreitet',
    ja: '光はどのように進むのか',
    ko: '빛은 어떻게 이동할까',
    tr: 'Işık Nasıl Yayılır?',
    vi: 'Ánh sáng truyền đi như thế nào',
    ta: 'ஒளி எவ்வாறு பயணிக்கிறது',
    te: 'కాంతి ఎలా ప్రయాణిస్తుంది',
    mr: 'प्रकाश कसा प्रवास करतो',
    ms: 'Bagaimana Cahaya Bergerak',
    he: 'כיצד האור מתקדם',
    pl: 'Jak rozchodzi się światło',
    uk: 'Як рухається світло',
  },
  flashcards: howLightMoves_Flashcards,
  parameters: {
    requireQuiz: true,
    languages: [
      DEFAULT_SUPPORTED_LANGUAGES[0].language,
      ...DEFAULT_SUPPORTED_LANGUAGES.slice(1).map(({ language }) => language),
    ],
    sections: {
      allowNavigation: true,
      allowSkipping: true,
      showIndexes: true,
      order: ['theory', 'practice', 'quiz'],
    },
  },
  questions: howLightMoves_Questions,
  sections: {
    theory: theoryData,
    practice: practice_Section,
    quiz: quiz_Section,
  },
} satisfies Lesson<'data'>);

const scenes = [
  theoryData.content.scene.lightPropagationSimulation.id,
  theoryData.content.scene.lightRayDiagram.id,
  practice_Section.content.scene.showcase.id,
] as const;
