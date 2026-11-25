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
const clean = (value, where) => {
  if (!slug.test(value) || reserved.has(value)) throw Error(where + ': invalid Course-owned override path');
};
function literal(value, path = [], references = new Map()) {
  const reference = references.get(keyPath(path));
  if (reference !== undefined) return reference;
  if (value === null || typeof value === 'string' || typeof value === 'boolean' ||
      (typeof value === 'number' && Number.isFinite(value))) return JSON.stringify(value);
  if (Array.isArray(value)) return '[' + value.map((v, i) => literal(v, [...path, String(i)], references)).join(', ') + ']';
  if (!record(value) || Object.keys(value).some(k => reserved.has(k)))
    throw Error('Unsafe Course Lesson override fragment');
  return '{' + Object.entries(value).map(([key, child]) =>
    JSON.stringify(key) + ': ' + literal(child, [...path, key], references)).join(', ') + '}';
}

/**
 * Decompose the trusted, validated Lesson patch without copying source
 * Configurators or creating a second authoring format.
 *
 * @param {{directory:string, rawPatch:Record<string,unknown>, binding:
 *   {imports:string[], aliases:Record<string,string>}}} args
 */
export function renderCourseLessonPatch({ directory, rawPatch, binding }) {
  if (!directory || directory.split('/').some(part => !slug.test(part) || reserved.has(part)) ||
      !record(rawPatch) || !record(binding) || !Array.isArray(binding.imports))
    throw Error('Unsafe or missing Course Lesson placement source');
  const imports = [];
  const files = [];
  const rootRefs = new Map();
  const section = rawPatch.section;
  if (record(section) && record(section.items)) {
    for (const [sectionKey, sectionPatch] of Object.entries(section.items)) {
      clean(sectionKey, 'section.items');
      if (!record(sectionPatch)) continue; // disabled entries stay false in parent
      const childRefs = new Map();
      const childImports = [];
      const content = sectionPatch.content;
      if (record(content) && record(content.items)) {
        for (const [blockKey, blockPatch] of Object.entries(content.items)) {
          clean(blockKey, 'section.content.items');
          if (!record(blockPatch)) continue;
          const path = directory + '/sections/' + sectionKey + '/content/' + blockKey + '/index.ts';
          files.push({
            path,
            kind: 'typescript',
            content: 'export const contentBlockOverride = ' + literal(blockPatch) + ';\n',
          });
          childImports.push('import { contentBlockOverride as block_' + blockKey +
            ' } from "./content/' + blockKey + '";');
          childRefs.set(keyPath(['content', 'items', blockKey]), 'block_' + blockKey);
        }
      }
      files.push({
        path: directory + '/sections/' + sectionKey + '/index.ts',
        kind: 'typescript',
        content: [...childImports, '', 'export const sectionOverride = ' +
          literal(sectionPatch, [], childRefs) + ';', ''].join('\n'),
      });
      imports.push('import { sectionOverride as section_' + sectionKey +
        ' } from "./sections/' + sectionKey + '";');
      rootRefs.set(keyPath(['section', 'items', sectionKey]), 'section_' + sectionKey);
    }
  }
  if (record(section) && record(section.additionalItems)) {
    const aliases = binding.aliases ?? {};
    for (const [sectionKey] of Object.entries(section.additionalItems)) {
      clean(sectionKey, 'section.additionalItems');
      const alias = aliases[sectionKey];
      if (typeof alias !== 'string' || !slug.test(alias))
        throw Error('Missing trusted added Section binding: ' + sectionKey);
      const dependency = binding.imports.find(line => line.includes(' as ' + alias + ' } from '));
      if (!dependency) throw Error('Missing trusted Section import: ' + sectionKey);
      files.push({
        path: directory + '/sections/' + sectionKey + '/index.ts',
        kind: 'typescript',
        content: dependency + '\nexport const sectionAddition = ' + alias + ';\n',
      });
      imports.push('import { sectionAddition as ' + alias +
        ' } from "./sections/' + sectionKey + '";');
      rootRefs.set(keyPath(['section', 'additionalItems', sectionKey]), alias);
    }
  }
  return {
    files,
    imports,
    patchSource: literal(rawPatch, [], rootRefs),
  };
}
