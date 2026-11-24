import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { parseArguments } from './generate-translation-review-artifacts.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const workflow = fs.readFileSync(path.join(root, '.github/workflows/agent-ci-artifacts.yml'), 'utf8');
const lesson = 'd3048d21-8690-5255-b62c-984c69ac272c';
const sourceHead = 'f'.repeat(40);

function inlineJob(stepName) {
  const section = workflow.split('      - name: ' + stepName + '\n')[1];
  assert.ok(section, 'Missing trusted step ' + stepName);
  const match = section.match(/node --input-type=module <<'NODE'\n([\s\S]*?)\n\s+NODE/);
  assert.ok(match, 'Missing inline Node runner for ' + stepName);
  return match[1].split('\n').map(line => line.replace(/^ {10}/, '')).join('\n');
}

const resolver = inlineJob('Resolve trusted PR context without checking out code');
const validator = inlineJob('Validate pinned manifest, scope, checksums and archive inventory');

function resolve({ command, inputs, access = 'write' }) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-reference-command-'));
  const isComment = command !== undefined;
  const event = isComment
    ? { issue: { number: 825, pull_request: {} }, comment: { body: command, user: { login: 'owner' } } }
    : { inputs: { pr_number: '825', ...inputs } };
  try {
    const eventFile = path.join(directory, 'event.json');
    const outputFile = path.join(directory, 'output.txt');
    fs.writeFileSync(eventFile, JSON.stringify(event));
    const fakeApi = [
      'globalThis.fetch = async url => ({',
      '  ok: true,',
      '  json: async () => String(url).endsWith("/permission")',
      '    ? { permission: ' + JSON.stringify(access) + ' }',
      '    : { state: "open", head: { sha: ' + JSON.stringify(sourceHead) + ', ref: "ci/scoped-lesson-reference",',
      '        repo: { full_name: "KiT-Maverik/svitlo" } }, base: { repo: { default_branch: "develop" } } }',
      '});',
    ].join('\n');
    const result = spawnSync(process.execPath, ['--input-type=module', '--eval', fakeApi + '\n' + resolver], {
      cwd: root,
      encoding: 'utf8',
      env: {
        ...process.env,
        GITHUB_EVENT_NAME: isComment ? 'issue_comment' : 'workflow_dispatch',
        GITHUB_EVENT_PATH: eventFile,
        GITHUB_OUTPUT: outputFile,
        GH_TOKEN: 'test-token',
        GITHUB_REPOSITORY: 'KiT-Maverik/svitlo',
      },
    });
    return {
      ...result,
      values: fs.existsSync(outputFile)
        ? Object.fromEntries(fs.readFileSync(outputFile, 'utf8').trim().split('\n').map(row => row.split('=')))
        : {},
    };
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

test('trusted comment parser and manual dispatch agree on scoped Lessons and Questions', () => {
  for (const kind of ['lessons', 'questions']) {
    for (const [suffix, locale, uuid] of [
      ['', '', ''],
      [' en', 'en', ''],
      [' ' + lesson, '', lesson],
      [' ' + lesson + ' en', 'en', lesson],
    ]) {
      const command = '/agent-artifacts generate ' + kind + ' content/playground' + suffix;
      const fromComment = resolve({ command });
      const fromManual = resolve({
        inputs: { kind, textbook: 'content/playground', lesson: uuid, locale },
      });
      assert.equal(fromComment.status, 0, command + ': ' + fromComment.stderr);
      assert.equal(fromManual.status, 0, command + ': ' + fromManual.stderr);
      assert.deepEqual(fromComment.values, fromManual.values);
      assert.equal(fromComment.values.lesson, uuid);
      assert.equal(fromComment.values.locale, locale);
      const cli = ['--kind', kind, '--package', 'content/playground'];
      if (uuid) cli.push('--lesson', uuid);
      if (locale) cli.push('--locale', locale);
      const options = parseArguments(cli);
      assert.equal(options.lesson ?? '', uuid);
      assert.equal(options.locale ?? '', locale);
    }
  }
});

test('UUID is canonicalized for comments and manual dispatch, not misinterpreted as locale', () => {
  const upper = lesson.toUpperCase();
  for (const input of [
    { command: '/agent-artifacts generate questions content/playground ' + upper + ' en' },
    { command: '/agent-artifacts generate lessons content/playground ' + upper },
    { inputs: { kind: 'questions', textbook: 'content/playground', lesson: upper, locale: 'en' } },
  ]) {
    const response = resolve(input);
    assert.equal(response.status, 0, response.stderr);
    assert.equal(response.values.lesson, lesson);
  }
  const broad = resolve({ command: '/agent-artifacts generate questions content/playground uk' });
  assert.equal(broad.status, 0, broad.stderr);
  assert.equal(broad.values.lesson, '');
  assert.equal(broad.values.locale, 'uk');
});

test('trusted resolver rejects malformed UUID, surplus args, families and invalid combinations', () => {
  const invalid = [
    '/agent-artifacts generate lessons content/playground ' + lesson.slice(0, -1) + ' en',
    '/agent-artifacts generate questions content/playground not-a-uuid en',
    '/agent-artifacts generate questions content/playground ' + lesson + ' en extra',
    '/agent-artifacts generate lessons content/playground en extra',
    '/agent-artifacts generate skills content/playground ' + lesson + ' en',
    '/agent-artifacts generate questions content/../math ' + lesson + ' en',
    '/agent-artifacts generate unsupported content/playground en',
    '/agent-artifacts generate questions',
    '/agent-artifacts generate lessons content/playground en ' + lesson,
  ];
  for (const command of invalid) {
    const result = resolve({ command });
    assert.notEqual(result.status, 0, 'Unexpectedly accepted ' + command);
  }
  for (const inputs of [
    { kind: 'questions', textbook: 'content/playground', lesson: 'bad' },
    { kind: 'courses', textbook: 'content/playground', lesson },
    { kind: 'skills', textbook: 'content/playground', lesson },
    { kind: 'questions', textbook: 'content/../math', lesson },
  ]) {
    assert.notEqual(resolve({ inputs }).status, 0, JSON.stringify(inputs));
  }
  assert.notEqual(resolve({ command: '/agent-artifacts generate questions content/playground ' + lesson, access: 'read' }).status, 0);
});

function checkArchive(kind, mutate, additionalFile = false) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-scoped-manifest-'));
  const relative = kind + '/playground/c/' + lesson + '/en.md';
  const markdown = '# Scoped lesson reference\n';
  const generated = {
    kind: kind === 'lessons' ? 'lesson' : 'question',
    textbook: 'content/playground',
    lesson: 'c/' + lesson,
    locale: 'en',
    path: relative,
    bytes: Buffer.byteLength(markdown),
    sha256: crypto.createHash('sha256').update(markdown).digest('hex'),
  };
  const manifest = {
    schemaVersion: 3,
    kind: 'pr-scoped-agent-ci-artifacts',
    sourceCommit: sourceHead,
    pr: 825,
    runId: 12345,
    scope: { kind, package: 'content/playground', locale: 'en', component: null, lesson, course: null },
    generated: [generated],
    failures: [],
    filesBytes: generated.bytes,
    status: 'complete',
  };
  try {
    const file = path.join(directory, relative);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, markdown);
    if (mutate) mutate(manifest);
    fs.writeFileSync(path.join(directory, 'manifest.json'), JSON.stringify(manifest));
    if (additionalFile) fs.writeFileSync(path.join(directory, 'unlisted.md'), 'unexpected');
    return spawnSync(process.execPath, ['--input-type=module', '--eval', validator], {
      cwd: root,
      encoding: 'utf8',
      env: {
        ...process.env,
        SVITLO_AGENT_REPORT_OUTPUT: directory,
        SVITLO_AGENT_REPORT_PR: '825',
        GITHUB_RUN_ID: '12345',
        SOURCE_HEAD_SHA: sourceHead,
        REQUEST_KIND: kind,
        REQUEST_BOOK: 'content/playground',
        REQUEST_LOCALE: 'en',
        REQUEST_COMPONENT: '',
        REQUEST_LESSON: lesson,
        REQUEST_COURSE: '',
      },
    });
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

test('trusted ZIP validation pins Lesson/Question scope, HEAD, run, hashes and inventory', () => {
  for (const kind of ['lessons', 'questions']) {
    const good = checkArchive(kind);
    assert.equal(good.status, 0, kind + ': ' + good.stderr);
    for (const [label, mutate, unlisted] of [
      ['other lesson', m => { m.generated[0].lesson = 'c/00000000-0000-4000-8000-00000000000c'; }],
      ['different textbook', m => { m.generated[0].textbook = 'content/math'; }],
      ['other locale', m => { m.generated[0].locale = 'uk'; }],
      ['wrong family', m => { m.generated[0].kind = kind === 'lessons' ? 'question' : 'lesson'; }],
      ['wrong path', m => { m.generated[0].path = 'lessons/other/en.md'; }],
      ['scope mismatch', m => { m.scope.lesson = '00000000-0000-4000-8000-00000000000c'; }],
      ['stale HEAD', m => { m.sourceCommit = '0'.repeat(40); }],
      ['wrong run', m => { m.runId = 999; }],
      ['changed hash', m => { m.generated[0].sha256 = '0'.repeat(64); }],
      ['unlisted file', null, true],
    ]) {
      const result = checkArchive(kind, mutate, unlisted);
      assert.notEqual(result.status, 0, kind + ' accepted ' + label);
    }
  }
});
