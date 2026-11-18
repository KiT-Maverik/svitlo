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
import { renderCourseSource } from '../courseBuilder/courseBuilder.mjs';

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
    if (fs.existsSync(cursor) && fs.lstatSync(cursor).isSymbolicLink()) fail('symlink path refused: ' + cursor);
  }
}
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
  const competencies = (name, data) => {
    if (!data) return;
    lines.push('## ' + name, '');
    for (const k of ['skills', 'skillGroups', 'skillDomains', 'courses']) {
      if (data[k]?.length) lines.push('- ' + k + ': ' + data[k].join(', '));
    }
    if (data.explanation) lines.push('', data.explanation);
    lines.push('');
  };
  competencies('Learning outcomes', plan.outcomes);
  competencies('Prerequisites', plan.prerequisites);
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
  function visit(collection, location) {
    if (!collection) return;
    for (const key of collection.order) {
      const node = collection.items[key];
      if (node.type === 'lesson') {
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
        for (const k of ['depth', 'sequenceReason', 'matchingRationale'])
          if (node[k]) lines.push(k + ': ' + node[k], '');
      } else if (node.type === 'episode') {
        lines.push('## Episode: ' + node.title, '', 'UUID: ' + node.id, '',
          'Placement: ' + [...location, key].join(' / '), '', node.methodology ?? 'Episode content requires authoring review', '');
      } else {
        lines.push(
          '## ' + (node.type === 'module' ? 'Module' : 'Chapter') + ': ' + node.title,
          '',
          'UUID: ' + node.id,
          '',
          'Placement: ' + [...location, key].join(' / '),
          '',
          node.methodology,
          '',
        );
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
    .digest().subarray(0, 16);
  bytes[6] = (bytes[6] & 0x0f) | 0x50;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const h = bytes.toString('hex');
  return h.slice(0, 8) + '-' + h.slice(8, 12) + '-' + h.slice(12, 16) + '-' +
    h.slice(16, 20) + '-' + h.slice(20);
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
  const moduleSlugs = new Set(), chapterSlugs = new Set(), episodeSlugs = new Set();
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
      const group = child.type === 'module' ? moduleSlugs : child.type === 'chapter' ? chapterSlugs : episodeSlugs;
      if (group.has(slug)) fail('duplicate ' + child.type + ' source filename slug ' + slug);
      group.add(slug);
      if (child.type === 'episode') {
        const config = {
          id: child.id, type: 'episode', slug,
          params: { ...child.params, languages: child.params?.languages ?? [plan.documentLanguage] },
          locale: { title: child.locale?.title ?? { [plan.documentLanguage]: child.title } },
          section: child.section ?? { items: {}, order: [] },
          ...(child.events ? { events: child.events } : {}),
        };
        items[slug] = { config };
        continue;
      }
      const config = {
        type: child.type, id: child.id, slug, params: {},
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
  return JSON.stringify(value, null, 2)
    .split('\n')
    .map((line, index) => (index ? '  '.repeat(indentation) + line : line))
    .join('\n');
}
function symbolOf(node) {
  const suffix = { course: 'Course', module: 'Module', chapter: 'Chapter', episode: 'Episode' }[node.type];
  if (!suffix || !SLUG.test(node.slug ?? '')) fail('Unsupported modular entity');
  return node.slug + '_' + suffix;
}
function relativeImport(from, to) {
  let relative = path.posix.relative(path.posix.dirname(from), to.replace(/\.tsx?$/, ''));
  if (!relative.startsWith('.')) relative = './' + relative;
  return relative;
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
/** Generate Course-owned files; no standalone Lesson definition is emitted. */
/**
 * Reuse the typed nested Config renderer for authored Episode Sections/blocks.
 * Extract only the Episode expression; never emit a second Course declaration.
 */
function renderEpisodeDraft(episode, language, courseId) {
  const wrapper = {
    type: 'course', id: courseId, slug: 'episodeScaffold', documentLanguage: language,
    params: { languages: [language] },
    locale: { title: { [language]: 'Episode draft' }, description: { [language]: 'Draft' } },
    content: { items: { [episode.slug]: episode }, order: [episode.slug] },
  };
  const rendered = renderCourseSource(wrapper);
  const ast = ts.createSourceFile('episode-scaffold.ts', rendered, ts.ScriptTarget.Latest, true);
  if (ast.parseDiagnostics.length) fail('Course Builder produced invalid Episode draft syntax');
  const calls = [];
  const visit = node => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'defineEpisode')
      calls.push(node);
    ts.forEachChild(node, visit);
  };
  visit(ast);
  if (calls.length !== 1) fail('Expected exactly one generated Episode expression for ' + episode.slug);
  const expression = calls[0].getText(ast);
  const factoryNames = [...new Set(
    [...expression.matchAll(/\bdefine[A-Z][A-Za-z0-9_]*(?=\s*\()/g)].map(m => m[0]),
  )].sort();
  return HEADER + 'import { ' + factoryNames.join(', ') + ' } from "@svitlo/engine/build";\n\n' +
    'export const ' + symbolOf(episode) + ' = ' + expression + ';\n';
}
export function renderModularCourse(technical, pkg, resolveLesson = () => null) {
  const { config } = technical;
  const rootFile = 'index.ts';
  const nodes = [{ node: config, file: rootFile }];
  const paths = new Map();
  function register(collection) {
    for (const key of collection?.order ?? []) {
      const child = collection.items[key]?.config;
      if (!record(child)) fail('Malformed technical child ' + key);
      if (child.type === 'module' || child.type === 'chapter' || child.type === 'episode') {
        const filename = (child.type === 'module' ? 'modules/' : child.type === 'chapter' ? 'chapters/' : 'episodes/') + child.slug + '.ts';
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
    if (node.type === 'episode') {
      files.set(file, renderEpisodeDraft(node, technical.production.documentLanguage, config.id));
      continue;
    }
    const imports = new Map(),
      unresolved = [];
    const addImport = (symbol, target) => {
      const specifier = relativeImport(file, target);
      const key = specifier + ':' + symbol;
      if (!imports.has(key)) imports.set(key, { symbol, specifier });
      return symbol;
    };
    function expression(child) {
      if (child.type === 'module' || child.type === 'chapter' || child.type === 'episode') {
        const target = (child.type === 'module' ? 'modules/' : child.type === 'chapter' ? 'chapters/' : 'episodes/') + child.slug + '.ts';
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
        const children = Object.entries(value.items).map(
          ([slug, entry]) => '    ' + JSON.stringify(slug) + ': ' + expression(entry.config),
        );
        const collection =
          '{\n    items: {\n' +
          children.join(',\n') +
          (children.length ? '\n' : '') +
          '    },\n    order: ' +
          tsLiteral(value.order, 2) +
          '\n  }';
        parts.push('  content: ' + collection);
      }
    }
    const header = [
      HEADER.trimEnd(),
      'import { define' + node.type[0].toUpperCase() + node.type.slice(1) + ' } from "@svitlo/engine/build";',
      ...[...imports.values()].map(
        x =>
          'import { ' + x.symbol + (x.alias ? ' as ' + x.alias : '') + ' } from ' + JSON.stringify(x.specifier) + ';',
      ),
      '',
      ...unresolved.map(
        x =>
          '// TODO: Resolve standalone Lesson UUID ' +
          JSON.stringify(x.lessonId) +
          ' and replace ' +
          x.alias +
          '; never define Lesson inside Course.',
      ),
      ...(unresolved.length ? [''] : []),
      'export const ' +
        symbolOf(node) +
        ' = define' +
        node.type[0].toUpperCase() +
        node.type.slice(1) +
        '({\n' +
        parts.join(',\n') +
        '\n});',
      '',
    ];
    files.set(file, header.join('\n'));
  }
  for (const family of ['module', 'chapter', 'episode']) {
    const entries = nodes.filter(x => x.node.type === family).sort((a, b) => a.file.localeCompare(b.file));
    if (entries.length)
      files.set(
        (family === 'module' ? 'modules/' : family === 'chapter' ? 'chapters/' : 'episodes/') + 'index.ts',
        entries.map(x => 'export { ' + symbolOf(x.node) + ' } from "./' + x.node.slug + '";').join('\n') + '\n',
      );
  }
  files.set('review.ts',
    '// Course review evidence is authored independently after generated Props are reviewed.\n' +
    '// TODO(review): Record independently verified Course and locale review decisions here.\n' +
    'export const courseReview = { methodology: null, experience: null, translation: null } as const;\n');
  files.set('constants.ts',
    '// Course identity and source locale; all other locales require real translation.\n' +
    'export const courseId = ' + JSON.stringify(config.id) + ' as const;\n' +
    'export const sourceLanguage = ' + JSON.stringify(technical.production.documentLanguage) + ' as const;\n');
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
  const drafts = renderModularCourse(technical, pkg, lookup);
  const files = new Map([
    ['methodology.md', technical.production.methodology],
    ...drafts,
  ]);
  const lessonFiles = new Map();
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
  }
  return { folder: path.join(root, coursePath), files, lessonFiles, technical };
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
    } else fail('unknown option ' + key);
  }
  if (!PACKAGE.test(opts['--package'] ?? '') || !UUID.test(opts['--course'] ?? '') || !opts.action)
    fail('usage: --package content/<book> --course <uuid> --write|--check|--finalize');
  return { pkg: opts['--package'], id: opts['--course'], mode: opts.action };
}
export function materialize(argv, root = rootDefault) {
  const { pkg, id, mode } = parseArgs(argv);
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
  else if (mode === '--finalize') {
    // Only after a separate successful check/commit; Git retains the plan history.
    fs.unlinkSync(source);
  }
  console.log(mode + ' Course ' + id + ': ' + (artifacts.files.size + artifacts.lessonFiles.size) + ' verified source artifacts; no config.yaml');
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
