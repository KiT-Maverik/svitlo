import { defineText } from '../contentBlocks/primitive/defineText';
import { defineLesson } from '../lessons/defineLesson';
import { defineContentSection } from '../sections/defineContentSection';
import { placeLesson } from './placeLesson';

/**
 * Integration contract: source materializers can emit Course-owned placement
 * patches using the actual concrete Lesson/Section Build API.
 *
 * Keep this a real compile-time fixture. Do not replace the source with an
 * unspecialized Lesson_Configurator, cast through never/any, or remove positive
 * examples merely to satisfy TypeScript. Runtime/Stage 5 tests must separately
 * prove publication, locale selection, and immutable reuse.
 */
const paragraph = defineText({
  id: 'b775647f-203d-481a-a1c7-4d331c779d31',
  slug: 'paragraph',
  type: 'text',
  params: {},
  locale: { value: 'Original' },
});

const intro = defineContentSection({
  id: 'b775647f-203d-481a-a1c7-4d331c779d32',
  slug: 'intro',
  type: 'content',
  params: {},
  locale: { title: 'Introduction', navigationLabel: 'Introduction' },
  children: ['paragraph'],
  paragraph,
});

const lesson = defineLesson({
  id: 'b775647f-203d-481a-a1c7-4d331c779d33',
  slug: 'sourceLesson',
  type: 'lesson',
  skills: [],
  params: {
    quizRequiredForCompletion: false,
    languages: ['en'] as const,
    sections: { allowNavigation: true, allowSkipping: true, showIndexes: false },
  },
  locale: { title: 'Source Lesson' },
  children: ['intro'],
  intro,
});

// Existing Section and nested ContentBlock patches use direct placement keys.
const reused = placeLesson(lesson, {
  children: ['intro'],
  intro: { paragraph: { locale: { value: { en: 'Placement text' } } } },
});
reused.build.data({ languages: ['en'] });

// Trusted added Sections are direct entries with a complete replacement order.
const extra = defineContentSection({
  id: 'b775647f-203d-481a-a1c7-4d331c779d34',
  slug: 'extra',
  type: 'content',
  params: {},
  locale: { title: 'Extra', navigationLabel: 'Extra' },
  children: [],
});

const extended = placeLesson(lesson, {
  children: ['intro', 'extra'],
  extra,
});
extended.build.data({ languages: ['en'] });

void reused;
void extended;
