import assert from 'node:assert/strict';
import test from 'node:test';

import { renderCourseLessonPatch } from './renderCourseLessonPatch.mjs';

const directory = 'exhibitionPractice/shadowPractice';
const sourceLesson = {
  importPath: '#lessonsData/1/11111111-1111-4111-8111-111111111111/index',
  exportName: 'standaloneLesson',
};

test('Course-owned Lesson override emits distinct Section and ContentBlock fragment modules', () => {
  const rawPatch = {
    params: { sections: { allowSkipping: false } },
    section: {
      items: {
        content: {
          params: { skippable: true },
          content: {
            items: {
              p1: { locale: { value: { uk: 'section_content is literal user text' } } },
              p2: false,
            },
            order: ['p1'],
          },
        },
        practice: false,
      },
      order: ['content'],
    },
  };
  const before = JSON.stringify(rawPatch);
  const first = renderCourseLessonPatch({ sourceLesson, directory, rawPatch, binding: { imports: [], aliases: {} } });
  const second = renderCourseLessonPatch({ sourceLesson, directory, rawPatch, binding: { imports: [], aliases: {} } });
  assert.deepEqual(first, second, 'rendering must be deterministic');
  assert.equal(JSON.stringify(rawPatch), before, 'authored patch must remain immutable');
  assert.deepEqual(
    first.files.map(file => file.path),
    [directory + '/sections/content/p1/index.ts', directory + '/sections/content/index.ts'],
  );
  assert.match(first.files[0].content, /section_content is literal user text/);
  assert.match(first.files[0].content, /satisfies BlockPatch/);
  assert.match(first.files[0].content, /NonNullable<SectionPatch\["content"\]>/);
  assert.match(first.files[1].content, /satisfies SectionPatch/);
  assert.match(first.files[1].content, /typeof standaloneLesson\.build\.overrides/);
  assert.match(first.files[1].content, /import \{ p1 \} from "\.\/p1"/);
  assert.match(first.files[1].content, /"p1": p1/);
  assert.match(first.files[1].content, /"p2": false/);
  assert.match(first.patchSource, /"content": content/);
  assert.match(first.patchSource, /"practice": false/);
  assert.doesNotMatch(first.patchSource, /section_content is literal user text/);
  assert.deepEqual(first.imports, ['import { content } from "./sections/content";']);
});

test('additional trusted Sections are referenced through the Course-owned Section tree', () => {
  const exportName = 'extra';
  const rawPatch = {
    section: {
      additionalItems: { extra: { $ref: 'lesson-section' } },
      order: ['content', 'extra'],
    },
  };
  const binding = {
    aliases: { extra: exportName },
    imports: ['import { extra } from "#lessonsData/1/example/sections/extra";'],
  };
  const result = renderCourseLessonPatch({ sourceLesson, directory, rawPatch, binding });
  assert.deepEqual(
    result.files.map(file => file.path),
    [directory + '/sections/extra/index.ts'],
  );
  assert.match(result.files[0].content, /export \{ extra \}/);
  assert.match(result.patchSource, new RegExp('"extra": ' + exportName));
  assert.doesNotMatch(result.patchSource, /"\$ref"/);
  assert.deepEqual(result.imports, ['import { extra } from "./sections/extra";']);
});

test('metadata-only patches stay in their placement index without fake children', () => {
  const result = renderCourseLessonPatch({ sourceLesson,
    directory: 'shadowPractice',
    rawPatch: { params: { sections: { allowNavigation: false } } },
    binding: { imports: [], aliases: {} },
  });
  assert.deepEqual(result.files, []);
  assert.deepEqual(result.imports, []);
  assert.match(result.patchSource, /"allowNavigation": false/);
});

test('unsafe placement paths and unverified references fail closed', () => {
  assert.throws(() => renderCourseLessonPatch({
    sourceLesson: { ...sourceLesson, importPath: '../other-lesson' }, directory, rawPatch: {},
    binding: { imports: [] },
  }), /Verified standalone Lesson import/);
  assert.throws(
    () =>
      renderCourseLessonPatch({ sourceLesson,
        directory: '../escape',
        rawPatch: {},
        binding: { imports: [] },
      }),
    /invalid Course-owned override path/,
  );
  assert.throws(
    () =>
      renderCourseLessonPatch({ sourceLesson,
        directory,
        rawPatch: { section: { items: JSON.parse('{"__proto__":{}}') } },
        binding: { imports: [] },
      }),
    /invalid Course-owned override path/,
  );
  assert.throws(
    () =>
      renderCourseLessonPatch({ sourceLesson,
        directory,
        rawPatch: { section: { additionalItems: { extra: { $ref: 'lesson-section' } } } },
        binding: { imports: [], aliases: { extra: 'forgedReference' } },
      }),
    /Missing trusted Section import/,
  );
});
