#!/usr/bin/env node
/**
 * Read-only, statically parsed Skill ID -> implemented Lessons Markdown lookup.
 *
 * node shared/engine/scripts/generateLessonsBySkill/generate-lessons-by-skill.mjs --skill <uuid> --stdout
 * node shared/engine/scripts/generateLessonsBySkill/generate-lessons-by-skill.mjs --output <directory>
 *
 * Uses the same candidate index as /get lesson. Editorial-only YAML drafts are
 * intentionally excluded from this historical "implemented Lessons" report.
 * Never execute authored TypeScript or YAML to build the index.
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { buildLessonIndex, UUID, PACKAGE } from './lesson-index.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const link = file => '../../' + file.split('/').map(encodeURIComponent).join('/');

/** Legacy Skill-index API: retain existing call sites and Markdown output. */
export function buildIndex(root = repoRoot, selectedPackage) {
  const result = buildLessonIndex(root, selectedPackage);
  const index = new Map();
  for (const item of result.candidates.filter(x => x.status === 'implemented')) {
    for (const skill of item.skills) {
      if (!index.has(skill))
        index.set(skill, { skill: result.skillDefinitions.get(item.package + ':' + skill) ?? null, lessons: [] });
      index.get(skill).lessons.push(item);
    }
  }
  return {
    index,
    failures: result.diagnostics.map(d => ({
      lessonId: d.entityId,
      textbook: d.package.split('/')[1],
      file: d.file,
      error: d.reason,
    })),
    lessonCount: result.scanned.implemented,
  };
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
  for (const item of lessons) {
    lines.push(
      '## ' + (item.title ?? item.slug ?? item.lessonId),
      '',
      '- Lesson ID: ' + String.fromCharCode(96) + item.lessonId + String.fromCharCode(96),
      '- Textbook: ' + String.fromCharCode(96) + item.package + String.fromCharCode(96),
      '- Lesson data: [' + path.posix.basename(item.source) + '](' + link(item.source) + ')',
      '- Skills: ' + item.skills.map(id => String.fromCharCode(96) + id + String.fromCharCode(96)).join(', '),
      '- Methodology: ' +
        (item.methodology
          ? '[' + path.posix.basename(item.methodology) + '](' + link(item.methodology) + ')'
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
      const value = args[++i];
      if (!value || value.startsWith('--')) throw Error('Missing value for ' + arg);
      if (arg === '--skill') {
        if (!UUID.test(value)) throw Error('Invalid Skill UUID ' + value);
        options.skills.push(value.toLowerCase());
      } else options[arg.slice(2)] = value;
    } else throw Error('Unknown argument: ' + arg);
  }
  if (options.package && !PACKAGE.test(options.package)) throw Error('Invalid textbook package');
  if (options.stdout === Boolean(options.output)) throw Error('Choose exactly one of --stdout and --output');
  if (options.stdout && options.skills.length !== 1) throw Error('--stdout requires exactly one --skill');
  if (options.skills.length !== new Set(options.skills).size) throw Error('Duplicate Skill ID');
  return options;
}

export function generate({ root = repoRoot, packagePath, skillIds = [], output }) {
  const { index, failures, lessonCount } = buildIndex(root, packagePath);
  const requested = skillIds.length ? skillIds : [...index.keys()];
  const generated = [];
  for (const id of requested.sort()) {
    if (!UUID.test(id)) throw Error('Invalid Skill UUID ' + id);
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
    const result = generate({ packagePath: options.package, skillIds: options.skills, output: options.output });
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
