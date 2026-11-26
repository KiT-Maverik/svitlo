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

/** The language notice follows the host's existing Ukrainian/English Course UI localization. */
export function getCourseLanguageFallbackNotice(interfaceLanguage: string, requested: string, actual: string): string {
  const names = new Intl.DisplayNames([interfaceLanguage], { type: 'language' });
  const original = names.of(requested) ?? requested;
  const selected = names.of(actual) ?? actual;
  return interfaceLanguage === 'uk'
    ? `Курс поки що недоступний мовою «${original}». Показуємо доступну версію мовою «${selected}».`
    : `This course is not available in ${original}. Showing the available ${selected} version instead.`;
}

/** Course publication failures are distinct from missing Courses (404). */
export function getCourseLoadFailureMessages(language: string) {
  return language === 'uk'
    ? {
        title: 'Не вдалося завантажити курс',
        description: 'Виникла помилка під час завантаження курсу. Спробуйте ще раз.',
        retry: 'Спробувати ще раз',
        back: 'Усі курси',
      }
    : {
        title: 'Unable to load this course',
        description: 'An error occurred while loading this course. Please try again.',
        retry: 'Try again',
        back: 'All courses',
      };
}
