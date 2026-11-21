import { z } from 'zod';

import { chapter_Config_Schema } from '../courses/defineChapter/defineChapter.schemas';
import { course_Config_Schema } from '../courses/defineCourse/defineCourse.schemas';
import { module_Config_Schema } from '../courses/defineModule/defineModule.schemas';
import { episode_Config_Schema } from '../episodes/defineEpisode/defineEpisode.schemas';
import { flashcard_Config_Schema } from '../flashcards/defineFlashcard/defineFlashcard.schemas';
import { lesson_Config_Schema } from '../lessons/defineLesson/defineLesson.schemas';
import { yamlContentBlock_Schema } from './yamlContentBlock.schemas';
import { yamlSection_Schema } from './yamlSection.schemas';

/** Flashcard Config uses live ContentBlock configurators in three named collections. */
const cardBlocks = flashcard_Config_Schema.shape.content.shape.front.extend({
  items: z.record(z.string(), yamlContentBlock_Schema),
});
export const yamlFlashcard_Schema = flashcard_Config_Schema.extend({
  content: flashcard_Config_Schema.shape.content.extend({
    front: cardBlocks,
    back: cardBlocks,
    hint: cardBlocks.optional(),
  }),
});

const sectionCollection = lesson_Config_Schema.shape.section.extend({
  items: z.record(z.string(), yamlSection_Schema),
});
/** Standalone Lesson YAML is a serializable Config tree, never published Props. */
export const yamlLesson_Schema = lesson_Config_Schema.extend({
  section: sectionCollection,
}).strict();

/** Episodes are Course-owned and do not inherit Lesson's assessment contract. */
export const yamlEpisode_Schema = episode_Config_Schema.extend({
  section: episode_Config_Schema.shape.section.extend({
    items: z.record(z.string(), yamlSection_Schema),
  }),
});

/**
 * Course content references an already-authored standalone Lesson by UUID.
 * The `lessonReference` discriminator selects a *reference*, not an inline
 * Lesson Config. Inline Lessons retain the sole `lesson` discriminator. Its source import is an authoring/codegen concern.
 */
export const yamlLessonReference_Schema = z.strictObject({
  type: z.literal('lessonReference'),
  lessonId: lesson_Config_Schema.shape.id,
  slug: lesson_Config_Schema.shape.slug.optional(),
});

export const yamlChapter_Schema = chapter_Config_Schema.extend({
  content: chapter_Config_Schema.shape.content.extend({
    items: z.record(
      z.string(),
      z.discriminatedUnion('type', [yamlEpisode_Schema, yamlLesson_Schema, yamlLessonReference_Schema]),
    ),
  }),
});

export const yamlModule_Schema = module_Config_Schema.extend({
  content: module_Config_Schema.shape.content.extend({
    items: z.record(
      z.string(),
      z.discriminatedUnion('type', [yamlChapter_Schema, yamlEpisode_Schema, yamlLesson_Schema, yamlLessonReference_Schema]),
    ),
  }),
});

/** Course/Module/Chapter nesting follows Engine ownership and allowed child kinds. */
export const yamlCourse_Schema = course_Config_Schema.extend({
  content: course_Config_Schema.shape.content.extend({
    items: z.record(
      z.string(),
      z.discriminatedUnion('type', [
        yamlModule_Schema,
        yamlChapter_Schema,
        yamlEpisode_Schema,
        yamlLesson_Schema,
        yamlLessonReference_Schema,
      ]),
    ),
  }),
});
