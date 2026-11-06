import type { Meta, StoryObj } from '@storybook/nextjs';
import { CourseCard } from './CourseCard';

const meta = {
  title: 'Course/Card',
  component: CourseCard,
  args: {
    href: '/uk/course/demo',
    messages: { explore: 'Переглянути курс', lessons: 'уроків', languages: 'Мови курсу' },
    interfaceLanguage: 'uk',
    course: {
      id: 'demo',
      title: 'Подорож світла',
      description: 'Інтерактивна подорож від перших спостережень до власних відкриттів.',
      category: 'Фізика',
      level: 'Для початківців',
      lessons: 4,
      modules: 1,
      languages: ['en', 'uk', 'qm', 'pl', 'de'],
      tone: 'sky',
    },
  },
} satisfies Meta<typeof CourseCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Mathematics: Story = {
  args: { course: { ...meta.args.course, title: 'Математика навколо нас', tone: 'amber', category: 'Математика' } },
};
export const Astronomy: Story = {
  args: { course: { ...meta.args.course, title: 'Таємниці космосу', tone: 'sage', category: 'Астрономія' } },
};
