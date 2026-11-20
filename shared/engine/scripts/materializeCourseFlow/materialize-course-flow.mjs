#!/usr/bin/env node
/**
 * @fileoverview Stage 5: approved temporary editorial Course plan -> deterministic
 * Course-owned modular TypeScript/Markdown DRAFTS and initial Lesson YAMLs.
 * This is not a Course publisher, content approver, translator or Lesson builder.
 * It assigns stable UUIDs only to explicitly planned, reviewed source nodes;
 * no intermediate config.yaml, fabricated translations, media or Lesson PRs.
 */
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import YAML from 'yaml';
import { parseYaml, checkPlan } from '../validateCourseFlow/validate-course-flow.mjs';
import { buildLessonIndex } from '../generateLessonsBySkill/lesson-index.mjs';
import { renderEpisodeScaffoldSource } from './episode-draft-renderer.mjs';

const rootDefault = path.resolve(fileURLToPath(new URL('../../../..', import.meta.url)));
const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;
const PACKAGE = /^content\/[a-z][a-z0-9-]*$/;
const SLUG = /^[a-z][A-Za-z0-9]*$/;
const record = value => !!value && typeof value === 'object' && !Array.isArray(value);

function fail(message) {
  throw new Error('Course Flow materialization: ' + message);
}
function assertPath(target) {
  const full = path.resolve(target);
  let cursor = path.parse(full).root;
  for (const part of full.slice(cursor.length).split(path.sep).filter(Boolean)) {
    cursor = path.join(cursor, part);
    if (fs.existsSync(cursor) && fs.lstatSync(cursor).isSymbolicLink()) fail('symlink path refused: ' + cursor);
  }
}
function addCompetencies(lines, name, data) {
  if (!data) return;
  lines.push('## ' + name, '');
  for (const key of ['skills', 'skillGroups', 'skillDomains', 'courses']) {
    if (data[key]?.length) lines.push('- ' + key + ': ' + data[key].join(', '));
  }
  if (data.explanation) lines.push('', data.explanation);
  lines.push('');
}

/** Keep Course-specific Lesson placement rationale with its immediate parent. */
function addDirectLessons(lines, collection) {
  for (const key of collection?.order ?? []) {
    const node = collection.items[key];
    if (node.type !== 'lesson') continue;
    lines.push(
      '### Lesson ' + node.slug + ' — ' + node.title,
      '',
      'Lesson UUID: ' + node.lessonId,
      '',
      'Objective: ' + node.objective,
      '',
      'Skills: ' + node.skills.join(', '),
      '',
    );
    for (const field of ['depth', 'sequenceReason', 'matchingRationale'])
      if (node[field]) lines.push(field + ': ' + node[field], '');
  }
}

/** Keep the Course methodology independent from child methodology sidecars. */
function sourceMd(plan) {
  const lines = ['# ' + plan.title, '', '## Course methodology', ''];
  const labels = [
    ['purpose', 'Purpose'],
    ['audience', 'Audience'],
    ['approach', 'Teaching approach'],
    ['depth', 'Depth'],
    ['accessibility', 'Accessibility'],
    ['scope', 'Scope'],
    ['entryConditions', 'Entry conditions'],
    ['sourceNotes', 'Source notes'],
  ];
  for (const [key, label] of labels) {
    if (plan.methodology[key]) lines.push('### ' + label, '', plan.methodology[key], '');
  }
  addCompetencies(lines, 'Learning outcomes', plan.outcomes);
  addCompetencies(lines, 'Prerequisites', plan.prerequisites);
  for (const standard of plan.standardsAlignment ?? []) {
    lines.push(
      '## Education standard ' + standard.standardId,
      '',
      'Alignment status: ' + standard.status,
      '',
      'Evidence: ' + standard.evidence,
      '',
    );
    if (standard.version) lines.push('Edition: ' + standard.version, '');
    if (standard.sourceUrl) lines.push('Source: ' + standard.sourceUrl, '');
    if (standard.jurisdiction) lines.push('Jurisdiction: ' + standard.jurisdiction, '');
  }
  addDirectLessons(lines, plan.content);
  return lines.join('\n').trimEnd() + '\n';
}

/** Every Course-owned entity persists its own pedagogy beside its source. */
function childMethodologyMd(node) {
  const heading = node.type[0].toUpperCase() + node.type.slice(1);
  const lines = [
    '# ' + node.title,
    '',
    '## ' + heading + ' methodology',
    '',
    node.methodology ?? 'Episode content requires authoring review',
    '',
    'UUID: ' + node.id,
    '',
  ];
  addCompetencies(lines, 'Learning outcomes', node.outcomes);
  addCompetencies(lines, 'Prerequisites', node.prerequisites);
  addDirectLessons(lines, node.content);
  return lines.join('\n').trimEnd() + '\n';
}
function competencyIds(data, allowCourses) {
  if (!data) return undefined;
  if (!allowCourses && data.courses?.length)
    fail('outcomes.courses cannot be mapped to Course target skills without an approved prepares-for contract');
  return Object.fromEntries(
    ['skills', 'skillGroups', 'skillDomains', ...(allowCourses ? ['courses'] : [])]
      .filter(k => Array.isArray(data[k]) && data[k].length)
      .map(k => [k, data[k]]),
  );
}
function localizedTitle(title, language) {
  return { [language]: title };
}

/**
 * This stage requires persisted IDs on every Module/Chapter and every Lesson
 * reference. The schema intentionally allows missing IDs in earlier stages.
 */
/**
 * Stable RFC 4122 version-5-shaped UUID generated for a *specific* Course slot.
 * No random allocations: a rerun after a partial write always reuses the ID.
 * The Course UUID and complete placement path namespace the identifier.
 */
export function deriveCourseEntityId(courseId, kind, placement) {
  if (!UUID.test(courseId) || !['module', 'chapter', 'episode', 'lesson'].includes(kind) || !placement)
    fail('invalid deterministic entity ID inputs');
  const bytes = createHash('sha1')
    .update('svitlo-course-source-v1:' + courseId + ':' + kind + ':' + placement)
    .digest()
    .subarray(0, 16);
  bytes[6] = (bytes[6] & 0x0f) | 0x50;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const h = bytes.toString('hex');
  return h.slice(0, 8) + '-' + h.slice(8, 12) + '-' + h.slice(12, 16) + '-' + h.slice(16, 20) + '-' + h.slice(20);
}

/** One approved Course YAML directly produces a typed in-memory Course tree. */
export function technicalFromEditorial(plan, resolveLesson = () => null) {
  const check = checkPlan(plan, '3-complete');
  if (!check.valid) fail('unapproved/incomplete Stage 3 source: ' + check.errors.join('; '));
  if (!SLUG.test(plan.slug ?? '') || !plan.title?.trim() || !plan.description?.trim())
    fail('Stage 5 requires stable Course slug and authored learner-facing title and description');
  if (!plan.supportedLanguages.includes(plan.documentLanguage))
    fail('documentLanguage must be included in supportedLanguages');
  const authored = structuredClone(plan);
  const ids = new Set([plan.id.toLowerCase()]);
  const explicit = new Set();
  function collectExplicit(collection) {
    for (const slug of collection?.order ?? []) {
      const node = collection.items[slug];
      if (node.type === 'lesson') {
        if (node.lessonId) explicit.add(node.lessonId.toLowerCase());
      } else {
        if (node.id) {
          const id = node.id.toLowerCase();
          if (ids.has(id)) fail('duplicate Course entity UUID ' + id);
          ids.add(id);
          explicit.add(id);
        }
        if (node.content) collectExplicit(node.content);
      }
    }
  }
  collectExplicit(authored.content);
  const newLessons = new Map();
  const generated = new Set();
  function collection(tree, parent) {
    const items = {};
    for (const slug of tree?.order ?? []) {
      const child = tree.items[slug];
      const placement = [...parent, slug].join('/');
      if (child.type === 'lesson') {
        if (!child.lessonId) {
          child.lessonId = deriveCourseEntityId(plan.id, 'lesson', placement);
          if (ids.has(child.lessonId) || explicit.has(child.lessonId) || generated.has(child.lessonId))
            fail('generated Lesson UUID collision at ' + placement);
          generated.add(child.lessonId);
          newLessons.set(child.lessonId, { node: structuredClone(child), placement });
        }
        const source = resolveLesson(child.lessonId);
        const config = { type: 'lesson', slug, lessonId: child.lessonId };
        if (source) config.source = source;
        items[slug] = { config };
        continue;
      }
      if (!child.id) child.id = deriveCourseEntityId(plan.id, child.type, placement);
      if (generated.has(child.id) || (ids.has(child.id) && !explicit.has(child.id)))
        fail('duplicate generated entity UUID at ' + placement);
      generated.add(child.id);
      if (child.type === 'episode') {
        const config = {
          id: child.id,
          type: 'episode',
          slug,
          params: { ...child.params, languages: child.params?.languages ?? [plan.documentLanguage] },
          locale: { title: child.locale?.title ?? { [plan.documentLanguage]: child.title } },
          section: child.section ?? { items: {}, order: [] },
          ...(child.events ? { events: child.events } : {}),
        };
        items[slug] = { config };
        continue;
      }
      const config = {
        type: child.type,
        id: child.id,
        slug,
        params: {},
        locale: { title: { [plan.documentLanguage]: child.title } },
        content: collection(child.content, [...parent, slug]),
      };
      items[slug] = { config };
    }
    return { items, order: [...(tree?.order ?? [])] };
  }
  const content = collection(authored.content, []);
  const params = { languages: plan.supportedLanguages };
  for (const field of ['age', 'grade']) {
    const range = plan[field];
    if (range) {
      if (!Number.isInteger(range.min) || !Number.isInteger(range.max) || range.min > range.max)
        fail('invalid audience ' + field + ' bounds');
      params[field] = range;
    }
  }
  const outcomes = competencyIds(plan.outcomes, false);
  const prerequisites = competencyIds(plan.prerequisites, true);
  if (outcomes && Object.keys(outcomes).length) params.outcomes = outcomes;
  if (prerequisites && Object.keys(prerequisites).length) params.prerequisites = prerequisites;
  if (plan.standardsAlignment?.length) params.educationStandards = plan.standardsAlignment.map(x => x.standardId);
  const locale = {
    title: { [plan.documentLanguage]: plan.title },
    description: { [plan.documentLanguage]: plan.description },
  };
  if (plan.outcomes?.explanation) locale.outcomesText = { [plan.documentLanguage]: plan.outcomes.explanation };
  if (plan.prerequisites?.explanation)
    locale.prerequisitesText = { [plan.documentLanguage]: plan.prerequisites.explanation };
  return {
    config: { id: plan.id, slug: plan.slug, type: 'course', params, locale, content },
    production: { documentLanguage: plan.documentLanguage, methodology: sourceMd(authored) },
    newLessons,
    authored,
  };
}
function tsLiteral(value, indentation = 0) {
  // JSON is a stable source serializer; unquote only legal, non-special TS property keys.
  return JSON.stringify(value, null, 2)
    .replace(/(^|\n)([ \t]*)"([A-Za-z_$][A-Za-z0-9_$]*)":/g, (full, line, space, key) =>
      key === '__proto__' ? full : line + space + key + ':',
    )
    .split('\n')
    .map((line, index) => (index ? '  '.repeat(indentation) + line : line))
    .join('\n');
}
function symbolOf(node) {
  if (!['course', 'module', 'chapter', 'episode'].includes(node.type) || !SLUG.test(node.slug ?? ''))
    fail('Unsupported modular entity');
  if (reservedNames.has(node.slug)) fail('Reserved Course source export identifier: ' + node.slug);
  return node.slug;
}
/** Static only: never import or execute authored Lesson code. */
function lessonSourceCoordinates(root, pkg, courseId, lessonId, index) {
  const entries =
    index?.candidates?.filter(x => x.package === pkg && x.lessonId === lessonId && x.status === 'implemented') ?? [];
  if (entries.length !== 1 || index.diagnostics?.some(x => x.entityId === lessonId)) return null;
  const filename = path.resolve(root, entries[0].source);
  const base = path.resolve(root, pkg, 'data/lessons');
  if (!filename.startsWith(base + path.sep)) return null;
  assertPath(filename);
  if (!fs.existsSync(filename)) return null;
  const src = ts.createSourceFile(filename, fs.readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true);
  if (src.parseDiagnostics.length) return null;
  const candidates = src.statements
    .filter(ts.isVariableStatement)
    .filter(st => st.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword))
    .flatMap(st =>
      st.declarationList.declarations
        .filter(
          d =>
            ts.isIdentifier(d.name) &&
            ts.isCallExpression(d.initializer) &&
            ts.isIdentifier(d.initializer.expression) &&
            d.initializer.expression.text === 'defineLesson',
        )
        .map(d => d.name.text),
    );
  if (candidates.length !== 1) return null;
  const courseFolder = path.posix.join(pkg, 'data/courses', courseId.at(-1), courseId);
  return { path: path.posix.relative(courseFolder, entries[0].source), export: candidates[0] };
}
/**
 * Extract the nested Episode Config without creating a second Course.
 * Episode source uses the Course's active authoring language tuple.
 */
function renderEpisodeDraft(episode, language, courseId) {
  const wrapper = {
    type: 'course',
    id: courseId,
    slug: 'episodeScaffold',
    documentLanguage: language,
    params: { languages: [language] },
    locale: { title: { [language]: 'Episode draft' }, description: { [language]: 'Draft' } },
    content: { items: { [episode.slug]: episode }, order: [episode.slug] },
  };
  const rendered = renderEpisodeScaffoldSource(wrapper);
  const ast = ts.createSourceFile('episode-scaffold.ts', rendered, ts.ScriptTarget.Latest, true);
  if (ast.parseDiagnostics.length) fail('Episode renderer produced invalid draft syntax');
  const calls = [];
  const visit = node => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'defineEpisode')
      calls.push(node);
    ts.forEachChild(node, visit);
  };
  visit(ast);
  if (calls.length !== 1) fail('Expected exactly one generated Episode expression for ' + episode.slug);
  const call = calls[0];
  const config = call.arguments[0];
  if (!ts.isObjectLiteralExpression(config)) fail('Episode draft must use an object Config');
  const property = (obj, name) =>
    obj.properties.find(
      entry =>
        ts.isPropertyAssignment(entry) &&
        (ts.isIdentifier(entry.name) || ts.isStringLiteral(entry.name)) &&
        entry.name.text === name,
    );
  const section = property(config, 'section');
  const params = property(config, 'params');
  if (!section || !params || !ts.isObjectLiteralExpression(params.initializer))
    fail('Episode draft lacks section or params Config');
  const languagesProperty = property(params.initializer, 'languages');
  if (!languagesProperty) fail('Episode draft lacks its language declaration');

  const start = call.getStart(ast);
  const changes = [
    { start: section.getStart(ast) - start, end: section.getEnd() - start, value: 'section' },
    {
      start: languagesProperty.initializer.getStart(ast) - start,
      end: languagesProperty.initializer.getEnd() - start,
      value: 'languages',
    },
  ];
  let expression = call.getText(ast);
  for (const change of changes.sort((a, b) => b.start - a.start)) {
    expression = expression.slice(0, change.start) + change.value + expression.slice(change.end);
  }
  expression = expression.replace(
    /^defineEpisode\(/,
    'defineEpisode<' + JSON.stringify(episode.slug) + ', CourseLanguages, typeof section.items>(',
  );
  const sectionExpression = section.initializer.getText(ast);
  const factoryNames = [
    ...new Set(
      [...[expression, sectionExpression].join('\n').matchAll(/\bdefine[A-Z][A-Za-z0-9_]*(?=\s*(?:<[^>]*>)?\()/g)].map(
        m => m[0],
      ),
    ),
  ].sort();
  if (!factoryNames.includes('defineEpisode')) factoryNames.push('defineEpisode');
  return (
    'import { ' +
    factoryNames.sort().join(', ') +
    " } from '@svitlo/engine/build';\n\n" +
    "import { languages, type CourseLanguages } from '#coursesData/" +
    courseId.at(-1) +
    '/' +
    courseId +
    "/constants';\n\n" +
    'const section = ' +
    sectionExpression +
    ';\n\n' +
    'export const ' +
    symbolOf(episode) +
    ' = ' +
    expression +
    ';\n'
  );
}
const reservedNames = new Set([
  'items',
  'languages',
  'CourseLanguages',
  'defineCourse',
  'defineChapter',
  'defineModule',
  'defineEpisode',
  'default',
  'class',
  'const',
  'var',
  'let',
  'function',
  'export',
  'import',
  'new',
  'return',
  'case',
  'this',
  'if',
  'else',
  'for',
  'while',
  'null',
  'true',
  'false',
  'await',
  'yield',
  'super',
  'delete',
  'void',
  'typeof',
  'in',
]);

/** Generate a modular, acyclic authoring draft, never a standalone Lesson implementation. */
export function renderModularCourse(
  technical,
  pkg,
  resolveLesson = () => null,
  resolveDraftSlug = (_id, slug) => slug,
) {
  const { config } = technical;
  const nodes = [{ node: config, file: 'index.ts' }];
  const paths = new Set(['index.ts']);
  const files = new Map();
  function register(collection, editorial, parent) {
    for (const key of collection?.order ?? []) {
      const child = collection.items[key]?.config;
      if (!record(child)) fail('Malformed technical child ' + key);
      if (['module', 'chapter', 'episode'].includes(child.type)) {
        if (!SLUG.test(child.slug)) fail('Invalid Course-owned entity slug ' + child.slug);
        const directory = parent + '/' + child.slug;
        const filename = directory + '/index.ts';
        if (paths.has(filename)) fail('Duplicate Course-owned file ' + filename);
        paths.add(filename);
        const original = editorial?.items?.[key];
        if (!original || original.type !== child.type) fail('Missing editorial methodology for ' + directory);
        nodes.push({ node: child, file: filename });
        files.set(directory + '/methodology.md', childMethodologyMd(original));
        register(child.content, original.content, directory);
      }
    }
  }
  register(config.content, technical.authored.content, 'content');
  for (const { node, file } of nodes) {
    if (node.type === 'episode') {
      files.set(file, renderEpisodeDraft(node, technical.production.documentLanguage, config.id));
      continue;
    }
    const imports = new Map();
    const localSymbols = new Set(reservedNames);
    localSymbols.add(node.slug);
    const addImport = (symbol, specifier, requestedAlias) => {
      const signature = specifier + '#' + symbol;
      if (imports.has(signature)) return imports.get(signature).alias;
      let alias = requestedAlias;
      if (!SLUG.test(alias) || localSymbols.has(alias)) {
        alias = requestedAlias + 'Item';
        let index = 2;
        while (localSymbols.has(alias)) alias = requestedAlias + 'Item' + index++;
      }
      localSymbols.add(alias);
      imports.set(signature, { symbol, specifier, alias });
      return alias;
    };
    function expression(child, key) {
      if (['module', 'chapter', 'episode'].includes(child.type)) {
        const directory = file === 'index.ts' ? 'content' : path.posix.dirname(file);
        const specifier =
          '#coursesData/' + config.id.at(-1) + '/' + config.id + '/' + directory + '/' + child.slug + '/index';
        return addImport(symbolOf(child), specifier, key);
      }
      if (child.type !== 'lesson') fail('Course methodology may not create ' + child.type);
      const reference = resolveLesson(child.lessonId) ?? child.source;
      let specifier;
      let symbol;
      if (reference && typeof reference.path === 'string' && typeof reference.export === 'string') {
        const rootFolder = 'data/courses/' + config.id.at(-1) + '/' + config.id;
        const absolute = path.posix.normalize(path.posix.join(rootFolder, reference.path));
        if (!absolute.startsWith('data/lessons/') || !absolute.endsWith('.ts'))
          fail('Invalid verified standalone Lesson source: ' + reference.path);
        specifier = '#lessonsData/' + absolute.slice('data/lessons/'.length, -3);
        symbol = reference.export;
      } else {
        const slug = resolveDraftSlug(child.lessonId, child.slug);
        if (!SLUG.test(slug) || !UUID.test(child.lessonId))
          fail('Cannot construct a future Lesson import without canonical UUID and slug');
        specifier = '#lessonsData/' + child.lessonId.at(-1) + '/' + child.lessonId + '/index';
        symbol = slug;
      }
      return addImport(symbol, specifier, key);
    }
    const entries =
      node.content?.order.map(key => {
        const child = node.content.items[key]?.config;
        if (!child) fail('Missing ordered child ' + key);
        const alias = expression(child, key);
        return '  ' + (key === alias ? key : key + ': ' + alias) + ',';
      }) ?? [];
    const params = node.type === 'course' ? { ...node.params } : null;
    const fields = [];
    for (const [key, value] of Object.entries(node)) {
      if (key === 'content') {
        fields.push('  content: {\n    items,\n    order: ' + tsLiteral(value.order, 2) + '\n  }');
      } else if (key === 'params' && params) {
        fields.push(
          '  params: {\n    languages,' +
            Object.entries(params)
              .filter(([field]) => field !== 'languages')
              .map(([field, fieldValue]) => '\n    ' + field + ': ' + tsLiteral(fieldValue, 2) + ',')
              .join('') +
            '\n  }',
        );
      } else {
        fields.push('  ' + key + ': ' + tsLiteral(value, 1));
      }
    }
    const importGroups = new Map();
    for (const { symbol, specifier, alias } of imports.values()) {
      const group = importGroups.get(specifier) ?? [];
      group.push(symbol === alias ? symbol : symbol + ' as ' + alias);
      importGroups.set(specifier, group);
    }
    const renderImports = prefix =>
      [...importGroups]
        .filter(([specifier]) => specifier.startsWith(prefix))
        .sort(([a], [b]) => a.localeCompare(b))
        .map(
          ([specifier, bindings]) =>
            'import { ' + bindings.sort().join(', ') + ' } from ' + JSON.stringify(specifier) + ';',
        );
    const packageImports = [
      'import { define' + node.type[0].toUpperCase() + node.type.slice(1) + " } from '@svitlo/engine/build';",
    ];
    const aliasImports = renderImports('#');
    const constants = '#coursesData/' + config.id.at(-1) + '/' + config.id + '/constants';
    if (node.type === 'course') {
      aliasImports.push('import { languages, type CourseLanguages } from ' + JSON.stringify(constants) + ';');
    } else {
      aliasImports.push('import type { CourseLanguages } from ' + JSON.stringify(constants) + ';');
    }
    const imported = [packageImports, aliasImports]
      .filter(group => group.length)
      .map(group => group.join('\n'))
      .join('\n\n');
    const factoryName = 'define' + node.type[0].toUpperCase() + node.type.slice(1);
    const source =
      imported +
      '\n\n' +
      'const items = {\n' +
      entries.join('\n') +
      (entries.length ? '\n' : '') +
      '};\n\n' +
      'export const ' +
      symbolOf(node) +
      ' = ' +
      factoryName +
      '<' +
      JSON.stringify(node.slug) +
      ', typeof items, CourseLanguages>({\n' +
      fields.join(',\n') +
      '\n});\n';
    files.set(file, source);
  }
  // Use the real shared Review contract until a Course-specific review contract exists.
  // Numeric zero is unreviewed; the TODO and zero-evidence guard preserve approval gates.
  files.set(
    'review.ts',
    "// TODO (BLOCKER): Conduct review. Zero is unreviewed; verify PR, revision and language evidence before Ready/merge.\n" +
      "import type { Review } from '@svitlo/engine/build';\n\n" +
      'export const courseReview = {\n' +
      '  ai: { locales: 0 },\n' +
      '  human: { acceptance: 0, locales: {} },\n' +
      '} satisfies Review;\n',
  );
  const planned = config.params.languages;
  files.set(
    'constants.ts',
    "import type { SupportedLanguages } from '@svitlo/engine/build';\n\n" +
      '// TODO (BLOCKER): Restore the complete language set when translations are ready:\n' +
      '// export const languages = ' +
      JSON.stringify(planned) +
      ' as const satisfies SupportedLanguages;\n\n' +
      'export const languages = ' +
      JSON.stringify([technical.production.documentLanguage]) +
      ' as const satisfies SupportedLanguages;\n' +
      'export type CourseLanguages = typeof languages;\n',
  );
  return files;
}
/**
 * Exactly one Course input course.yaml. The returned artifacts are Course-owned
 * TS/Markdown plus new Lesson-owned YAMLs; there is NO generated config.yaml.
 */
export function planArtifacts(plan, pkg, root, lessonIndex) {
  const coursePath = pkg + '/data/courses/' + plan.id.at(-1) + '/' + plan.id;
  const lookup = id => lessonSourceCoordinates(root, pkg, plan.id, id, lessonIndex);
  const technical = technicalFromEditorial(plan, lookup);
  const draftSlug = (id, slotSlug) => {
    const fromPlan = technical.newLessons.get(id)?.node.slug;
    if (fromPlan) return fromPlan;
    const file = path.join(root, pkg, 'data/lessons', id.at(-1), id, 'lesson.yaml');
    assertPath(file);
    if (!fs.existsSync(file)) return slotSlug;
    const source = YAML.parse(fs.readFileSync(file, 'utf8'));
    if (source?.config?.id !== id || !SLUG.test(source?.config?.slug ?? ''))
      fail('Invalid standalone Lesson identity in ' + file);
    return source.config.slug;
  };
  const drafts = renderModularCourse(technical, pkg, lookup, draftSlug);
  const files = new Map([['methodology.md', technical.production.methodology], ...drafts]);
  const lessonFiles = new Map();
  const lessonAssignments = [];
  for (const [id, { node }] of technical.newLessons) {
    if (!node.methodology?.trim()) fail('planned Lesson lacks complete methodology: ' + node.slug);
    const lessonFolder = path.join(root, pkg, 'data/lessons', id.at(-1), id);
    const lessonConfig = {
      config: {
        id,
        slug: node.slug,
        type: 'lesson',
        skills: [...node.skills],
        params: {
          languages: [...plan.supportedLanguages],
          requireQuiz: node.quizRequired ?? false,
          sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
        },
        locale: { title: { [plan.documentLanguage]: node.title } },
        section: { items: {}, order: [] },
      },
      production: {
        documentLanguage: plan.documentLanguage,
        methodology: node.methodology,
      },
    };
    lessonFiles.set(path.join(lessonFolder, 'lesson.yaml'), YAML.stringify(lessonConfig, { lineWidth: 0 }));
    lessonAssignments.push({
      id,
      slug: node.slug,
      title: node.title,
      path: pkg + '/data/lessons/' + id.at(-1) + '/' + id + '/lesson.yaml',
    });
  }
  return { folder: path.join(root, coursePath), files, lessonFiles, lessonAssignments, technical };
}
function artifactEntries(artifacts) {
  return [
    ...[...artifacts.files].map(([name, content]) => [path.join(artifacts.folder, name), content]),
    ...artifacts.lessonFiles,
  ];
}
function checkArtifacts(artifacts, mode) {
  const entries = artifactEntries(artifacts);
  if (entries.length > 2500) fail('too many generated files');
  const targets = new Set();
  for (const [destination, content] of entries) {
    assertPath(destination);
    if (targets.has(destination)) fail('duplicated artifact destination ' + destination);
    targets.add(destination);
    if (destination.endsWith('/lesson.yaml')) {
      const directory = path.dirname(destination);
      if (fs.existsSync(directory) && !fs.existsSync(destination) && fs.readdirSync(directory).length)
        fail('Lesson UUID destination already contains unrelated authored files: ' + directory);
    }
    if (fs.existsSync(destination)) {
      if (fs.readFileSync(destination, 'utf8') !== content)
        fail('existing authored file differs; refusing overwrite: ' + destination);
    } else if (mode !== '--write') fail('missing materialized source: ' + destination);
    if (destination.endsWith('.ts')) {
      const parsed = ts.createSourceFile(destination, content, ts.ScriptTarget.Latest, true);
      if (parsed.parseDiagnostics.length) fail('generated TypeScript syntax invalid: ' + destination);
    }
  }
}
function writeArtifacts(artifacts) {
  // Preflight all targets before the first write. A repeat after any partial
  // failure deterministically derives the same identities and validates bytes.
  for (const [filename, content] of artifactEntries(artifacts)) {
    if (fs.existsSync(filename)) continue;
    assertPath(filename);
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, content, { flag: 'wx' });
  }
}
export function parseArgs(argv) {
  const opts = {};
  for (let i = 0; i < argv.length; i++) {
    const key = argv[i],
      value = argv[i + 1];
    if (['--package', '--course'].includes(key)) {
      if (opts[key] || !value) fail('duplicate/missing option ' + key);
      opts[key] = value;
      i++;
    } else if (['--write', '--check', '--finalize'].includes(key)) {
      if (opts.action) fail('choose exactly one mode');
      opts.action = key;
    } else if (key === '--preserve-config') {
      if (opts.preserveConfig) fail('duplicate option ' + key);
      opts.preserveConfig = true;
    } else fail('unknown option ' + key);
  }
  if (!PACKAGE.test(opts['--package'] ?? '') || !UUID.test(opts['--course'] ?? '') || !opts.action)
    fail('usage: --package content/<book> --course <uuid> --write|--check|--finalize [--preserve-config]');
  if (opts.preserveConfig && opts.action !== '--finalize') fail('--preserve-config is only valid with --finalize');
  return { pkg: opts['--package'], id: opts['--course'], mode: opts.action, preserveConfig: !!opts.preserveConfig };
}
export function materialize(argv, root = rootDefault) {
  const { pkg, id, mode, preserveConfig } = parseArgs(argv);
  const folder = path.join(root, pkg, 'data/courses', id.at(-1), id);
  const source = path.join(folder, 'course.yaml');
  assertPath(source);
  if (!fs.existsSync(source)) fail('missing approved temporary course.yaml: ' + source);
  if (fs.statSync(source).size > 2 * 1024 * 1024) fail('course.yaml exceeds 2MiB');
  const plan = parseYaml(fs.readFileSync(source, 'utf8'));
  if (plan.id !== id) fail('Course UUID in plan does not match canonical folder');
  const lessonIndex = buildLessonIndex(root, pkg);
  const artifacts = planArtifacts(plan, pkg, root, lessonIndex);
  checkArtifacts(artifacts, mode);
  if (mode === '--write') writeArtifacts(artifacts);
  else if (mode === '--finalize' && !preserveConfig) {
    // Only after a separate successful check/commit; Git retains the plan history.
    fs.unlinkSync(source);
  }
  console.log(
    mode +
      ' Course ' +
      id +
      ': ' +
      (artifacts.files.size + artifacts.lessonFiles.size) +
      ' verified source artifacts; no config.yaml',
  );
  return { skipped: false, artifacts };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    materialize(process.argv.slice(2));
  } catch (error) {
    console.error(String(error.message ?? error));
    process.exitCode = 1;
  }
}
