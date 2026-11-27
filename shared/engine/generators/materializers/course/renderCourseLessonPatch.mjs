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
];
// Specialize each real existing Section's generic Build with NO added blocks.
// Extracting Parameters from an unspecialized generic overrides method widens
// Added to its constraint and can make valid existing child patches `never`.
const sectionType = (sourceLesson, key) =>
  'type SectionPatch = Parameters<typeof ' + sourceLesson.exportName + '.' + key + '.build.overrides<{}>>[0];';
const blockType = (sourceLesson, sectionKey, blockKey) =>
  'type BlockPatch = Parameters<typeof ' + sourceLesson.exportName + '.' + sectionKey + '.' + blockKey +
  '.build.overrides>[0];';
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
    if (path.at(-1) === 'children' && value.every(v => typeof v === 'string'))
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
  // Lesson patch children are root-level Section keys. New Sections arrive
  // only from the pinned trusted binder, never executable editorial imports.
  const metadata = new Set(['params', 'locale', 'events', 'children']);
  const sectionEntries = Object.entries(rawPatch).filter(([key]) => !metadata.has(key));
  for (const [sectionKey, sectionPatch] of sectionEntries) {
    clean(sectionKey, 'Lesson Section override');
    if (sectionPatch === false) continue;
    const exportName = binding.aliases?.[sectionKey];
    if (exportName !== undefined) {
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
        rootRefs.set(keyPath([sectionKey]), created.exportName);
        continue;
      }
      const dependency = binding.imports.find(line => line.includes('import { ' + exportName + ' } from '));
      if (!dependency) throw Error('Missing trusted Section import: ' + sectionKey);
      files.push({
        path: directory + '/sections/' + sectionKey + '/index.ts',
        kind: 'typescript',
        content:
          dependency + '\n' +
          (sectionKey === exportName
            ? 'export { ' + exportName + ' };\n'
            : 'export const ' + sectionKey + ' = ' + exportName + ';\n'),
      });
      imports.push('import { ' + sectionKey + ' } from "./sections/' + sectionKey + '";');
      rootRefs.set(keyPath([sectionKey]), sectionKey);
      continue;
    }
    if (!record(sectionPatch)) throw Error('Invalid Lesson Section override at ' + sectionKey);
    const childRefs = new Map();
    const childImports = [];
    const childNames = createSourceIdentifierRegistry('Course Lesson section ' + sectionKey, [
      sourceLesson.exportName, 'SectionPatch', sectionKey,
    ]);
    const ownSection = new Set(['params', 'locale', 'children']);
    for (const [blockKey, blockPatch] of Object.entries(sectionPatch).filter(([key]) => !ownSection.has(key))) {
      clean(blockKey, 'Section ContentBlock override');
      if (!record(blockPatch)) continue;
      const path = directory + '/sections/' + sectionKey + '/' + blockKey + '/index.ts';
      createSourceIdentifierRegistry('Course Lesson block ' + blockKey, [
        sourceLesson.exportName, 'SectionPatch', 'BlockPatch',
      ])(blockKey, path);
      childNames(blockKey, path);
      files.push({
        path, kind: 'typescript',
        content: [
          ...lessonTypes(sourceLesson),
          blockType(sourceLesson, sectionKey, blockKey),
          '',
          'export const ' + blockKey + ' = ' + literal(blockPatch) + ' satisfies BlockPatch;',
          '',
        ].join('\n'),
      });
      childImports.push('import { ' + blockKey + ' } from "./' + blockKey + '";');
      childRefs.set(keyPath([blockKey]), blockKey);
    }
    files.push({
      path: directory + '/sections/' + sectionKey + '/index.ts',
      kind: 'typescript',
      content: [
        ...lessonTypes(sourceLesson), ...childImports, sectionType(sourceLesson, sectionKey),
        '',
        'export const ' + sectionKey + ' = ' + literal(sectionPatch, [], childRefs) + ' satisfies SectionPatch;',
        '',
      ].join('\n'),
    });
    imports.push('import { ' + sectionKey + ' } from "./sections/' + sectionKey + '";');
    rootRefs.set(keyPath([sectionKey]), sectionKey);
  }
  return {
    files,
    sceneScaffolds,
    imports,
    patchSource: literal(rawPatch, [], rootRefs),
  };
}
