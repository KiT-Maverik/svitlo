import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

import { renderCourseLessonPatch } from './renderCourseLessonPatch.mjs';

const ts = createRequire(import.meta.url)('typescript');
const directory = 'exhibitionPractice/shadowPractice';
const sourceLesson = {
  importPath: '#lessonsData/1/11111111-1111-4111-8111-111111111111/index',
  exportName: 'standaloneLesson',
};

test('Course-owned Lesson override emits distinct Section and ContentBlock fragment modules', () => {
  const rawPatch = {
    params: { sections: { allowSkipping: false } },
    children: ['intro'],
    intro: {
      params: { skippable: true },
      children: ['paragraph'],
      paragraph: { locale: { value: { uk: 'section_content is literal user text' } } },
    },
  };
  const before = JSON.stringify(rawPatch);
  const first = renderCourseLessonPatch({ sourceLesson, directory, rawPatch, binding: { imports: [], aliases: {} } });
  const second = renderCourseLessonPatch({ sourceLesson, directory, rawPatch, binding: { imports: [], aliases: {} } });
  assert.deepEqual(first, second, 'rendering must be deterministic');
  assert.equal(JSON.stringify(rawPatch), before, 'authored patch must remain immutable');
  assert.deepEqual(
    first.files.map(file => file.path),
    [directory + '/sections/intro/paragraph/index.ts', directory + '/sections/intro/index.ts'],
  );
  assert.match(first.files[0].content, /section_content is literal user text/);
  assert.match(first.files[0].content, /satisfies BlockPatch/);
  assert.match(first.files[0].content, /SectionPatch\["paragraph"\]/);
  assert.match(first.files[1].content, /satisfies SectionPatch/);
  assert.match(first.files[1].content, /typeof standaloneLesson\.build\.overrides/);
  assert.match(first.files[1].content, /import \{ paragraph \} from "\.\/paragraph"/);
  assert.match(first.files[1].content, /"paragraph": paragraph/);
  assert.match(first.patchSource, /"intro": intro/);
  assert.doesNotMatch(first.patchSource, /section_content is literal user text/);
  assert.deepEqual(first.imports, ['import { intro } from "./sections/intro";']);
});

test('additional trusted Sections are referenced through the Course-owned Section tree', () => {
  const exportName = 'extra';
  const rawPatch = {
    extra: { $ref: 'lesson-section' },
    children: ['intro', 'extra'],
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
  assert.match(result.patchSource, /"extra": extra/);
  assert.doesNotMatch(result.patchSource, /"\$ref"/);
  assert.deepEqual(result.imports, ['import { extra } from "./sections/extra";']);
});

test('metadata-only patches stay in their placement index without fake children', () => {
  const result = renderCourseLessonPatch({
    sourceLesson,
    directory: 'shadowPractice',
    rawPatch: { params: { sections: { allowNavigation: false } } },
    binding: { imports: [], aliases: {} },
  });
  assert.deepEqual(result.files, []);
  assert.deepEqual(result.imports, []);
  assert.match(result.patchSource, /"allowNavigation": false/);
});

test('unsafe placement paths and unverified references fail closed', () => {
  assert.throws(
    () =>
      renderCourseLessonPatch({
        sourceLesson: { ...sourceLesson, importPath: '../other-lesson' },
        directory,
        rawPatch: {},
        binding: { imports: [] },
      }),
    /Verified standalone Lesson import/,
  );
  assert.throws(
    () => renderCourseLessonPatch({ sourceLesson, directory: '../escape', rawPatch: {}, binding: { imports: [] } }),
    /invalid Course-owned override path/,
  );
  assert.throws(
    () =>
      renderCourseLessonPatch({
        sourceLesson,
        directory,
        rawPatch: JSON.parse('{"__proto__":{"locale":{}}}'),
        binding: { imports: [] },
      }),
    /invalid Course-owned override path/,
  );
  assert.throws(
    () =>
      renderCourseLessonPatch({
        sourceLesson,
        directory,
        rawPatch: { extra: { $ref: 'lesson-section' } },
        binding: { imports: [], aliases: { extra: 'forgedReference' } },
      }),
    /Missing trusted Section import/,
  );
});

/**
 * Compile source files as ordinary TypeScript modules. The imported Lesson is
 * the REAL typed build configurator from courseLessonPatch.typecheck.ts, not a
 * replica or a synthetic widened patch schema. Include the parent composition
 * so each generated child and the complete sparse patch must both typecheck.
 */
function compileFragments(rawPatch) {
  const directory = 'typedPlacement';
  const sourceLesson = {
    importPath: '#lessonsData/3/663572e7-bd85-4516-86e2-3de07d209e03/index',
    exportName: 'lesson',
  };
  const built = renderCourseLessonPatch({
    directory,
    rawPatch,
    sourceLesson,
    binding: { imports: [], aliases: {} },
  });
  const files = [
    ...built.files,
    {
      path: directory + '/index.ts',
      kind: 'typescript',
      content: [
        'import type { lesson } from ' + JSON.stringify(sourceLesson.importPath) + ';',
        ...built.imports,
        'export const placement = ' + built.patchSource + ' satisfies Parameters<typeof lesson.build.overrides>[0];',
        '',
      ].join('\n'),
    },
  ];
  const sourceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
  const root = path.join(sourceRoot, 'temp', 'course-lesson-patch-typecheck');
  const tsconfig = ts.readConfigFile(path.join(sourceRoot, 'tsconfig.json'), ts.sys.readFile);
  if (tsconfig.error) throw Error(ts.flattenDiagnosticMessageText(tsconfig.error.messageText, '\n'));
  const parsed = ts.parseJsonConfigFileContent(tsconfig.config, ts.sys, sourceRoot);
  assert.deepEqual(parsed.errors, []);
  const options = {
    ...parsed.options,
    noEmit: true,
    incremental: false,
    composite: false,
    baseUrl: sourceRoot,
    paths: {
      ...parsed.options.paths,
      '#lessonsData/3/663572e7-bd85-4516-86e2-3de07d209e03/index': [
        'generators/materializers/course/courseLessonPatch.typecheck.ts',
      ],
    },
  };
  const virtual = new Map(files.map(file => [path.resolve(root, file.path), file.content]));
  const host = ts.createCompilerHost(options);
  const oldFile = host.getSourceFile.bind(host);
  const oldExists = host.fileExists.bind(host);
  const oldRead = host.readFile.bind(host);
  const oldDirectory = host.directoryExists?.bind(host);
  const normalized = file => path.resolve(file);
  host.fileExists = file => virtual.has(normalized(file)) || oldExists(file);
  host.readFile = file => virtual.get(normalized(file)) ?? oldRead(file);
  host.directoryExists = dir =>
    [...virtual.keys()].some(file => file.startsWith(normalized(dir) + path.sep)) || oldDirectory?.(dir) || false;
  host.getSourceFile = (file, language, onError, createNew) =>
    virtual.has(normalized(file))
      ? ts.createSourceFile(file, virtual.get(normalized(file)), language, true)
      : oldFile(file, language, onError, createNew);
  const program = ts.createProgram([...virtual.keys()], options, host);
  return ts.getPreEmitDiagnostics(program).map(diagnostic => ({
    path: diagnostic.file?.fileName ?? '<compiler>',
    code: diagnostic.code,
    message: ts.flattenDiagnosticMessageText(diagnostic.messageText, ' '),
  }));
}

const typed = patch => ({ intro: { paragraph: patch } });

test('generated Course-owned Section/ContentBlock fragments compile using their real Lesson Build types', () => {
  const errors = compileFragments(typed({ locale: { value: { uk: 'Інший текст' } } }));
  assert.deepEqual(errors, []);
});

test('generated fragments fail TypeScript on invalid field types and missing contract fields', () => {
  const errors = compileFragments({
    intro: {
      params: { fieldRemovedFromSection: true },
      paragraph: { locale: { value: { uk: 42 } } },
    },
  });
  const fragmentErrors = errors.filter(diagnostic => diagnostic.path.includes('typedPlacement/sections/'));
  assert.ok(fragmentErrors.length >= 2, JSON.stringify(errors, null, 2));
  assert.ok(
    fragmentErrors.some(diagnostic => diagnostic.message.includes('number')),
    JSON.stringify(errors, null, 2),
  );
  assert.ok(
    fragmentErrors.some(diagnostic => diagnostic.message.includes('fieldRemovedFromSection')),
    JSON.stringify(errors, null, 2),
  );
});

test('generated fragments fail TypeScript for renamed nested keys and invalid locales', () => {
  const errors = compileFragments({
    intro: {
      renamedParagraph: { locale: { value: { xx: 'Unsupported locale' } } },
    },
  });
  const fragmentErrors = errors.filter(diagnostic => diagnostic.path.includes('typedPlacement/sections/'));
  assert.ok(fragmentErrors.length > 0, JSON.stringify(errors, null, 2));
  assert.ok(
    fragmentErrors.some(diagnostic => /renamedParagraph/.test(diagnostic.message)),
    JSON.stringify(errors, null, 2),
  );
  // The locale is constrained through the original paragraph's Languages type.
  const invalidLocale = compileFragments(typed({ locale: { value: { xx: 'No locale' } } }));
  assert.ok(
    invalidLocale.some(
      diagnostic =>
        diagnostic.path.includes('typedPlacement/sections/intro/paragraph/') && diagnostic.message.includes('xx'),
    ),
    JSON.stringify(invalidLocale, null, 2),
  );
});
