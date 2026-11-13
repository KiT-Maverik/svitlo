#!/usr/bin/env node
/**
 * Read-only, statically parsed Skill ID -> implemented Lessons index.
 *
 * node scripts/generate-lessons-by-skill.mjs --skill <skill-uuid> --stdout
 * node scripts/generate-lessons-by-skill.mjs --package content/math \
 *   --output .agent-ci-artifacts/lessons-by-skill
 *
 * Never execute Lesson or Skill authoring code to build a search index.
 * Files in output are flat: <skill-uuid>.md (a Lesson may occur in many files).
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { discoverLessons } from '../generateLessonReviewArtifacts/generate-lesson-review-artifacts.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const PACKAGE = /^content\/[a-z][a-z0-9-]*$/;
const isUuid = value => typeof value === 'string' && UUID.test(value);
const normal = value => value.toLowerCase();

function unwrap(node) {
  while (node && (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node))) {
    node = node.expression;
  }
  return node;
}
function member(object, key) {
  return object.properties.find(
    p => ts.isPropertyAssignment(p) && (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name)) && p.name.text === key,
  );
}
function literal(node) {
  node = unwrap(node);
  return node && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) ? node.text : null;
}
function source(file) {
  return ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
function exportedDeclarations(sf) {
  const vars = new Map();
  for (const statement of sf.statements) {
    if (!ts.isVariableStatement(statement) || !statement.modifiers?.some(x => x.kind === ts.SyntaxKind.ExportKeyword))
      continue;
    for (const decl of statement.declarationList.declarations) {
      if (ts.isIdentifier(decl.name)) vars.set(decl.name.text, decl.initializer);
    }
  }
  return vars;
}
function parseSkillDeclaration(initializer) {
  const expr = unwrap(initializer);
  if (
    !expr ||
    !ts.isCallExpression(expr) ||
    !ts.isIdentifier(expr.expression) ||
    expr.expression.text !== 'defineSkill'
  )
    return null;
  const object = unwrap(expr.arguments[0]);
  if (!object || !ts.isObjectLiteralExpression(object)) throw new Error('Invalid defineSkill call');
  const id = literal(member(object, 'id')?.initializer);
  const names = unwrap(member(object, 'name')?.initializer);
  const name = names && ts.isObjectLiteralExpression(names) ? literal(member(names, 'en')?.initializer) : null;
  if (!isUuid(id) || !name) throw new Error('Skill missing a literal UUID or English name');
  return { id: normal(id), name };
}
function walkSkillFiles(directory, output = []) {
  if (!fs.existsSync(directory)) return output;
  for (const item of fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const filename = path.join(directory, item.name);
    if (item.isSymbolicLink()) throw new Error('Symlink in Skill taxonomy: ' + filename);
    if (item.isDirectory()) walkSkillFiles(filename, output);
    else if (item.isFile() && item.name.endsWith('.data.ts')) output.push(filename);
  }
  return output;
}
function skillCatalogue(root, textbook) {
  const byId = new Map();
  const bySymbol = new Map();
  const directory = path.join(root, 'content', textbook, 'data/skills');
  for (const file of walkSkillFiles(directory)) {
    for (const [symbol, value] of exportedDeclarations(source(file))) {
      const parsed = parseSkillDeclaration(value);
      if (!parsed) continue;
      if (byId.has(parsed.id) || bySymbol.has(symbol))
        throw new Error('Duplicate Skill UUID or exported symbol: ' + parsed.id + ' / ' + symbol);
      const skill = { ...parsed, source: path.relative(root, file).split(path.sep).join('/') };
      byId.set(skill.id, skill);
      bySymbol.set(symbol, skill);
    }
  }
  return { byId, bySymbol };
}
function lessonConfiguration(sf, expectedId) {
  let found = null;
  const exports = exportedDeclarations(sf);
  function visit(node) {
    if (ts.isObjectLiteralExpression(node) && literal(member(node, 'id')?.initializer)?.toLowerCase() === expectedId) {
      if (found) throw new Error('Ambiguous Lesson configuration for ' + expectedId);
      found = node;
    }
    ts.forEachChild(node, visit);
  }
  for (const initializer of exports.values()) if (initializer) visit(initializer);
  if (!found) throw new Error('No Lesson object with matching static ID ' + expectedId);
  return {
    object: found,
    exports: [...exports].filter(([, init]) => init && includesNode(init, found)).map(([name]) => name),
  };
}
function includesNode(parent, child) {
  if (parent === child) return true;
  let result = false;
  ts.forEachChild(parent, node => {
    if (!result && includesNode(node, child)) result = true;
  });
  return result;
}
function imports(sf) {
  const alias = new Map();
  for (const stmt of sf.statements) {
    if (
      !ts.isImportDeclaration(stmt) ||
      !stmt.importClause?.namedBindings ||
      !ts.isNamedImports(stmt.importClause.namedBindings)
    )
      continue;
    for (const item of stmt.importClause.namedBindings.elements) {
      alias.set(item.name.text, (item.propertyName ?? item.name).text);
    }
  }
  return alias;
}
function titleFrom(node) {
  const value = unwrap(node);
  if (!value) return null;
  if (ts.isStringLiteral(value)) return value.text;
  if (ts.isObjectLiteralExpression(value)) return literal(member(value, 'en')?.initializer);
  return null;
}
function lessonData(root, lesson, catalogue, knownLessons, visiting = new Set()) {
  const cacheKey = lesson.source;
  if (lesson.cached) return lesson.cached;
  if (visiting.has(cacheKey)) throw new Error('Cyclic Lesson data spread: ' + cacheKey);
  visiting.add(cacheKey);
  try {
    const sf = source(cacheKey);
    const conf = lessonConfiguration(sf, lesson.id).object;
    const aliases = imports(sf);
    let ids = null,
      title = null,
      slug = null;
    for (const property of conf.properties) {
      if (ts.isSpreadAssignment(property)) {
        if (!ts.isIdentifier(property.expression)) throw new Error('Non-static Lesson spread in ' + cacheKey);
        const symbol = aliases.get(property.expression.text) ?? property.expression.text;
        const base = knownLessons.get(symbol);
        if (!base || base === lesson) throw new Error('Unresolved Lesson spread ' + symbol + ' in ' + cacheKey);
        const inherited = lessonData(root, base, catalogue, knownLessons, visiting);
        ids = [...inherited.skills];
        title = inherited.title;
        slug = inherited.slug;
      } else if (ts.isPropertyAssignment(property)) {
        const name = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name) ? property.name.text : null;
        if (name === 'skills') {
          const value = unwrap(property.initializer);
          if (!value || !ts.isArrayLiteralExpression(value)) throw new Error('Non-static skills array: ' + cacheKey);
          ids = value.elements.map(element => {
            const node = unwrap(element);
            if (ts.isStringLiteral(node)) {
              const id = normal(node.text);
              if (!catalogue.byId.has(id)) throw new Error('Unknown Skill UUID ' + id + ' in ' + cacheKey);
              return id;
            }
            if (
              ts.isPropertyAccessExpression(node) &&
              node.name.text === 'id' &&
              ts.isPropertyAccessExpression(node.expression) &&
              node.expression.name.text === 'base' &&
              ts.isPropertyAccessExpression(node.expression.expression) &&
              node.expression.expression.name.text === 'config' &&
              ts.isIdentifier(node.expression.expression.expression)
            ) {
              const symbol = node.expression.expression.expression.text;
              const key = aliases.get(symbol) ?? symbol;
              const skill = catalogue.bySymbol.get(key);
              if (!skill) throw new Error('Unknown Skill reference ' + key + '.config.base.id in ' + cacheKey);
              return skill.id;
            }
            throw new Error('Unsupported dynamic Skill expression in ' + cacheKey);
          });
        }
        if (name === 'title') title = titleFrom(property.initializer);
        if (name === 'slug') slug = literal(property.initializer);
      }
    }
    if (!ids?.length || new Set(ids).size !== ids.length)
      throw new Error('Lesson has no unique, statically resolvable Skill IDs: ' + cacheKey);
    lesson.cached = { skills: ids, title, slug };
    return lesson.cached;
  } finally {
    visiting.delete(cacheKey);
  }
}

/** Return an ID-keyed index plus explicit failures for unsupported source expressions. */
export function buildIndex(root = repoRoot, selectedPackage) {
  if (selectedPackage && !PACKAGE.test(selectedPackage)) throw new Error('Invalid textbook package');
  const lessons = discoverLessons(root).filter(x => !selectedPackage || x.package === selectedPackage);
  const result = new Map();
  const failures = [];
  const byTextbook = Map.groupBy(lessons, x => x.textbook);
  for (const [textbook, entries] of byTextbook) {
    const catalogue = skillCatalogue(root, textbook);
    const known = new Map();
    for (const lesson of entries) {
      try {
        for (const name of lessonConfiguration(source(lesson.source), lesson.id).exports) {
          if (known.has(name)) throw new Error('Ambiguous Lesson export symbol ' + name);
          known.set(name, lesson);
        }
      } catch (error) {
        failures.push({ lessonId: lesson.id, textbook, error: String(error.message) });
      }
    }
    for (const lesson of entries) {
      try {
        const data = lessonData(root, lesson, catalogue, known);
        const sourcePath = path.relative(root, lesson.source).split(path.sep).join('/');
        const baseDir = path.dirname(lesson.source);
        const briefPath = ['methodology.md', 'methodologist-brief.md'].find(file =>
          fs.existsSync(path.join(baseDir, file)),
        );
        const item = {
          lessonId: lesson.id,
          textbook,
          source: sourcePath,
          title: data.title,
          slug: data.slug,
          skills: data.skills,
          methodology: briefPath ? path.relative(root, path.join(baseDir, briefPath)).split(path.sep).join('/') : null,
        };
        for (const id of data.skills) {
          if (!result.has(id)) result.set(id, { skill: catalogue.byId.get(id), lessons: [] });
          result.get(id).lessons.push(item);
        }
      } catch (error) {
        failures.push({ lessonId: lesson.id, textbook, error: String(error.message) });
      }
    }
  }
  for (const entry of result.values()) {
    entry.lessons.sort((a, b) => a.textbook.localeCompare(b.textbook) || a.lessonId.localeCompare(b.lessonId));
  }
  return { index: result, failures, lessonCount: lessons.length };
}

function link(file) {
  return '../../' + file.split('/').map(encodeURIComponent).join('/');
}
export function renderSkillIndex(skillId, result) {
  const skill = result?.skill;
  const lessons = result?.lessons ?? [];
  const lines = [
    '<!-- GENERATED FROM LESSON CODE; DO NOT EDIT. -->',
    '# Lessons by Skill ID: ' + skillId,
    '',
    ...(skill
      ? [
          'Skill: ' + skill.name,
          'Taxonomy source: [' + path.posix.basename(skill.source) + '](' + link(skill.source) + ')',
          '',
        ]
      : []),
    'Implemented Lesson candidates: ' + lessons.length,
    '',
  ];
  for (const lesson of lessons) {
    lines.push(
      '## ' + (lesson.title ?? lesson.slug ?? lesson.lessonId),
      '',
      '- Lesson ID: `' + lesson.lessonId + '`',
      '- Textbook: `content/' + lesson.textbook + '`',
      '- Lesson data: [' + path.posix.basename(lesson.source) + '](' + link(lesson.source) + ')',
      '- Skills: ' + lesson.skills.map(id => '`' + id + '`').join(', '),
      '- Methodology: ' +
        (lesson.methodology
          ? '[' + path.posix.basename(lesson.methodology) + '](' + link(lesson.methodology) + ')'
          : 'Not found'),
      '',
    );
  }
  if (!lessons.length) lines.push('No implemented Lesson in this index references this Skill ID.', '');
  lines.push(
    '> Search candidates only; matching Skill IDs does not prove audience, depth, prerequisite, language or pedagogical suitability.',
    '',
  );
  return lines.join('\n');
}

export function parseArguments(args) {
  const options = { skills: [] };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--stdout') options.stdout = true;
    else if (['--package', '--skill', '--output'].includes(arg)) {
      const val = args[++i];
      if (!val || val.startsWith('--')) throw new Error('Missing value for ' + arg);
      if (arg === '--skill') {
        if (!isUuid(val)) throw new Error('Invalid Skill UUID ' + val);
        options.skills.push(normal(val));
      } else options[arg.slice(2)] = val;
    } else throw new Error('Unknown argument: ' + arg);
  }
  if (options.package && !PACKAGE.test(options.package)) throw new Error('Invalid textbook package');
  if (options.stdout === Boolean(options.output)) throw new Error('Choose exactly one of --stdout and --output');
  if (options.stdout && options.skills.length !== 1) throw new Error('--stdout requires exactly one --skill');
  if (options.skills.length !== new Set(options.skills).size) throw new Error('Duplicate Skill ID');
  return options;
}

export function generate({ root = repoRoot, packagePath, skillIds = [], output }) {
  const { index, failures, lessonCount } = buildIndex(root, packagePath);
  const requested = skillIds.length ? skillIds : [...index.keys()];
  const generated = [];
  for (const id of requested.sort()) {
    if (!isUuid(id)) throw new Error('Invalid Skill UUID ' + id);
    const markdown = renderSkillIndex(id, index.get(id));
    if (output) {
      const destination = path.join(output, id + '.md');
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.writeFileSync(destination, markdown, 'utf8');
    }
    generated.push({ skillId: id, lessons: index.get(id)?.lessons.length ?? 0, markdown });
  }
  return { generated, failures, lessonCount };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const options = parseArguments(process.argv.slice(2));
    const result = generate({
      packagePath: options.package,
      skillIds: options.skills,
      output: options.output,
    });
    for (const failure of result.failures) process.stderr.write('Warning: ' + JSON.stringify(failure) + '\n');
    if (options.stdout) process.stdout.write(result.generated[0].markdown);
    else
      process.stderr.write(
        'Generated ' + result.generated.length + ' Skill lookup files from ' + result.lessonCount + ' Lessons.\n',
      );
    if (result.failures.length) process.exitCode = 1;
  } catch (error) {
    process.stderr.write('Lesson Skill index failed: ' + String(error.message) + '\n');
    process.exitCode = 1;
  }
}
