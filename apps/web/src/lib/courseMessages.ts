/** Host-owned course UI messages; educational content comes from published packages only. */
import type { CourseMessages } from '@svitlo/ui-kit';

const ukMessages: CourseMessages = {
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
  languages: 'Course languages',
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

export function getCourseMessages(language: string): CourseMessages {
  return language === 'uk' ? ukMessages : enMessages;
}
