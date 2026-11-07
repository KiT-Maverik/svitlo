import type { Meta, StoryObj } from '@storybook/nextjs';
import { CoursesPage } from './CoursesPage';
import type { CourseMessages } from './types';

const messages: CourseMessages = {
  catalogEyebrow: 'Навчання зі Svitlo',
  catalogTitle: 'Обирай свою наступну пригоду',
  catalogDescription: 'Короткі інтерактивні курси, які перетворюють цікавість на нові відкриття.',
  explore: 'Переглянути курс',
  lessons: 'уроків',
  languages: 'Мови курсу',
  modules: 'модулів',
  emptyCatalog: 'Поки що курсів немає.',
  backToCatalog: 'Усі курси',
  contents: 'Програма курсу',
  about: 'Про курс',
  highlights: 'Що ти дізнаєшся',
  startCourse: 'Почати навчання',
  previewOnly: 'Уроки будуть доступні пізніше.',
  noContents: 'Програма курсу ще формується.',
  module: 'Модуль',
  chapter: 'Глава',
  lesson: 'Урок',
  episode: 'Епізод',
};

const meta = {
  title: 'Course/Catalog',
  component: CoursesPage,
  args: {
    messages,
    interfaceLanguage: 'uk',
    courses: [
      {
        href: '/uk/course/light',
        course: {
          id: 'light',
          title: 'Подорож світла',
          description: 'Відкривай закони світла через інтерактивні уроки.',
          category: 'Фізика',
          level: 'Для початківців',
          lessons: 3,
          modules: 1,
          tone: 'sky',
          languages: ['en', 'uk', 'qm', 'pl', 'de'],
        },
      },
      {
        href: '/uk/course/math',
        course: {
          id: 'math',
          title: 'Математика навколо нас',
          description: 'Числа, форми та задачі з реального життя.',
          category: 'Математика',
          level: 'Базовий рівень',
          lessons: 4,
          modules: 2,
          tone: 'amber',
          languages: ['en', 'uk', 'qm', 'pl', 'de'],
        },
      },
      {
        href: '/uk/course/space',
        course: {
          id: 'space',
          title: 'Таємниці космосу',
          description: 'Планети, зорі та галактики чекають на тебе.',
          category: 'Астрономія',
          level: 'Для початківців',
          lessons: 2,
          modules: 1,
          tone: 'sage',
          languages: ['en', 'uk', 'qm', 'pl', 'de'],
        },
      },
    ],
  },
} satisfies Meta<typeof CoursesPage>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Empty: Story = { args: { courses: [] } };
