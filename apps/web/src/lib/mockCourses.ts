import type { Course_Toc, Course_TocContent } from '@svitlo/engine/content';
import type { CourseMessages, CourseOutlineItem, CoursePreview } from '@svitlo/ui-kit/course';

type MockCourse = {
  preview: CoursePreview;
  toc: Course_Toc;
  /** Only Playground's sample Course currently has published Lesson/Episode routes. */
  published: boolean;
};

export const PLAYGROUND_COURSE_ID = '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67';

/**
 * Temporary Web-host demo content. This module is NOT authored Course data and is
 * never used by the textbook generator. Replace this source with published metadata
 * and TOCs once a Course catalog resource is available.
 */
export function getMockCourses(language: string): readonly MockCourse[] {
  // Prototype copy: Ukrainian and English. Other languages show English until course catalog localization ships.
  const t = (uk: string, en: string) => language === 'uk' ? uk : en;

  return [
    {
      published: true,
      preview: {
        id: PLAYGROUND_COURSE_ID,
        title: t('Подорож світла', 'Journey of Light'),
        description: t('Досліджуй, як рухається світло, звідки воно береться і чому змінює наш світ. Навчання через короткі уроки та історії.', 'Explore how light moves, where it comes from, and how it changes our world through short lessons and stories.'),
        category: t('Фізика', 'Physics'),
        level: t('Для допитливих', 'For curious learners'),
        lessons: 3,
        modules: 1,
        tone: 'sky',
        highlights: [
          t('Побачиш, як поширюється світло', 'Explore how light travels'),
          t('Спробуєш інтерактивні завдання', 'Try interactive activities'),
          t('Пройдеш історію з короткими епізодами', 'Follow a story with short episodes'),
        ],
      },
      toc: {
        type: 'course',
        id: PLAYGROUND_COURSE_ID,
        title: t('Подорож світла', 'Journey of Light'),
        children: [{
          type: 'module',
          id: 'b0fdbf9c-56d5-57ad-a1b4-19b8707e1481',
          title: t('Лабораторія світла', 'The Light Laboratory'),
          children: [{
            type: 'chapter',
            id: 'a6435356-6632-51d9-84f3-d88c29e42ac8',
            title: t('Перші кроки', 'First steps'),
            children: [
              { type: 'lesson', id: 'f760e7b7-9f77-5027-89ce-4e40d9d031a1', title: t('Відкриття світла', 'Discovering Light') },
              { type: 'episode', id: '9f417177-1d07-5a9d-ad74-0146c5637e84', title: t('Таємниця світла', 'The Secret of Light') },
              { type: 'lesson', id: 'd3048d21-8690-5255-b62c-984c69ac272c', title: t('Як рухається світло', 'How Light Moves') },
            ],
          }, {
            type: 'lesson', id: 'b256e7b2-9f7d-5a9a-a0cb-3f3c2734b8a2',
            title: t('Дослідження світла', 'Exploring Light'),
          }],
        }],
      },
    },
    {
      published: false,
      preview: {
        id: '3eedbbbf-3f9b-5de1-bc5b-2ca45fa012c3',
        title: t('Математика навколо нас', 'Everyday Mathematics'),
        description: t('Від чисел і форм до задач із реального життя. Майбутній курс для тих, хто любить знаходити закономірності.', 'From numbers and shapes to real-life puzzles. A preview for learners who like discovering patterns.'),
        category: t('Математика', 'Mathematics'),
        level: t('Базовий рівень', 'Foundations'),
        lessons: 4,
        modules: 2,
        tone: 'amber',
        highlights: [t('Розвиватимеш логічне мислення', 'Develop logical thinking'), t('Навчишся бачити математику довкола', 'Find maths in everyday life')],
      },
      toc: {
        type: 'course',
        id: '3eedbbbf-3f9b-5de1-bc5b-2ca45fa012c3',
        title: t('Математика навколо нас', 'Everyday Mathematics'),
        children: [{
          type: 'module', id: '34eed7f9-41c9-50c8-8cea-9e9f3a32dc12',
          title: t('Числа та закономірності', 'Numbers and Patterns'),
          children: [
            { type: 'lesson', id: '9528e76a-bd03-5dc6-9297-4aa9dd195080', title: t('Світ чисел', 'The World of Numbers') },
            { type: 'lesson', id: 'd0c6461f-ad8c-580a-b866-cff2354f37bc', title: t('Шукаємо закономірності', 'Finding Patterns') },
          ],
        }, {
          type: 'module', id: 'd91773e9-b423-5552-9087-7d19ae478352',
          title: t('Форми та простір', 'Shapes and Space'),
          children: [
            { type: 'lesson', id: '5be477bd-c2f9-53e6-82bf-3986d40abac2', title: t('Геометрія довкола', 'Geometry All Around') },
            { type: 'lesson', id: 'e5a7df64-ccf7-5f9d-bc93-3ec1e6ee3872', title: t('Математичні пригоди', 'Math Adventures') },
          ],
        }],
      },
    },
    {
      published: false,
      preview: {
        id: 'fc2f16bb-1e49-5247-b9e1-ae2f7404f306',
        title: t('Таємниці космосу', 'Secrets of Space'),
        description: t('Планети, зорі, супутники й великі запитання про Всесвіт. Попередній перегляд майбутньої космічної подорожі.', 'Planets, stars, moons, and big questions about the universe. An early preview of a space adventure.'),
        category: t('Астрономія', 'Astronomy'),
        level: t('Для початківців', 'Beginner'),
        lessons: 2,
        modules: 1,
        tone: 'sage',
        highlights: [t('Познайомишся із Сонячною системою', 'Meet the Solar System'), t('Дізнаєшся, як живуть зорі', 'Discover the life of stars')],
      },
      toc: {
        type: 'course',
        id: 'fc2f16bb-1e49-5247-b9e1-ae2f7404f306',
        title: t('Таємниці космосу', 'Secrets of Space'),
        children: [{
          type: 'module', id: '7a6a6c78-091c-5539-9cce-416619e4b36a',
          title: t('Подорож Всесвітом', 'Journey Through Space'),
          children: [{
            type: 'chapter', id: 'c62408a5-e429-5fc4-a8bd-a523c0a93edf',
            title: t('Наш космічний дім', 'Our Cosmic Home'),
            children: [
              { type: 'lesson', id: '04de7950-2e0e-5036-8b39-f1bc1135d597', title: t('Сонячна система', 'The Solar System') },
              { type: 'episode', id: '7ea77f27-b317-5982-b4c3-d378c07a647a', title: t('Послання з орбіти', 'A Message from Orbit') },
              { type: 'lesson', id: 'f5d2ca35-d09e-54ad-90f7-0bd9416fe91b', title: t('Зорі та галактики', 'Stars and Galaxies') },
            ],
          }],
        }],
      },
    },
  ];
}

export function getMockCourse(id: string, language: string): MockCourse | undefined {
  return getMockCourses(language).find(course => course.preview.id === id);
}

export function mockCourseOutline(course: MockCourse, language: string): readonly CourseOutlineItem[] {
  const root = `/${language}/course/${course.preview.id}`;
  const toItem = (node: Course_TocContent): CourseOutlineItem => ({
    id: node.id,
    type: node.type,
    title: node.title,
    ...('children' in node
      ? { children: node.children.map(toItem) }
      : course.published
        ? { href: node.type === 'lesson' ? `${root}/lesson/${language}/${node.id}` : `${root}/episode/${node.id}` }
        : {}),
  });
  return course.toc.children.map(toItem);
}

const ukMessages: CourseMessages = {
  catalogEyebrow: 'Навчання зі Svitlo',
  catalogTitle: 'Обирай свою наступну пригоду',
  catalogDescription: 'Короткі інтерактивні курси, які перетворюють цікавість на нові відкриття.',
  explore: 'Переглянути курс',
  lessons: 'уроків',
  modules: 'модулів',
  emptyCatalog: 'Поки що курсів немає.',
  backToCatalog: 'Усі курси',
  contents: 'Програма курсу',
  about: 'Про курс',
  highlights: 'Що ти дізнаєшся',
  startCourse: 'Почати навчання',
  previewOnly: 'Це попередній перегляд. Уроки будуть доступні пізніше.',
  noContents: 'Програма курсу ще формується.',
  module: 'Модуль',
  chapter: 'Глава',
  lesson: 'Урок',
  episode: 'Епізод',
};

const enMessages: CourseMessages = {
  catalogEyebrow: 'Learn with Svitlo',
  catalogTitle: 'Choose your next adventure',
  catalogDescription: 'Short interactive courses that turn curiosity into new discoveries.',
  explore: 'Explore course',
  lessons: 'lessons',
  modules: 'modules',
  emptyCatalog: 'No courses available yet.',
  backToCatalog: 'All courses',
  contents: 'Course outline',
  about: 'About this course',
  highlights: "What you'll discover",
  startCourse: 'Start learning',
  previewOnly: 'This is an early preview. Lessons will be available later.',
  noContents: 'The course outline is being prepared.',
  module: 'Module',
  chapter: 'Chapter',
  lesson: 'Lesson',
  episode: 'Episode',
};

/** Demo UI labels are intentionally not added to global published UI Kit dictionaries yet. */
export function getMockCourseMessages(language: string): CourseMessages {
  return language === 'uk' ? ukMessages : enMessages;
}
