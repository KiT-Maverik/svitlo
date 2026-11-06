import type { Meta, StoryObj } from '@storybook/nextjs';
import { CoursePage } from './CoursePage';
import type { CourseMessages } from './types';

const messages: CourseMessages = {
  catalogEyebrow: 'Курси',
  catalogTitle: 'Усі курси',
  catalogDescription: 'Навчальні пригоди',
  explore: 'Переглянути',
  lessons: 'уроків',
  modules: 'модулів',
  emptyCatalog: 'Курсів немає',
  backToCatalog: 'Усі курси',
  contents: 'Програма курсу',
  about: 'Про курс',
  highlights: 'Що ти дізнаєшся',
  startCourse: 'Почати навчання',
  previewOnly: 'Уроки будуть доступні пізніше',
  noContents: 'Програма ще формується',
  module: 'Модуль',
  chapter: 'Глава',
  lesson: 'Урок',
  episode: 'Епізод',
};
const meta = {
  title: 'Course/Page',
  component: CoursePage,
  args: {
    catalogHref: '/uk/courses',
    messages,
    course: {
      id: 'demo',
      title: 'Подорож світла',
      description: 'Досліджуй світло за допомогою коротких уроків та інтерактивних історій.',
      category: 'Фізика',
      level: 'Для початківців',
      lessons: 3,
      modules: 1,
      tone: 'sky',
      highlights: ['Досліджуй світло', 'Застосовуй знання на практиці'],
    },
    outline: [
      {
        id: 'module-one',
        type: 'module',
        title: 'Лабораторія світла',
        children: [
          {
            id: 'chapter-one',
            type: 'chapter',
            title: 'Перші кроки',
            children: [
              { id: 'lesson-one', type: 'lesson', title: 'Що таке світло?', href: '/uk/course/demo/lesson/lesson-one' },
              {
                id: 'episode-one',
                type: 'episode',
                title: 'Таємна історія',
                href: '/uk/course/demo/episode/episode-one',
              },
            ],
          },
        ],
      },
    ],
  },
} satisfies Meta<typeof CoursePage>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const PreviewOnly: Story = {
  args: {
    outline: [{ id: 'lesson-two', type: 'lesson', title: 'Що таке промінь?' }],
  },
};
