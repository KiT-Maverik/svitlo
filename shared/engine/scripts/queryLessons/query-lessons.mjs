#!/usr/bin/env node
/**
 * Read-only query for implemented and editorial-draft Lessons by immutable UUID
 * or statically verified Skill UUIDs. Does not execute authored source.
 *
 * node shared/engine/scripts/queryLessons/query-lessons.mjs --by skill --skill UUID --match all --format json --stdout
 * node shared/engine/scripts/queryLessons/query-lessons.mjs --by id --lesson UUID --format json --stdout
 * node shared/engine/scripts/queryLessons/query-lessons.mjs --comment "/get lesson by id UUID" --format json --stdout
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { searchLessons, UUID, PACKAGE } from '../generateLessonsBySkill/lesson-index.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
export const USAGE = [
  'Usage:',
  '/get lesson by id <lesson-uuid> [--package content/<book>]',
  '/get lesson by skill <skill-uuid> [<skill-uuid> ...] [--match any|all] [--package content/<book>]',
].join('\n');

function fail(message) {
  throw Error(message + '\n' + USAGE);
}
function skillId(value) {
  if (!UUID.test(value || '')) fail('Expected a canonical UUID');
  return value.toLowerCase();
}
function checkPackage(value) {
  if (!PACKAGE.test(value || '')) fail('Invalid --package (expected content/<book>)');
  return value;
}

/** Strict PR-comment grammar; reject multiline or shell-shaped commands. */
export function parseComment(comment) {
  if (typeof comment !== 'string' || comment.length > 2500 || /[\r\n\0]/.test(comment))
    fail('Command must occupy one line');
  const tokens = comment.trim().split(/[ \t]+/);
  if (tokens[0] !== '/get' || tokens[1] !== 'lesson' || tokens[2] !== 'by') fail('Unsupported command');
  const by = tokens[3];
  if (!['id', 'skill'].includes(by)) fail('Unsupported Lesson query field');
  const values = [];
  const flags = new Map();
  for (let i = 4; i < tokens.length; i++) {
    const item = tokens[i];
    if (item.startsWith('--')) {
      if (!['--match', '--package'].includes(item) || flags.has(item)) fail('Unsupported or repeated flag ' + item);
      const value = tokens[++i];
      if (!value || value.startsWith('--')) fail('Missing value for ' + item);
      flags.set(item, value);
    } else {
      if (flags.size) fail('UUIDs must precede flags');
      values.push(item);
    }
  }
  if (by === 'id') {
    if (values.length !== 1 || flags.has('--match')) fail('Lesson ID lookup requires exactly one UUID and no --match');
    return {
      by,
      lessonId: skillId(values[0]),
      package: flags.has('--package') ? checkPackage(flags.get('--package')) : null,
    };
  }
  if (!values.length || values.length > 25) fail('Skill lookup requires between 1 and 25 UUIDs');
  const skills = values.map(skillId);
  if (new Set(skills).size !== skills.length) fail('Duplicate Skill UUID');
  const match = flags.get('--match') ?? 'any';
  if (!['any', 'all'].includes(match)) fail('Invalid --match (expected any or all)');
  return { by, skills, match, package: flags.has('--package') ? checkPackage(flags.get('--package')) : null };
}

export function parseCli(args) {
  if (args[0] === '--comment') {
    if (args.length < 2) fail('Missing --comment value');
    const query = parseComment(args[1]);
    const trailing = args.slice(2);
    const options = parseOutputOptions(trailing);
    return { query, ...options };
  }
  const options = { skills: [] };
  const unique = new Set();
  for (let i = 0; i < args.length; i++) {
    const token = args[i];
    if (token === '--stdout') {
      if (unique.has(token)) fail('Repeated --stdout');
      unique.add(token);
      options.stdout = true;
    } else if (
      ['--by', '--lesson', '--skill', '--match', '--package', '--format', '--source-sha', '--output'].includes(token)
    ) {
      const value = args[++i];
      if (!value || value.startsWith('--')) fail('Missing value for ' + token);
      if (token !== '--skill' && unique.has(token)) fail('Repeated ' + token);
      unique.add(token);
      if (token === '--skill') options.skills.push(value);
      else options[token.slice(2).replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = value;
    } else fail('Unknown flag ' + token);
  }
  let query;
  if (options.by === 'id') {
    if (options.skills.length || options.match || !options.lesson) fail('Expected --by id --lesson UUID');
    query = {
      by: 'id',
      lessonId: skillId(options.lesson),
      package: options.package ? checkPackage(options.package) : null,
    };
  } else if (options.by === 'skill') {
    if (options.lesson || !options.skills.length || options.skills.length > 25) fail('Expected 1–25 --skill UUIDs');
    const skills = options.skills.map(skillId);
    if (new Set(skills).size !== skills.length) fail('Duplicate Skill UUID');
    const match = options.match ?? 'any';
    if (!['any', 'all'].includes(match)) fail('Invalid --match');
    query = { by: 'skill', skills, match, package: options.package ? checkPackage(options.package) : null };
  } else fail('Expected --by id or --by skill');
  return { query, ...parseOutputOptions(args, options) };
}
function parseOutputOptions(args, existing = null) {
  const values = existing ?? {};
  if (!existing) {
    for (let i = 0; i < args.length; i++) {
      const token = args[i];
      if (token === '--stdout') {
        if (values.stdout) fail('Repeated --stdout');
        values.stdout = true;
      } else if (['--format', '--output', '--source-sha'].includes(token)) {
        const value = args[++i];
        if (!value || value.startsWith('--') || values[token.slice(2).replace(/-([a-z])/g, (_, c) => c.toUpperCase())])
          fail('Missing or repeated ' + token);
        values[token.slice(2).replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = value;
      } else fail('Unknown output flag ' + token);
    }
  }
  if ((values.format ?? 'json') !== 'json') fail('Only --format json is supported');
  if (values.sourceSha && !/^[0-9a-f]{40}$/.test(values.sourceSha)) fail('Expected immutable 40-character Git SHA');
  if (values.stdout && values.output) fail('Choose one of --stdout and --output');
  if (!values.stdout && !values.output) fail('Choose --stdout or --output');
  return {
    format: 'json',
    stdout: Boolean(values.stdout),
    output: values.output ?? null,
    sourceSha: values.sourceSha ?? null,
  };
}

const safeText = value =>
  String(value ?? '')
    .slice(0, 180)
    .replace(/[\x00-\x1f\x7f]/g, ' ')
    .replace(/\\/g, '\\\\')
    .replace(/([*_[\]()#+!|<>\x60])/g, '\\$1');
export function sourceLink(sha, file) {
  if (
    !/^[a-f0-9]{40}$/.test(sha ?? '') ||
    !/^content\/[a-z][a-z0-9-]*\/data\/lessons\/[0-9a-f]\/[a-f0-9-]{36}\//.test(file || '') ||
    file.split('/').some(x => x === '.' || x === '..' || !/^[a-zA-Z0-9._-]+$/.test(x))
  )
    return null;
  return 'https://github.com/KiT-Maverik/svitlo/blob/' + sha + '/' + file.split('/').map(encodeURIComponent).join('/');
}
export function renderMarkdown(result, max = 15) {
  const q = result.query;
  const description = q.by === 'id' ? 'Lesson ' + q.lessonId : 'Skills ' + q.skills.join(', ') + ' (' + q.match + ')';
  const lines = [
    '# Lesson lookup',
    '',
    'Query: ' + safeText(description),
    '',
    'Source SHA: ' + safeText(result.sourceSha ?? 'local'),
    '',
    'Verified matches: ' + result.matches.length,
    'Index complete: ' + (result.complete ? 'yes' : 'NO — partial/invalid sources were encountered'),
    '',
  ];
  for (const item of result.matches.slice(0, max)) {
    const url = sourceLink(result.sourceSha, item.source);
    const label = safeText(item.title || item.slug || item.lessonId);
    lines.push(
      '### ' + (url ? '[' + label + '](' + url + ')' : label),
      '',
      '- ID: ' + safeText(item.lessonId),
      '- Package: ' + safeText(item.package),
      '- Status: ' + safeText(item.status),
      '- Matched Skills: ' + item.matchedSkills.map(safeText).join(', '),
      '- Coverage: ' + (item.coverage ?? 'n/a'),
      '- All Skills: ' + item.skills.map(safeText).join(', '),
      '- Languages: ' + (item.languageStatus === 'verified' ? item.languages.map(safeText).join(', ') : 'unknown'),
      '',
    );
    if (item.methodology) {
      const methodUrl = sourceLink(result.sourceSha, item.methodology);
      if (methodUrl) lines.push('Methodology: [source](' + methodUrl + ')', '');
    }
    if (item.draftSource) {
      const draftUrl = sourceLink(result.sourceSha, item.draftSource);
      if (draftUrl) lines.push('Editorial draft: [YAML](' + draftUrl + ')', '');
    }
  }
  if (result.matches.length > max)
    lines.push('... ' + (result.matches.length - max) + ' more matches in JSON artifact', '');
  if (!result.matches.length)
    lines.push(
      result.complete ? 'No matching Lessons in the verified index.' : 'No verified matches; index incomplete.',
      '',
    );
  if (result.diagnostics.length) {
    lines.push('## Diagnostics (' + result.diagnostics.length + ')', '');
    for (const item of result.diagnostics.slice(0, 8))
      lines.push('- ' + safeText(item.file) + ': ' + safeText(item.reason));
    if (result.diagnostics.length > 8) lines.push('- Further diagnostics available in JSON artifact.');
    lines.push('');
  }
  lines.push(
    'Skill overlap is only a search signal; verify audience, learning depth, prerequisites and language suitability against actual sources.',
  );
  return lines.join('\n').slice(0, 12000) + '\n';
}

export function run(options, directory = root) {
  return searchLessons(directory, options.query, options.sourceSha);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const options = parseCli(process.argv.slice(2));
    const result = run(options);
    const json = JSON.stringify(result, null, 2) + '\n';
    if (options.stdout) process.stdout.write(json);
    else fs.writeFileSync(options.output, json, 'utf8');
    if (!result.complete)
      process.stderr.write('Warning: index incomplete (' + result.diagnostics.length + ' diagnostics)\n');
  } catch (error) {
    process.stderr.write('Lesson lookup failed: ' + error.message + '\n');
    process.exitCode = 1;
  }
}
