import { defineLesson } from '@svitlo/engine/build';
import { howLightMoves_languages } from './constants';
import { testExplainLightTravel } from '../../../skills/testLight/testLightPropagation/testExplainLightTravel';
import { contentSection } from './sections/content';
import { practiceSection } from './sections/practice';
import { quizSection } from './sections/quiz';

export const howLightMovesTitle = {
  en: 'How Light Travels',
  it: 'Come si propaga la luce',
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
};

export const howLightMoves = defineLesson({
  id: 'd3048d21-8690-5255-b62c-984c69ac272c',
  slug: 'howLightMoves',
  type: 'lesson',
  skills: [testExplainLightTravel.id],
  params: {
    quizRequiredForCompletion: true,
    languages: howLightMoves_languages,
    sections: {
      allowNavigation: true,
      allowSkipping: true,
      showIndexes: true,
    },
  },
  locale: { title: howLightMovesTitle },
  section: {
    items: { content: contentSection, practice: practiceSection, quiz: quizSection },
    order: ['content', 'practice', 'quiz'],
  },
});
