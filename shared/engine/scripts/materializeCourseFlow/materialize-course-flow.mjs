#!/usr/bin/env node
/**
 * @fileoverview Stage 5: approved temporary editorial Course plan -> deterministic
 * technical Config handoff and Course-owned modular TypeScript DRAFT.
 * This is not a Course publisher, content approver, translator or Lesson builder.
 * Never fabricates UUIDs, Lesson files, translations, source metadata or Episodes.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import YAML from 'yaml';
import { parseYaml, checkPlan } from '../validateCourseFlow/validate-course-flow.mjs';
import { buildLessonIndex } from '../generateLessonsBySkill/lesson-index.mjs';

const rootDefault = path.resolve(fileURLToPath(new URL('../../../..', import.meta.url)));
const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;
const PACKAGE = /^content\/[a-z][a-z0-9-]*$/;
const SLUG = /^[a-z][A-Za-z0-9]*$/;
const HEADER = '// Generated Course authoring draft; manual completion and review required.\n';
const record = value => !!value && typeof value === 'object' && !Array.isArray(value);

function fail(message) {
  throw new Error('Course Flow materialization: ' + message);
}
function assertPath(target) {
  const full = path.resolve(target);
  let cursor = path.parse(full).root;
  for (const part of full.slice(cursor.length).split(path.sep).filter(Boolean)) {
    cursor = path.join(cursor, part);
    if (fs.existsSync(cursor) && fs.lstatSync(cursor).isSymbolicLink())
      fail('symlink path refused: ' + cursor);
  }
}
function sourceMd(plan) {
  const lines = ['# ' + plan.title, '', '## Course methodology', ''];
  const labels = [
    ['purpose', 'Purpose'], ['audience', 'Audience'], ['approach', 'Teaching approach'],
    ['depth', 'Depth'], ['accessibility', 'Accessibility'], ['scope', 'Scope'],
    ['entryConditions', 'Entry conditions'], ['sourceNotes', 'Source notes'],
  ];
  for (const [key, label] of labels) {
    if (plan.methodology[key]) lines.push('### ' + label, '', plan.methodology[key], '');
  }
  const competencies = (name, data) => {
    if (!data) return;
    lines.push('## ' + name, '');
    for (const k of ['skills','skillGroups','skillDomains','courses']) {
      if (data[k]?.length) lines.push('- ' + k + ': ' + data[k].join(', '));
    }
    if (data.explanation) lines.push('', data.explanation);
    lines.push('');
  };
  competencies('Learning outcomes', plan.outcomes);
  competencies('Prerequisites', plan.prerequisites);
  for (const standard of plan.standardsAlignment ?? []) {
    lines.push('## Education standard ' + standard.standardId, '',
      'Alignment status: ' + standard.status, '',
      'Evidence: ' + standard.evidence, '');
    if (standard.version) lines.push('Edition: ' + standard.version, '');
    if (standard.sourceUrl) lines.push('Source: ' + standard.sourceUrl, '');
    if (standard.jurisdiction) lines.push('Jurisdiction: ' + standard.jurisdiction, '');
  }
  function visit(collection, location) {
    if (!collection) return;
    for (const key of collection.order) {
      const node = collection.items[key];
      if (node.type === 'lesson') {
        lines.push('### Lesson ' + node.slug + ' — ' + node.title, '',
          'Lesson UUID: ' + node.lessonId, '',
          'Objective: ' + node.objective, '',
          'Skills: ' + node.skills.join(', '), '');
        for (const k of ['depth','sequenceReason','matchingRationale'])
          if (node[k]) lines.push(k + ': ' + node[k], '');
      } else {
        lines.push('## ' + (node.type === 'module' ? 'Module' : 'Chapter') +
          ': ' + node.title, '', 'UUID: ' + node.id, '',
          'Placement: ' + [...location, key].join(' / '), '', node.methodology, '');
        competencies('Learning outcomes for ' + node.slug, node.outcomes);
        competencies('Prerequisites for ' + node.slug, node.prerequisites);
        visit(node.content, [...location, key]);
      }
    }
  }
  visit(plan.content, []);
  return lines.join('\n').trimEnd() + '\n';
}
function competencyIds(data, allowCourses) {
  if (!data) return undefined;
  if (!allowCourses && data.courses?.length)
    fail('outcomes.courses cannot be mapped to Course target skills without an approved prepares-for contract');
  return Object.fromEntries(['skills','skillGroups','skillDomains', ...(allowCourses ? ['courses'] : [])]
    .filter(k => Array.isArray(data[k]) && data[k].length).map(k => [k, data[k]]));
}
function localizedTitle(title, language) {
  return { [language]: title };
}

/**
 * This stage requires persisted IDs on every Module/Chapter and every Lesson
 * reference. The schema intentionally allows missing IDs in earlier stages.
 */
export function technicalFromEditorial(plan, resolveLesson = () => null) {
  const check = checkPlan(plan, '3-complete');
  if (!check.valid) fail('unapproved/incomplete Stage 3 source: ' + check.errors.join('; '));
  if (!SLUG.test(plan.slug ?? '') || !plan.title?.trim())
    fail('Stage 5 requires a stable Course slug and authored learner-facing title');
  const ids = new Set([plan.id]);
  const moduleSlugs = new Set(), chapterSlugs = new Set();
  function collection(tree, depth) {
    const items = {};
    for (const slug of tree?.order ?? []) {
      const child = tree.items[slug];
      if (child.type === 'lesson') {
        if (!UUID.test(child.lessonId ?? '')) fail('Lesson ' + slug + ' needs its persistent UUID');
        const source = resolveLesson(child.lessonId);
        const config = { type: 'lesson', slug, lessonId: child.lessonId };
        if (source) config.source = source;
        items[slug] = { config };
        continue;
      }
      if (!UUID.test(child.id ?? '')) fail('Missing stable UUID for ' + child.type + ' ' + slug);
      if (ids.has(child.id)) fail('Duplicate Course-owned UUID: ' + child.id);
      ids.add(child.id);
      const group = child.type === 'module' ? moduleSlugs : chapterSlugs;
      if (group.has(slug)) fail('Duplicate ' + child.type + ' source filename slug ' + slug);
      group.add(slug);
      const config = {
        type: child.type, id: child.id, slug, params: {},
        locale: { title: localizedTitle(child.title, plan.documentLanguage) },
        content: collection(child.content, depth + 1),
      };
      items[slug] = { config };
    }
    return { items, order: [...(tree?.order ?? [])] };
  }
  const params = { languages: plan.supportedLanguages };
  const outcomes = competencyIds(plan.outcomes, false);
  const prerequisites = competencyIds(plan.prerequisites, true);
  if (outcomes && Object.keys(outcomes).length) params.outcomes = outcomes;
  if (prerequisites && Object.keys(prerequisites).length) params.prerequisites = prerequisites;
  if (plan.standardsAlignment?.length)
    params.educationStandards = plan.standardsAlignment.map(x => x.standardId);
  const locale = { title: localizedTitle(plan.title, plan.documentLanguage) };
  if (plan.outcomes?.explanation)
    locale.outcomesText = localizedTitle(plan.outcomes.explanation, plan.documentLanguage);
  if (plan.prerequisites?.explanation)
    locale.prerequisitesText = localizedTitle(plan.prerequisites.explanation, plan.documentLanguage);
  // Do not fill locale.description from methodological purpose: they are distinct authored fields.
  return {
    config: { id: plan.id, slug: plan.slug, type: 'course', params, locale,
      content: collection(plan.content, 0) },
    production: { documentLanguage: plan.documentLanguage, methodology: sourceMd(plan) },
  };
}
function tsLiteral(value, indentation = 0) {
  return JSON.stringify(value, null, 2).split('\n').map((line, index) =>
    index ? '  '.repeat(indentation) + line : line).join('\n');
}
function symbolOf(node) {
  const suffix = { course: 'Course', module: 'Module', chapter: 'Chapter' }[node.type];
  if (!suffix || !SLUG.test(node.slug ?? '')) fail('Unsupported modular entity');
  return node.slug + '_' + suffix;
}
function relativeImport(from, to) {
  let relative = path.posix.relative(path.posix.dirname(from), to.replace(/\.tsx?$/, ''));
  if (!relative.startsWith('.')) relative = './' + relative;
  return relative;
}
/** Static only: never import or execute authored Lesson code. */
function lessonSourceCoordinates(root, pkg, lessonId, index) {
  const entries = index?.candidates?.filter(x =>
    x.package === pkg && x.lessonId === lessonId && x.status === 'implemented') ?? [];
  if (entries.length !== 1 || index.diagnostics?.some(x => x.entityId === lessonId)) return null;
  const filename = path.resolve(root, entries[0].source);
  const base = path.resolve(root, pkg, 'data/lessons');
  if (!filename.startsWith(base + path.sep)) return null;
  assertPath(filename);
  if (!fs.existsSync(filename)) return null;
  const src = ts.createSourceFile(filename, fs.readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true);
  if (src.parseDiagnostics.length) return null;
  const candidates = src.statements.filter(ts.isVariableStatement).filter(st =>
    st.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)).flatMap(st =>
      st.declarationList.declarations.filter(d =>
        ts.isIdentifier(d.name) && ts.isCallExpression(d.initializer) &&
        ts.isIdentifier(d.initializer.expression) && d.initializer.expression.text === 'defineLesson')
        .map(d => d.name.text));
  if (candidates.length !== 1) return null;
  return { path: entries[0].source, export: candidates[0] };
}
/** Generate Course-owned files; no standalone Lesson definition is emitted. */
export function renderModularCourse(technical, pkg, resolveLesson = () => null) {
  const { config } = technical;
  const rootFile = 'index.ts';
  const nodes = [{ node: config, file: rootFile }];
  const paths = new Map();
  function register(collection) {
    for (const key of collection?.order ?? []) {
      const child = collection.items[key]?.config;
      if (!record(child)) fail('Malformed technical child ' + key);
      if (child.type === 'module' || child.type === 'chapter') {
        const filename = (child.type === 'module' ? 'modules/' : 'chapters/') + child.slug + '.ts';
        if (paths.has(filename)) fail('Duplicate Course-owned file ' + filename);
        paths.set(filename, child);
        nodes.push({ node: child, file: filename });
        register(child.content);
      }
    }
  }
  register(config.content);
  const files = new Map();
  for (const { node, file } of nodes) {
    const imports = new Map(), unresolved = [];
    const addImport = (symbol, target) => {
      const specifier = relativeImport(file, target);
      const key = specifier + ':' + symbol;
      if (!imports.has(key)) imports.set(key, { symbol, specifier });
      return symbol;
    };
    function expression(child) {
      if (child.type === 'module' || child.type === 'chapter') {
        const target = (child.type === 'module' ? 'modules/' : 'chapters/') + child.slug + '.ts';
        return addImport(symbolOf(child), target);
      }
      if (child.type !== 'lesson') fail('Course methodology may not create ' + child.type);
      const reference = resolveLesson(child.lessonId);
      if (reference) {
        const specifier = relativeImport(file, reference.path);
        const alias = 'standaloneLesson' + imports.size;
        const key = specifier + ':' + reference.export;
        if (!imports.has(key)) imports.set(key, { symbol: reference.export, specifier, alias });
        return imports.get(key).alias;
      }
      const alias = 'UNRESOLVED_LESSON_' + unresolved.length;
      unresolved.push({ lessonId: child.lessonId, alias });
      return alias;
    }
    const parts = [];
    for (const [key, value] of Object.entries(node)) {
      if (key !== 'content') {
        parts.push('  ' + JSON.stringify(key) + ': ' + tsLiteral(value, 1));
      } else {
        const children = Object.entries(value.items).map(([slug, entry]) =>
          '    ' + JSON.stringify(slug) + ': ' + expression(entry.config));
        const collection = '{\n    items: {\n' + children.join(',\n') +
          (children.length ? '\n' : '') + '    },\n    order: ' + tsLiteral(value.order, 2) + '\n  }';
        parts.push('  content: ' + collection);
      }
    }
    const header = [
      HEADER.trimEnd(),
      'import { define' + node.type[0].toUpperCase() + node.type.slice(1) + ' } from "@svitlo/engine/build";',
      ...[...imports.values()].map(x => 'import { ' + x.symbol +
        (x.alias ? ' as ' + x.alias : '') + ' } from ' + JSON.stringify(x.specifier) + ';'),
      '',
      ...unresolved.map(x => '// TODO: Resolve standalone Lesson UUID ' +
        JSON.stringify(x.lessonId) + ' and replace ' + x.alias + '; never define Lesson inside Course.'),
      ...(unresolved.length ? [''] : []),
      'export const ' + symbolOf(node) + ' = define' +
        node.type[0].toUpperCase() + node.type.slice(1) +
        '({\n' + parts.join(',\n') + '\n});',
      '',
    ];
    files.set(file, header.join('\n'));
  }
  for (const family of ['module','chapter']) {
    const entries = nodes.filter(x => x.node.type === family).sort((a,b) => a.file.localeCompare(b.file));
    if (entries.length) files.set((family === 'module' ? 'modules/' : 'chapters/') + 'index.ts',
      entries.map(x => 'export { ' + symbolOf(x.node) + ' } from "./' + x.node.slug + '";').join('\n') + '\n');
  }
  return files;
}
export function planArtifacts(plan, pkg, root, lessonIndex) {
  const coursePath = pkg + '/data/courses/' + plan.id.at(-1) + '/' + plan.id;
  const lookup = id => lessonSourceCoordinates(root, pkg, id, lessonIndex);
  const technical = technicalFromEditorial(plan, lookup);
  const drafts = renderModularCourse(technical, pkg, lookup);
  const result = new Map([
    ['config.yaml', YAML.stringify(technical, { lineWidth: 0 })],
    ['methodology.md', technical.production.methodology],
    ...drafts,
  ]);
  return { folder: path.join(root, coursePath), files: result };
}
function checkArtifacts(artifacts, mode) {
  const { folder, files } = artifacts;
  assertPath(folder);
  if (files.size > 1500) fail('too many generated files');
  for (const [name, content] of files) {
    const destination = path.join(folder, name);
    assertPath(destination);
    if (fs.existsSync(destination)) {
      if (fs.readFileSync(destination, 'utf8') !== content)
        fail('existing authored file differs; refusing overwrite: ' + destination);
    } else if (mode !== '--write') fail('missing materialized source: ' + destination);
    if (name.endsWith('.ts')) {
      const parsed = ts.createSourceFile(name, content, ts.ScriptTarget.Latest, true);
      if (parsed.parseDiagnostics.length) fail('generated TypeScript syntax invalid: ' + name);
    }
  }
}
function writeArtifacts(artifacts) {
  const { folder, files } = artifacts;
  for (const [name, content] of files) {
    const filename = path.join(folder, name);
    if (fs.existsSync(filename)) continue;
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, content, { flag: 'wx' });
  }
}
export function parseArgs(argv) {
  const opts = {};
  for (let i = 0; i < argv.length; i++) {
    const key = argv[i], value = argv[i+1];
    if (['--package','--course'].includes(key)) {
      if (opts[key] || !value) fail('duplicate/missing option ' + key);
      opts[key] = value;
      i++;
    } else if (['--write','--check','--finalize'].includes(key)) {
      if (opts.action) fail('choose exactly one mode');
      opts.action = key;
    } else fail('unknown option ' + key);
  }
  if (!PACKAGE.test(opts['--package'] ?? '') ||
      !UUID.test(opts['--course'] ?? '') || !opts.action)
    fail('usage: --package content/<book> --course <uuid> --write|--check|--finalize');
  return { pkg: opts['--package'], id: opts['--course'], mode: opts.action };
}
export function materialize(argv, root = rootDefault) {
  const { pkg, id, mode } = parseArgs(argv);
  const folder = path.join(root, pkg, 'data/courses', id.at(-1), id);
  const source = path.join(folder, 'course.yaml');
  assertPath(source);
  if (!fs.existsSync(source)) fail('missing approved temporary course.yaml: ' + source);
  if (fs.statSync(source).size > 2*1024*1024) fail('course.yaml exceeds 2MiB');
  if (mode === '--write' && (fs.existsSync(path.join(folder, 'index.ts')) ||
      fs.readdirSync(folder).some(name => name.endsWith('.data.ts')))) {
    console.log('SKIP Course ' + id + ': existing authored Course entrypoint; no files modified');
    return { skipped: true };
  }
  const plan = parseYaml(fs.readFileSync(source, 'utf8'));
  if (plan.id !== id) fail('Course UUID in plan does not match canonical folder');
  const lessonIndex = buildLessonIndex(root, pkg);
  const artifacts = planArtifacts(plan, pkg, root, lessonIndex);
  checkArtifacts(artifacts, mode);
  if (mode === '--write') writeArtifacts(artifacts);
  else if (mode === '--finalize') {
    // Only after a separate successful check/commit; Git retains the plan history.
    fs.unlinkSync(source);
  }
  console.log(mode + ' Course ' + id + ': ' + artifacts.files.size + ' verified draft artifacts');
  return { skipped: false, artifacts };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { materialize(process.argv.slice(2)); }
  catch (error) { console.error(String(error.message ?? error)); process.exitCode = 1; }
}
