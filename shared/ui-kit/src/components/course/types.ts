import type { LanguageCode } from '@svitlo/contracts/localization';

/** Presentation-only view models. Hosts adapt published Course_Toc and course metadata to these props. */
export type CourseTone = 'sky' | 'amber' | 'sage';

export type CoursePreview = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  lessons: number;
  modules: number;
  duration?: string;
  /** Language keys actually available for this course, not the app-wide locale list. */
  languages?: readonly LanguageCode[];
  tone?: CourseTone;
  /** Optional teaser outcomes; no progress or completion is inferred. */
  highlights?: readonly string[];
};

export type CourseListItem = { course: CoursePreview; href: string };

export type CourseOutlineItem = {
  id: string;
  type: 'module' | 'chapter' | 'lesson' | 'episode';
  title: string;
  href?: string;
  children?: readonly CourseOutlineItem[];
};

/** UI copy belongs to the host; UI Kit does not assume an application locale. */
export type CourseMessages = {
  catalogEyebrow: string;
  catalogTitle: string;
  catalogDescription: string;
  explore: string;
  lessons: string;
  languages: string;
  modules: string;
  emptyCatalog: string;
  backToCatalog: string;
  contents: string;
  about: string;
  highlights: string;
  startCourse: string;
  previewOnly: string;
  noContents: string;
  module: string;
  chapter: string;
  lesson: string;
  episode: string;
};
