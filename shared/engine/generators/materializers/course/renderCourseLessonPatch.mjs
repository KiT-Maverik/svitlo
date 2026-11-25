import { createSourceIdentifierRegistry } from '../sourceIdentifiers.mjs';

/**
 * Materialize placement-local Config override fragments as owned TypeScript.
 * No Configurator is recreated here. Existing Section/ContentBlock changes
 * become reviewed fragments; trusted added Section references stay imports.
 * The canonical standalone Lesson and its sources remain untouched.
 */
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const slug = /^[A-Za-z][A-Za-z0-9]*$/;
const reserved = new Set(['__proto__', 'prototype', 'constructor']);
const keyPath = path => JSON.stringify(path);
const lessonImportPattern = /^#lessonsData\/[0-9a-f]\/[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}\/index$/i;
const lessonTypes = sourceLesson => [
  'import type { ' + sourceLesson.exportName + ' } from ' + JSON.stringify(sourceLesson.importPath) + ';',
  'type LessonPatch = Parameters<typeof ' + sourceLesson.exportName + '.build.overrides>[0];',
];
const sectionType = key =>
  'type SectionPatch = Exclude<NonNullable<NonNullable<LessonPatch["section"]>["items"]>[' +
  JSON.stringify(key) +
  '], undefined | false>;';
const blockType = key =>
  'type BlockPatch = Exclude<NonNullable<NonNullable<SectionPatch["content"]>["items"]>[' +
  JSON.stringify(key) +
  '], undefined | false>';
const clean = (value, where) => {
  if (!slug.test(value) || reserved.has(value)) throw Error(where + ': invalid Course-owned override path');
};
function literal(value, path = [], references = new Map()) {
  const reference = references.get(keyPath(path));
  if (reference !== undefined) return reference;
  if (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'boolean' ||
    (typeof value === 'number' && Number.isFinite(value))
  )
    return JSON.stringify(value);
  if (Array.isArray(value)) {
    const body = '[' + value.map((v, i) => literal(v, [...path, String(i)], references)).join(', ') + ']';
    // Extracting a nested override from a contextual Build call would widen
    // its order tuple to string[]. Preserve the exact valid keys across files
    // with a mutable tuple (readonly "as const" is not assignable to Build).
    if (path.at(-1) === 'order' && value.every(v => typeof v === 'string'))
      return body + ' as [' + value.map(v => JSON.stringify(v)).join(', ') + ']';
    return body;
  }
  if (!record(value) || Object.keys(value).some(k => reserved.has(k)))
    throw Error('Unsafe Course Lesson override fragment');
  return (
    '{' +
    Object.entries(value)
      .map(([key, child]) => {
        const childPath = [...path, key];
        // An identifier already bound through a trusted generated import
        // can use real TypeScript object shorthand. Never rewrite authored
        // literal string values just because they happen to match a key.
        if (references.get(keyPath(childPath)) === key && slug.test(key) && !reserved.has(key)) return key;
        return JSON.stringify(key) + ': ' + literal(child, childPath, references);
      })
      .join(', ') +
    '}'
  );
}

/**
 * Decompose the trusted, validated Lesson patch without copying source
 * Configurators or creating a second authoring format.
 *
 * @param {{directory:string, rawPatch:Record<string,unknown>, binding:
 *   {imports:string[], aliases:Record<string,string>}, sourceLesson:{importPath:string,exportName:string}}} args
 */
export function renderCourseLessonPatch({ directory, rawPatch, binding, sourceLesson }) {
  if (typeof directory !== 'string' || !directory) throw Error('Unsafe or missing Course Lesson placement source');
  for (const part of directory.split('/')) clean(part, 'placement');
  if (!record(rawPatch) || !record(binding) || !Array.isArray(binding.imports))
    throw Error('Unsafe or missing Course Lesson placement source');
  if (
    !record(sourceLesson) ||
    !lessonImportPattern.test(sourceLesson.importPath ?? '') ||
    typeof sourceLesson.exportName !== 'string'
  )
    throw Error('Verified standalone Lesson import required to typecheck Course-owned fragments');
  createSourceIdentifierRegistry('Course Lesson source', ['LessonPatch'])(sourceLesson.exportName, 'verified Lesson');
  const imports = [];
  const files = [];
  const sceneScaffolds = [];
  const rootRefs = new Map();
  const section = rawPatch.section;
  if (record(section) && record(section.items)) {
    for (const [sectionKey, sectionPatch] of Object.entries(section.items)) {
      clean(sectionKey, 'section.items');
      if (!record(sectionPatch)) continue; // disabled entries stay false in parent
      const childRefs = new Map();
      const childImports = [];
      const childNames = createSourceIdentifierRegistry('Course Lesson section ' + sectionKey, [
        sourceLesson.exportName,
        'LessonPatch',
        'SectionPatch',
        sectionKey,
      ]);
      const content = sectionPatch.content;
      if (record(content) && record(content.items)) {
        for (const [blockKey, blockPatch] of Object.entries(content.items)) {
          clean(blockKey, 'section.content.items');
          if (!record(blockPatch)) continue;
          const path = directory + '/sections/' + sectionKey + '/' + blockKey + '/index.ts';
          createSourceIdentifierRegistry('Course Lesson block ' + blockKey, [
            sourceLesson.exportName,
            'LessonPatch',
            'SectionPatch',
            'BlockPatch',
          ])(blockKey, path);
          childNames(blockKey, path);
          files.push({
            path,
            kind: 'typescript',
            content: [
              ...lessonTypes(sourceLesson),
              sectionType(sectionKey),
              blockType(blockKey) + ';',
              '',
              'export const ' + blockKey + ' = ' + literal(blockPatch) + ' satisfies BlockPatch;',
              '',
            ].join('\n'),
          });
          childImports.push('import { ' + blockKey + ' } from "./' + blockKey + '";');
          childRefs.set(keyPath(['content', 'items', blockKey]), blockKey);
        }
      }
      files.push({
        path: directory + '/sections/' + sectionKey + '/index.ts',
        kind: 'typescript',
        content: [
          ...lessonTypes(sourceLesson),
          ...childImports,
          sectionType(sectionKey),
          '',
          'export const ' + sectionKey + ' = ' + literal(sectionPatch, [], childRefs) + ' satisfies SectionPatch;',
          '',
        ].join('\n'),
      });
      imports.push('import { ' + sectionKey + ' } from "./sections/' + sectionKey + '";');
      rootRefs.set(keyPath(['section', 'items', sectionKey]), sectionKey);
    }
  }
  if (record(section) && record(section.additionalItems)) {
    const aliases = binding.aliases ?? {};
    for (const [sectionKey] of Object.entries(section.additionalItems)) {
      clean(sectionKey, 'section.additionalItems');
      const exportName = aliases[sectionKey];
      if (typeof exportName !== 'string' || !/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(exportName))
        throw Error('Missing trusted added Section binding: ' + sectionKey);
      const created = binding.createdSections?.[sectionKey];
      if (created) {
        if (!Array.isArray(created.files) || typeof created.exportName !== 'string')
          throw Error('Invalid generated Course-owned Section: ' + sectionKey);
        files.push(...created.files);
        if (created.sceneScaffolds !== undefined) {
          if (!Array.isArray(created.sceneScaffolds))
            throw Error('Invalid Scene scaffold list for Section: ' + sectionKey);
          sceneScaffolds.push(...created.sceneScaffolds);
        }
        imports.push('import { ' + created.exportName + ' } from "./sections/' + sectionKey + '";');
        rootRefs.set(keyPath(['section', 'additionalItems', sectionKey]), created.exportName);
        continue;
      }
      const dependency = binding.imports.find(line => line.includes('import { ' + exportName + ' } from '));
      if (!dependency) throw Error('Missing trusted Section import: ' + sectionKey);
      files.push({
        path: directory + '/sections/' + sectionKey + '/index.ts',
        kind: 'typescript',
        content:
          dependency +
          '\n' +
          (sectionKey === exportName
            ? 'export { ' + exportName + ' };\n'
            : 'export const ' + sectionKey + ' = ' + exportName + ';\n'),
      });
      imports.push('import { ' + sectionKey + ' } from "./sections/' + sectionKey + '";');
      rootRefs.set(keyPath(['section', 'additionalItems', sectionKey]), sectionKey);
    }
  }
  return {
    files,
    sceneScaffolds,
    imports,
    patchSource: literal(rawPatch, [], rootRefs),
  };
}
