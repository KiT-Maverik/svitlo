import assert from 'node:assert/strict';
import test from 'node:test';
import { z } from 'zod';

import { course_Config_Schema } from './defineCourse/defineCourse.schemas';
import { module_Config_Schema, module_Props_Schema } from './defineModule/defineModule.schemas';
import { chapter_Config_Schema, chapter_Props_Schema } from './defineChapter/defineChapter.schemas';

test('Module/Chapter Config and Props reject production-only Skill targets', () => {
  for (const [entity, schema] of [
    ['module Config', module_Config_Schema],
    ['module Props', module_Props_Schema],
    ['chapter Config', chapter_Config_Schema],
    ['chapter Props', chapter_Props_Schema],
  ] as const) {
    for (const field of ['outcomes', 'prerequisites']) {
      assert.equal(schema.shape.params.safeParse({ [field]: { skills: [] } }).success, false, entity + '.' + field);
    }
  }
  assert.ok('outcomes' in course_Config_Schema.shape.params.shape);
  assert.ok('prerequisites' in course_Config_Schema.shape.params.shape);
});

type ModuleParams = z.infer<typeof module_Config_Schema>['params'];
type ChapterParams = z.infer<typeof chapter_Config_Schema>['params'];
type ModulePropsParams = z.infer<typeof module_Props_Schema>['params'];
type ChapterPropsParams = z.infer<typeof chapter_Props_Schema>['params'];
const legacyModule = {
  // @ts-expect-error Unit outcomes belong in Stage 2/3 production methodology.
  outcomes: { skills: [] },
} satisfies ModuleParams;
const legacyChapter = {
  // @ts-expect-error Unit prerequisites do not belong in Chapter Config.
  prerequisites: { skills: [] },
} satisfies ChapterParams;
const publishedModule = {
  // @ts-expect-error Module runtime Props must not publish Skill targets.
  outcomes: { skills: [] },
} satisfies ModulePropsParams;
const publishedChapter = {
  // @ts-expect-error Chapter runtime Props must not publish Skill targets.
  prerequisites: { skills: [] },
} satisfies ChapterPropsParams;
void legacyModule;
void legacyChapter;
void publishedModule;
void publishedChapter;
