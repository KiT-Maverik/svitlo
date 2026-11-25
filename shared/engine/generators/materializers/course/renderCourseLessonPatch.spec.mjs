import assert from 'node:assert/strict';
import test from 'node:test';

import { renderCourseLessonPatch } from './renderCourseLessonPatch.mjs';

const directory = 'exhibitionPractice/shadowPractice';

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
  const first = renderCourseLessonPatch({ directory, rawPatch, binding: { imports: [], aliases: {} } });
  const second = renderCourseLessonPatch({ directory, rawPatch, binding: { imports: [], aliases: {} } });
  assert.deepEqual(first, second, 'rendering must be deterministic');
  assert.equal(JSON.stringify(rawPatch), before, 'authored patch must remain immutable');
  assert.deepEqual(first.files.map(file => file.path), [
    directory + '/sections/content/content/p1/index.ts',
    directory + '/sections/content/index.ts',
  ]);
  assert.match(first.files[0].content, /section_content is literal user text/);
  assert.match(first.files[1].content, /import \{ contentBlockOverride as block_p1 \} from "\.\/content\/p1"/);
  assert.match(first.files[1].content, /"p1": block_p1/);
  assert.match(first.files[1].content, /"p2": false/);
  assert.match(first.patchSource, /"content": section_content/);
  assert.match(first.patchSource, /"practice": false/);
  assert.doesNotMatch(first.patchSource, /section_content is literal user text/);
  assert.deepEqual(first.imports, [
    'import { sectionOverride as section_content } from "./sections/content";',
  ]);
});

test('additional trusted Sections are referenced through the Course-owned Section tree', () => {
  const alias = 'added_section_exhibitionPractice_shadowPractice_extra';
  const rawPatch = {
    section: {
      additionalItems: { extra: { $ref: 'lesson-section' } },
      order: ['content', 'extra'],
    },
  };
  const binding = {
    aliases: { extra: alias },
    imports: ['import { extra as ' + alias + ' } from "#lessonsData/1/example/sections/extra";'],
  };
  const result = renderCourseLessonPatch({ directory, rawPatch, binding });
  assert.deepEqual(result.files.map(file => file.path), [directory + '/sections/extra/index.ts']);
  assert.match(result.files[0].content, /export const sectionAddition = added_section_/);
  assert.match(result.patchSource, new RegExp('"extra": ' + alias));
  assert.doesNotMatch(result.patchSource, /"\$ref"/);
  assert.deepEqual(result.imports, [
    'import { sectionAddition as ' + alias + ' } from "./sections/extra";',
  ]);
});

test('metadata-only patches stay in their placement index without fake children', () => {
  const result = renderCourseLessonPatch({
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
    directory: '../escape',
    rawPatch: {},
    binding: { imports: [] },
  }), /invalid Course-owned override path/);
  assert.throws(() => renderCourseLessonPatch({
    directory,
    rawPatch: { section: { items: JSON.parse('{"__proto__":{}}') } },
    binding: { imports: [] },
  }), /invalid Course-owned override path/);
  assert.throws(() => renderCourseLessonPatch({
    directory,
    rawPatch: { section: { additionalItems: { extra: { $ref: 'lesson-section' } } } },
    binding: { imports: [], aliases: { extra: 'forgedReference' } },
  }), /Missing trusted Section import/);
});
