/**
 * Publish a compact Course resource from a defineCourse configurator.
 *
 * The root Course, Modules and Chapters retain complete resolved Props.
 * Lessons are *references* to independently published resources, with only
 * Course-specific sparse Lesson override Props embedded in the reference.
 *
 * Output: <textbook>/generated/courses/<course-id>/{base,<language>}.json
 * No authored configurators or full standalone Lesson resources are serialized.
 */
import fs from 'node:fs';
import path from 'node:path';
import { assembleCourseTree } from '@svitlo/engine/runtime';
import { assertSafeDirectoryPath } from '../safeGeneratedPath/assertSafeDirectoryPath.mjs';

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const own = (value, key) => Object.prototype.hasOwnProperty.call(value, key);
const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const clone = value => structuredClone(value);

/** Props arrays are atomic; object keys merge recursively in publication order. */
export function mergeCourseProps(base, patch) {
  if (patch === undefined) return clone(base);
  if (!isObject(base) || !isObject(patch)) return clone(patch);
  const result = clone(base);
  for (const [key, value] of Object.entries(patch)) {
    result[key] = mergeCourseProps(result[key], value);
  }
  return result;
}

/** Locales are sparse, except arrays must be supplied in full when changed. */
function difference(base, resolved) {
  if (JSON.stringify(base) === JSON.stringify(resolved)) return undefined;
  if (!isObject(base) || !isObject(resolved)) return clone(resolved);
  const output = {};
  for (const [key, value] of Object.entries(resolved)) {
    const change = difference(base[key], value);
    if (change !== undefined) output[key] = change;
  }
  return Object.keys(output).length ? output : undefined;
}

function assertJson(value, label, ancestors = new Set()) {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return;
  if (typeof value === 'number' && Number.isFinite(value)) return;
  if (typeof value !== 'object' || value === null) throw new Error('Non-JSON value in ' + label);
  if (ancestors.has(value)) throw new Error('Circular publication in ' + label);
  if (
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) !== Object.prototype &&
    Object.getPrototypeOf(value) !== null
  ) {
    throw new Error('Non-plain JSON object in ' + label);
  }
  ancestors.add(value);
  try {
    if (Array.isArray(value)) {
      for (let index = 0; index < value.length; index++) {
        if (!Object.hasOwn(value, index)) throw new Error('Sparse publication array in ' + label);
        assertJson(value[index], label + '[' + index + ']', ancestors);
      }
    } else {
      for (const [key, child] of Object.entries(value)) {
        if (['__proto__', 'prototype', 'constructor'].includes(key)) {
          throw new Error('Unsafe publication key in ' + label + '/' + key);
        }
        assertJson(child, label + '/' + key, ancestors);
      }
      if (Object.getOwnPropertySymbols(value).length) throw new Error('Symbol publication key in ' + label);
    }
  } finally {
    ancestors.delete(value);
  }
}

/** Walk the authored Course tree to associate placement-local Lesson patches with IDs. */
function findLessonPatches(course, languages, mode) {
  const visited = new Set();
  const lessons = new Map();

  function visit(entity, location) {
    if (!entity || typeof entity.id !== 'string' || !uuid.test(entity.id)) {
      throw new Error('Invalid Course entity identity at ' + location);
    }
    if (entity.draft === true) {
      if (mode !== 'draft' || !['lesson', 'episode', 'assessment'].includes(entity.type))
        throw new Error('Course draft stub cannot be published at ' + location);
      if (entity.slug !== location.split('/').at(-1))
        throw new Error('Mismatched Course stub placement at ' + location);
      return; // Draft-only full preview Props are not standalone Lesson references.
    }
    if (entity.type === 'lesson') {
      // A placed Lesson carries its own authored Config patch. The original
      // Lesson's Build API publishes sparse Props for this placement alone.
      const isPlacement = own(entity, 'placement');
      if (
        isPlacement &&
        (!isObject(entity.placement) ||
          entity.placement.source?.id !== entity.id ||
          entity.placement.source?.slug !== entity.slug ||
          entity.placement.source?.type !== 'lesson')
      ) {
        throw new Error('Mismatched immutable Lesson placement identity at ' + location);
      }
      const patch = isPlacement ? entity.build.overrides({}, { languages }) : undefined;
      if (patch?.id !== undefined && patch.id !== entity.id) {
        throw new Error('Mismatched sparse Lesson override identity at ' + location);
      }
      lessons.set(location, patch);
      return;
    }
    if (visited.has(entity.id)) {
      throw new Error('Duplicate Course entity ID ' + entity.id + ' at ' + location);
    }
    visited.add(entity.id);
    if (entity.type === 'episode') return;
    if (!['course', 'module', 'chapter'].includes(entity.type)) {
      throw new Error('Unsupported Course entity type at ' + location + ': ' + String(entity.type));
    }
    const collection = entity.content;
    if (!collection || !isObject(collection.items) || !Array.isArray(collection.order)) {
      throw new Error('Invalid Course collection at ' + location);
    }
    const items = collection.items;
    const order = collection.order;
    if (
      order.length !== Object.keys(items).length ||
      new Set(order).size !== order.length ||
      Object.keys(items).some(key => !order.includes(key))
    ) {
      throw new Error('Invalid Course child order at ' + location);
    }
    for (const key of order) {
      const child = items[key];
      if (!child || (child.slug !== key && child.type !== 'lesson')) {
        throw new Error('Invalid Course child ' + location + '/' + key);
      }
      visit(child, location + '/' + key);
    }
  }

  visit(course, course.slug);
  return lessons;
}

function compactEntity(value, lessonPatches, language, location, mode) {
  if (!isObject(value) || typeof value.id !== 'string') {
    throw new Error('Invalid resolved Course Props entity');
  }
  if (value.draft === true) {
    if (mode !== 'draft' || !['lesson', 'episode', 'assessment'].includes(value.type))
      throw new Error('Course draft stub cannot be published at ' + location);
    if (value.slug !== location.split('/').at(-1) || !uuid.test(value.id))
      throw new Error('Invalid Course draft stub identity at ' + location);
    // Draft explicitly retains the genuine Not implemented section and its
    // stable preview IDs. Never make an incomplete Lesson a resource reference.
    return clone(value);
  }
  if (value.type === 'lesson') {
    if (!lessonPatches.has(location)) throw new Error('Unregistered Course Lesson at ' + location + ': ' + value.id);
    const patch = lessonPatches.get(location);
    const base = patch?.base ?? {};
    const effective = language ? mergeCourseProps(base, patch?.locale?.[language]) : clone(base);
    assertJson(effective, 'Lesson override ' + value.id);
    return {
      type: 'lesson',
      id: value.id,
      ...(Object.keys(effective).length ? { overrides: effective } : {}),
    };
  }
  if (value.type === 'episode') {
    if (!Array.isArray(value.section) || !value.section.length || Object.keys(value.events ?? {}).length)
      throw new Error('Incomplete Episode or unsupported Episode events: ' + value.id);
    if (value.section.some(section => !['content', 'practice', 'codingTask', 'learningFlow'].includes(section.type)))
      throw new Error('Unsupported Episode Section: ' + value.id);
    return clone(value);
  }
  if (!['course', 'module', 'chapter'].includes(value.type) || !Array.isArray(value.content)) {
    throw new Error('Invalid Course/Module/Chapter Props for ' + value.id);
  }
  const items = {};
  const order = [];
  for (const child of value.content) {
    if (!isObject(child) || typeof child.slug !== 'string' || !/^[a-z][a-zA-Z0-9]*$/.test(child.slug)) {
      throw new Error('Course child must have a valid slug in ' + value.id);
    }
    if (own(items, child.slug)) throw new Error('Duplicate Course child slug: ' + child.slug);
    items[child.slug] = compactEntity(child, lessonPatches, language, location + '/' + child.slug, mode);
    order.push(child.slug);
  }
  return {
    ...clone(Object.fromEntries(Object.entries(value).filter(([key]) => key !== 'content'))),
    content: { items, order },
  };
}

/** Confirm a language cannot change course membership in a sparse localization file. */
function assertSameCourseStructure(base, localized, location = 'course') {
  if (!isObject(base) || !isObject(localized) || base.id !== localized.id || base.type !== localized.type) {
    throw new Error('Localized Course identity mismatch at ' + location);
  }
  if (base.draft !== localized.draft) throw new Error('Localized Course draft status mismatch at ' + location);
  if (base.type === 'episode' || (base.draft === true && base.type !== 'lesson')) {
    const identity = section => [section.id, section.type, section.slug];
    if (JSON.stringify(base.section.map(identity)) !== JSON.stringify(localized.section.map(identity)))
      throw new Error('Localized Episode Section identity mismatch at ' + location);
  }
  if (base.draft === true && base.type === 'lesson') {
    if (base.slug !== localized.slug || JSON.stringify(base.section) !== JSON.stringify(localized.section))
      throw new Error('Localized Course Lesson preview identity mismatch at ' + location);
  }
  if (!base.content && !localized.content) return;
  if (!isObject(base.content) || !isObject(localized.content)) {
    throw new Error('Localized Course content mismatch at ' + location);
  }
  const original = base.content;
  const translated = localized.content;
  if (JSON.stringify(original.order) !== JSON.stringify(translated.order)) {
    throw new Error('Localized Course order mismatch at ' + location);
  }
  if (Object.keys(original.items).length !== Object.keys(translated.items).length) {
    throw new Error('Localized Course child count mismatch at ' + location);
  }
  for (const slug of original.order) {
    if (!own(translated.items, slug)) throw new Error('Localized Course missing child at ' + location + '/' + slug);
    assertSameCourseStructure(original.items[slug], translated.items[slug], location + '/' + slug);
  }
}

/**
 * Produce base and sparse per-language Course files from inline placements.
 *
 * Course-level authored override exports are deliberately unsupported: each
 * reusable Lesson adaptation must be declared at its immediate placement.
 */
export function renderCourseFiles(
  course,
  { languages = course?.config?.base?.params?.languages, projectMedia, mode = 'production', ...unknownOptions } = {},
) {
  if (Object.keys(unknownOptions).length) {
    throw new Error(
      'Unsupported Course publication options: ' +
        Object.keys(unknownOptions).join(', ') +
        '; attach Lesson patches with placeLesson at their placement',
    );
  }
  if (course?.type !== 'course' || !uuid.test(course.id) || !course?.build?.props) {
    throw new Error('Expected a defineCourse configurator with a valid Course ID');
  }
  if (
    !Array.isArray(languages) ||
    languages.length === 0 ||
    new Set(languages).size !== languages.length ||
    languages.some(language => !/^[a-z]{2,8}$/.test(language))
  ) {
    throw new Error('Expected distinct, nonempty Course publication languages');
  }
  if (!['production', 'draft'].includes(mode)) throw new Error('Invalid Course publication mode');
  const scope = { languages };
  // Course Configurator Build owns authoring, nested overrides and Props validation.
  const resource = course.build.props(scope);
  const lessonPatches = findLessonPatches(course, languages, mode);
  assertJson(resource.base, 'Course resource base');
  for (const language of languages) {
    if (resource.locale?.[language] !== undefined) assertJson(resource.locale[language], 'Course resource ' + language);
    const lessonPatch = [...lessonPatches.values()];
    for (const entry of lessonPatch) {
      if (entry?.base !== undefined) assertJson(entry.base, 'Lesson override base');
      if (entry?.locale?.[language] !== undefined) assertJson(entry.locale[language], 'Lesson override ' + language);
    }
  }
  const baseRaw = compactEntity(resource.base, lessonPatches, undefined, course.slug, mode);
  const base = projectMedia ? projectMedia(baseRaw, 'base') : baseRaw;
  assertJson(base, 'Course base ' + course.id);

  const files = new Map([['base.json', JSON.stringify(base, null, 2) + '\n']]);
  for (const language of languages) {
    const resolved = mergeCourseProps(resource.base, resource.locale?.[language]);
    const localizedRaw = compactEntity(resolved, lessonPatches, language, course.slug, mode);
    const localized = projectMedia ? projectMedia(localizedRaw, language) : localizedRaw;
    assertSameCourseStructure(base, localized);
    // Validate fully localized Episode Props after media projection, including nested blocks.
    const containsEpisode = node =>
      node.type === 'episode' || Object.values(node.content?.items ?? {}).some(containsEpisode);
    if (mode === 'draft' || containsEpisode(localized))
      assembleCourseTree(base, difference(base, localized), course.id, language, mode);
    const delta = difference(base, localized);
    if (delta !== undefined) {
      assertJson(delta, 'Course locale ' + language);
      files.set(language + '.json', JSON.stringify(delta, null, 2) + '\n');
    }
  }
  return files;
}

/**
 * Write only this Course's generated directory. No unrelated textbook assets
 * are modified. Check mode is read-only and verifies stale/unexpected files.
 */
export function publishCourse(
  course,
  { packageRoot, outputRoot, languages, mode = 'production', check = false, ...unknownOptions } = {},
) {
  if (Object.keys(unknownOptions).length) {
    throw new Error(
      'Unsupported Course publication options: ' +
        Object.keys(unknownOptions).join(', ') +
        '; attach Lesson patches with placeLesson at their placement',
    );
  }
  if (
    (typeof outputRoot !== 'string' || !outputRoot.trim()) &&
    (typeof packageRoot !== 'string' || !packageRoot.trim())
  ) {
    throw new Error('packageRoot or outputRoot (Course resources parent directory) is required');
  }
  const files = renderCourseFiles(course, { languages, mode });
  const root = outputRoot ? path.resolve(outputRoot) : path.join(path.resolve(packageRoot), 'generated', 'courses');
  const destination = path.join(root, course.id);
  assertSafeDirectoryPath(destination);

  if (check) {
    const existing = fs.existsSync(destination) ? fs.readdirSync(destination).sort() : [];
    const expected = [...files.keys()].sort();
    if (JSON.stringify(existing) !== JSON.stringify(expected)) {
      throw new Error('Course publication file mismatch at ' + destination);
    }
    for (const [name, expectedText] of files) {
      if (fs.readFileSync(path.join(destination, name), 'utf8') !== expectedText) {
        throw new Error('Stale Course publication: ' + path.join(destination, name));
      }
    }
    return { directory: destination, files: [...files.keys()] };
  }

  fs.mkdirSync(root, { recursive: true });
  const staging = fs.mkdtempSync(path.join(root, '.' + course.id + '-staging-'));
  const backup = staging + '-previous';
  let movedPrevious = false;
  let published = false;
  try {
    for (const [name, value] of files) fs.writeFileSync(path.join(staging, name), value, 'utf8');
    if (fs.existsSync(destination)) {
      fs.renameSync(destination, backup);
      movedPrevious = true;
    }
    fs.renameSync(staging, destination);
    published = true;
  } catch (error) {
    if (movedPrevious && !published) fs.renameSync(backup, destination);
    throw error;
  } finally {
    if (fs.existsSync(staging)) fs.rmSync(staging, { recursive: true, force: true });
    if (published && movedPrevious) fs.rmSync(backup, { recursive: true, force: true });
  }
  return { directory: destination, files: [...files.keys()] };
}
