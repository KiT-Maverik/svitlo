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
  if (!Array.isArray(value) && Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null) {
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

/** Walk the authored Course tree to associate sparse Lesson patches with IDs. */
function findLessonPatches(course, overrides, languages) {
  const visited = new Set();
  const lessons = new Map();

  function visit(entity, change, location) {
    if (!entity || typeof entity.id !== 'string' || !uuid.test(entity.id)) {
      throw new Error('Invalid Course entity identity at ' + location);
    }
    if (visited.has(entity.id)) {
      throw new Error('Duplicate Course entity ID ' + entity.id + ' at ' + location);
    }
    visited.add(entity.id);

    if (entity.type === 'lesson') {
      if (change === false) throw new Error('Disabled Lesson reached at ' + location);
      const patch = change === undefined ? undefined : entity.build.overrides(change, { languages });
      lessons.set(entity.id, patch);
      return;
    }
    if (!['course', 'module', 'chapter'].includes(entity.type)) {
      throw new Error('Unsupported Course entity type at ' + location + ': ' + String(entity.type));
    }
    const collection = entity.content;
    if (!collection || !isObject(collection.items) || !Array.isArray(collection.order)) {
      throw new Error('Invalid Course collection at ' + location);
    }
    const changes = change?.content?.items ?? {};
    const additions = change?.content?.additionalItems ?? {};
    const items = { ...collection.items, ...additions };
    const order = change?.content?.order ?? collection.order;
    const expected = Object.keys(items).filter(key => changes[key] !== false);
    if (
      order.length !== expected.length ||
      new Set(order).size !== order.length ||
      expected.some(key => !order.includes(key))
    ) {
      throw new Error('Invalid Course child order at ' + location);
    }
    for (const key of order) {
      const child = items[key];
      if (!child || child.slug !== key) throw new Error('Invalid Course child ' + location + '/' + key);
      visit(child, own(changes, key) ? changes[key] : undefined, location + '/' + key);
    }
  }

  visit(course, overrides, course.slug);
  return lessons;
}

function compactEntity(value, lessonPatches, language) {
  if (!isObject(value) || typeof value.id !== 'string') {
    throw new Error('Invalid resolved Course Props entity');
  }
  if (value.type === 'lesson') {
    if (!lessonPatches.has(value.id)) throw new Error('Unregistered Course Lesson: ' + value.id);
    const patch = lessonPatches.get(value.id);
    const base = patch?.base ?? {};
    const effective = language ? mergeCourseProps(base, patch?.locale?.[language]) : clone(base);
    assertJson(effective, 'Lesson override ' + value.id);
    return {
      type: 'lesson',
      id: value.id,
      ...(Object.keys(effective).length ? { overrides: effective } : {}),
    };
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
    items[child.slug] = compactEntity(child, lessonPatches, language);
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
 * Produce one base file and sparse per-language files, all from one Course context.
 *
 * `overrides` is the same typed authoring patch accepted by
 * `course.build.overrides(patch, { languages })`. When omitted, the Course
 * references standalone Lessons without any Course-specific changes.
 */
export function renderCourseFiles(course, { languages = course?.config?.base?.params?.languages, overrides } = {}) {
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
  const scope = { languages };
  // Course Configurator Build owns authoring, nested overrides and Props validation.
  const resource = course.build.props(scope);
  const patch = overrides === undefined ? undefined : course.build.overrides(overrides, scope);
  const lessonPatches = findLessonPatches(course, overrides, languages);
  assertJson(resource.base, 'Course resource base');
  if (patch?.base !== undefined) assertJson(patch.base, 'Course override base');
  for (const language of languages) {
    if (resource.locale?.[language] !== undefined) assertJson(resource.locale[language], 'Course resource ' + language);
    if (patch?.locale?.[language] !== undefined) assertJson(patch.locale[language], 'Course override ' + language);
    const lessonPatch = [...lessonPatches.values()];
    for (const entry of lessonPatch) {
      if (entry?.base !== undefined) assertJson(entry.base, 'Lesson override base');
      if (entry?.locale?.[language] !== undefined) assertJson(entry.locale[language], 'Lesson override ' + language);
    }
  }
  const baseResolved = mergeCourseProps(resource.base, patch?.base);
  const base = compactEntity(baseResolved, lessonPatches);
  assertJson(base, 'Course base ' + course.id);

  const files = new Map([['base.json', JSON.stringify(base, null, 2) + '\n']]);
  for (const language of languages) {
    const resolved = mergeCourseProps(
      mergeCourseProps(mergeCourseProps(resource.base, resource.locale?.[language]), patch?.base),
      patch?.locale?.[language],
    );
    const localized = compactEntity(resolved, lessonPatches, language);
    assertSameCourseStructure(base, localized);
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
export function publishCourse(course, { packageRoot, outputRoot, languages, overrides, check = false } = {}) {
  if (
    (typeof outputRoot !== 'string' || !outputRoot.trim()) &&
    (typeof packageRoot !== 'string' || !packageRoot.trim())
  ) {
    throw new Error('packageRoot or outputRoot (Course resources parent directory) is required');
  }
  const files = renderCourseFiles(course, { languages, overrides });
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
