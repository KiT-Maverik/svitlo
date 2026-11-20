#!/usr/bin/env node
/**
 * @fileoverview Read-only, stage-aware validation for the temporary editorial
 * Course plan. It does NOT validate Engine technical config.yaml, generate TS,
 * materialize Course sources, verify taxonomy/standards approval or publish Props.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import YAML from 'yaml';

const schemaPath = fileURLToPath(
  new URL('../../../../studio/skills/course-workflow/course-flow.schema.json', import.meta.url),
);
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const ajv = new Ajv2020({ allErrors: true, strict: true, validateFormats: false });
const validateStructural = ajv.compile(schema);
const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const collection = x => x !== null && typeof x === 'object' && !Array.isArray(x);
const allowed = {
  course: new Set(['module', 'chapter', 'lesson', 'episode']),
  module: new Set(['chapter', 'lesson', 'episode']),
  chapter: new Set(['lesson', 'episode']),
};
export function parseYaml(text) {
  if (Buffer.byteLength(text, 'utf8') > 2 * 1024 * 1024) throw new Error('Plan exceeds 2 MiB');
  const document = YAML.parseDocument(text, { strict: true, uniqueKeys: true, version: '1.2' });
  if (document.errors.length) throw new Error(document.errors.map(x => x.message).join('; '));
  return document.toJS({ maxAliasCount: 0 });
}

export function checkPlan(plan, stage) {
  if (!['1', '2', '3', '3-complete'].includes(stage)) throw new Error('Expected --stage 1|2|3|3-complete');
  const errors = [];
  if (!validateStructural(plan)) {
    return {
      valid: false,
      errors: (validateStructural.errors ?? []).slice(0, 100).map(x => (x.instancePath || '/') + ': ' + x.message),
    };
  }
  if (stage === '1' && plan.content) errors.push('Stage 1 must not author Module/Chapter/Lesson structure');
  if (stage !== '1' && !plan.content) errors.push('Stage 2–3 requires Course macrostructure content.items/order');
  const lessonCount = { total: 0, unidentified: 0, planned: 0 };
  let episodeCount = 0;
  const ids = new Set();
  function walk(node, kind, depth, location) {
    if (depth > 12) return errors.push(location + ': nesting exceeds 12 levels');
    if (!node.content) return;
    const { items, order } = node.content;
    if (Object.keys(items).length !== order.length || order.some(key => !Object.hasOwn(items, key))) {
      errors.push(location + ': order must contain every items key exactly once');
    }
    for (const [key, child] of Object.entries(items)) {
      const position = location + '/' + key;
      if (child.slug !== key) errors.push(position + ': items key must match child slug');
      if (!allowed[kind]?.has(child.type)) errors.push(position + ': invalid ' + child.type + ' within ' + kind);
      if (child.type === 'lesson') {
        lessonCount.total++;
        if (!child.lessonId) {
          lessonCount.unidentified++;
          if (typeof child.methodology === 'string' && child.methodology.trim()) lessonCount.planned++;
          if (stage === '3-complete' && (!child.methodology || !child.methodology.trim()))
            errors.push(position + ': Missing Lesson ID requires in-place methodology for Stage 3 completion');
        } else {
          if (!uuid.test(child.lessonId)) errors.push(position + ': invalid Lesson UUID');
          ids.add(child.lessonId.toLowerCase());
        }
      } else if (child.type === 'episode') {
        episodeCount++;
        if (child.section) {
          const { items, order } = child.section;
          if (Object.keys(items).length !== order.length || order.some(key => !Object.hasOwn(items, key)))
            errors.push(position + ': Episode Sections require matching items/order keys');
        }
      } else if (child.type === 'module' || child.type === 'chapter') {
        walk(child, child.type, depth + 1, position);
      } else {
        errors.push(position + ': invalid Course child');
      }
    }
  }
  if (plan.content) walk(plan, 'course', 0, 'course');
  if (errors.length > 100) errors.splice(100);
  return {
    valid: errors.length === 0,
    errors,
    lessonSlots: lessonCount.total,
    allocatedLessonIds: ids.size,
    unresolvedLessonIds: lessonCount.unidentified - lessonCount.planned,
    plannedLessons: lessonCount.planned,
    episodes: episodeCount,
  };
}

function args(argv) {
  if (argv.length !== 4 || argv[0] !== '--file' || argv[2] !== '--stage')
    throw new Error('Usage: validate-course-flow.mjs --file path/to/course.yaml --stage 1|2|3|3-complete');
  return { file: argv[1], stage: argv[3] };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const input = args(process.argv.slice(2));
    if (!input.file.endsWith('/course.yaml') && path.basename(input.file) !== 'course.yaml')
      throw new Error('This command accepts only editorial course.yaml; never technical config.yaml');
    const result = checkPlan(parseYaml(fs.readFileSync(input.file, 'utf8')), input.stage);
    for (const err of result.errors) console.error(err);
    process.stdout.write(JSON.stringify(result) + '\n');
    if (!result.valid) process.exitCode = 1;
  } catch (error) {
    console.error(String(error.message ?? error));
    process.exitCode = 1;
  }
}
