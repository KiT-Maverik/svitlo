const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;
const sha = /^[a-f0-9]{40}$/i;
const slug = /^[A-Za-z][A-Za-z0-9]*$/;
const own = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const forbidden = new Set(['__proto__', 'prototype', 'constructor']);
const sectionRefKeys = new Set(['$ref', 'lessonId', 'sectionId', 'sourceSha', 'exportName']);

/**
 * The only declarative-to-Configurator binding needed by Course overrides.
 * All non-additionalItems bytes stay the authored sparse patch. A trusted
 * resolver authorizes each specific Section before the real Lesson Build API
 * validates the complete effective candidate; a source SHA alone is not trust.
 *
 * Never evaluate a candidate import or accept code from the authored draft.
 */
export function bindCourseLessonPatch(raw, { resolveAddedSection, renderAddedSection, placementPath }) {
  if (!record(raw) || !Object.keys(raw).length) throw Error('Lesson sourcePatch must be a nonempty object');
  const aliases = new Map();
  const imports = [];
  const createdSections = {};
  const additions = raw.section?.additionalItems;
  let patch = raw;
  if (additions !== undefined) {
    if (
      !record(additions) ||
      (Object.getPrototypeOf(additions) !== Object.prototype && Object.getPrototypeOf(additions) !== null)
    )
      throw Error(placementPath + ': section.additionalItems must be a plain reference map');
    const bound = {};
    for (const [key, reference] of Object.entries(additions)) {
      // A Course-owned Section is inert editorial source, not an imported
      // candidate executable. Only the trusted concrete Section dispatcher
      // may turn it into a Configurator source module beneath this placement.
      if (record(reference) && reference.$create === 'course-section') {
        if (
          !slug.test(key) ||
          forbidden.has(key) ||
          Object.keys(reference).sort().join(',') !== '$create,source' ||
          !record(reference.source?.config) ||
          reference.source.config.slug !== key ||
          !uuid.test(reference.source.config.id ?? '') ||
          typeof renderAddedSection !== 'function'
        )
          throw Error(placementPath + ': invalid or untrusted Course-owned Section at ' + key);
        const directory = placementPath + '/sections/' + key;
        const rendered = renderAddedSection(reference.source, { directory, slug: key });
        if (
          !record(rendered) ||
          typeof rendered.exportName !== 'string' ||
          !/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(rendered.exportName) ||
          !Array.isArray(rendered.files) ||
          !rendered.files.length ||
          !rendered.files.some(file => file.path === directory + '/index.ts' && file.kind === 'typescript') ||
          rendered.files.some(
            file =>
              !record(file) ||
              typeof file.path !== 'string' ||
              !file.path.startsWith(directory + '/') ||
              !['typescript', 'markdown', 'specification', 'code'].includes(file.kind) ||
              typeof file.content !== 'string',
          )
        )
          throw Error(placementPath + ': invalid trusted Section materializer result at ' + key);
        aliases.set(key, rendered.exportName);
        createdSections[key] = rendered;
        Object.defineProperty(bound, key, { value: null, enumerable: true, writable: true, configurable: true });
        continue;
      }
      if (
        !slug.test(key) ||
        forbidden.has(key) ||
        !record(reference) ||
        Object.keys(reference).length !== sectionRefKeys.size ||
        Object.keys(reference).some(field => !sectionRefKeys.has(field)) ||
        reference.$ref !== 'lesson-section' ||
        !uuid.test(reference.lessonId ?? '') ||
        !uuid.test(reference.sectionId ?? '') ||
        !sha.test(reference.sourceSha ?? '') ||
        !slug.test(reference.exportName ?? '') ||
        forbidden.has(reference.exportName)
      ) {
        throw Error(placementPath + ': invalid declarative Section reference at ' + key);
      }
      const importPath = '#lessonsData/' + reference.lessonId.at(-1) + '/' + reference.lessonId + '/sections/' + key;
      const request = {
        id: reference.sectionId,
        ownerLessonId: reference.lessonId,
        sourceSha: reference.sourceSha,
        slug: key,
        importPath,
        exportName: reference.exportName,
        placementPath,
      };
      if (typeof resolveAddedSection !== 'function')
        throw Error(placementPath + ': trusted additional Section resolver required');
      const approved = resolveAddedSection(request);
      if (
        !record(approved) ||
        approved.approved !== true ||
        approved.id !== request.id ||
        approved.ownerLessonId !== request.ownerLessonId ||
        approved.sourceSha !== request.sourceSha ||
        approved.slug !== request.slug ||
        approved.importPath !== request.importPath ||
        approved.exportName !== request.exportName
      ) {
        throw Error(placementPath + ': unapproved, stale or mismatched additional Section');
      }
      const section = approved.configurator;
      if (
        !record(section) ||
        section.id !== request.id ||
        section.slug !== key ||
        !record(section.config?.base) ||
        section.config.base.id !== section.id ||
        section.config.base.slug !== key ||
        section.config.base.type !== section.type ||
        typeof section.build?.props !== 'function' ||
        typeof section.build?.overrides !== 'function'
      ) {
        throw Error(placementPath + ': resolved additional Section has invalid Configurator identity');
      }
      aliases.set(key, request.exportName);
      imports.push('import { ' + request.exportName + ' } from ' + JSON.stringify(importPath) + ';');
      Object.defineProperty(bound, key, { value: section, enumerable: true, writable: true, configurable: true });
    }
    patch = { ...raw, section: { ...raw.section, additionalItems: bound } };
  }
  // Avoid string substitution: an author may legitimately write the same
  // marker as text. Only exact Section reference positions become identifiers.
  const render = (value, path = []) => {
    if (path.length === 3 && path[0] === 'section' && path[1] === 'additionalItems' && aliases.has(path[2]))
      return aliases.get(path[2]);
    if (
      value === null ||
      typeof value === 'string' ||
      typeof value === 'boolean' ||
      (typeof value === 'number' && Number.isFinite(value))
    )
      return JSON.stringify(value);
    if (Array.isArray(value))
      return '[' + value.map((entry, i) => render(entry, [...path, String(i)])).join(', ') + ']';
    if (!record(value) || Object.keys(value).some(key => forbidden.has(key)))
      throw Error(placementPath + ': unsafe Course Lesson patch serialization');
    return (
      '{' +
      Object.entries(value)
        .map(([key, child]) => JSON.stringify(key) + ': ' + render(child, [...path, key]))
        .join(', ') +
      '}'
    );
  };
  return { patch, patchSource: render(raw), imports, aliases: Object.fromEntries(aliases), createdSections };
}
