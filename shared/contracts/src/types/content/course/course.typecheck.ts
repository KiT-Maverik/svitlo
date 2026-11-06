import type {
  Chapter,
  Chapter_Content,
  Course,
  Course_Content,
  Episode,
  Episode_ScenarioSection,
  Module,
  Module_Content,
} from '../../../content';
import type { ContentBlock_Markdown, ContentBlock_Text } from '../blocks';
import type { Section } from '../section.types';

type Languages = readonly ['en', 'uk'];

const title: ContentBlock_Text<'data', Languages> = {
  id: 'title-id',
  slug: 'title',
  type: 'text',
  value: { en: 'Fractions', uk: 'Дроби' },
};
const description: ContentBlock_Markdown<'data', Languages> = {
  id: 'description-id',
  slug: 'description',
  type: 'markdown',
  locales: { en: 'A course on fractions', uk: 'Курс про дроби' },
};
const scenario: Episode_ScenarioSection<'data', Languages> = {
  id: 'scenario-id',
  slug: 'scenario',
  type: 'scenario',
  title: { en: 'Story', uk: 'Історія' },
  navigationLabel: { en: 'Story', uk: 'Історія' },
  content: [],
};
const episode: Episode<'data', Languages> = {
  type: 'episode',
  id: 'episode-id',
  title,
  sections: [scenario],
};
const chapter: Chapter<'data', Languages> = {
  type: 'chapter',
  id: 'chapter-id',
  title,
  content: ['lesson-in-chapter', episode],
};
const module: Module<'data', Languages> = {
  type: 'module',
  id: 'module-id',
  title,
  content: ['lesson-in-module', chapter, episode],
};
const course: Course<'data', Languages> = {
  type: 'course',
  id: 'course-id',
  title,
  description,
  parameters: { languages: ['en', 'uk'] },
  content: ['direct-lesson', episode, chapter, module],
};

const rootItem: Course_Content<'data', Languages> = module;
const moduleItem: Module_Content<'data', Languages> = chapter;
const chapterItem: Chapter_Content<'data', Languages> = episode;

// @ts-expect-error A Module cannot contain another Module.
const nestedModule: Module_Content<'data', Languages> = module;
// @ts-expect-error A Chapter cannot contain another Chapter.
const nestedChapter: Chapter_Content<'data', Languages> = chapter;
// @ts-expect-error A Chapter cannot contain a Module.
const moduleInChapter: Chapter_Content<'data', Languages> = module;

const theorySection: Section<'data', Languages> = {
  ...scenario,
  type: 'theory',
};
// @ts-expect-error An Episode contains only scenario-type Sections.
const theoryInEpisode: Episode_ScenarioSection<'data', Languages> = theorySection;

const partialTitle: ContentBlock_Text<'data', Languages> = {
  id: 'partial-title',
  slug: 'partial-title',
  type: 'text',
  // @ts-expect-error Text must include every language declared by Course.
  value: { en: 'Fractions' },
};
// @ts-expect-error The course language tuple must match the declared tuple.
const missingCourseLanguage: Course<'data', Languages>['parameters']['languages'] = ['en'];

void [
  course,
  rootItem,
  moduleItem,
  chapterItem,
  nestedModule,
  nestedChapter,
  moduleInChapter,
  theoryInEpisode,
  partialTitle,
  missingCourseLanguage,
];
