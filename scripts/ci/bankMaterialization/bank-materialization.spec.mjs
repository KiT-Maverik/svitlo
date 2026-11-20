import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  parseTrigger,
  parseIdentity,
  requireReviewedStages,
  safeBranch,
  allowedPath,
  gitBlob,
  sha256,
} from './bank-gate.mjs';
import { inspectManifest } from './bank-materialization.mjs';

const id = 'd3048d21-8690-5255-b62c-984c69ac272c';
const pkg = 'content/astronomy';
const banks = {
  questions: ['Lesson Analysis', 'Question Design', 'Quiz Section Design', 'Independent Assessment Review'],
  flashcards: ['Lesson Analysis', 'Flashcard Design', 'Flashcards Section Design', 'Memory Design Review'],
};
const body = bank =>
  [
    '<!-- svitlo-create-' + bank + '-flow:v1 -->',
    '- Lesson UUID: ' + id,
    '- Textbook: ' + pkg,
    '- Parent Lesson PR: #666',
    '## Workflow',
    ...banks[bank].map((stage, i) => '- [x] ' + (i + 1) + '. ' + stage),
    '- [ ] 5. Resource Production',
    '- [ ] 6. Translation',
    '- [ ] 7. Translation Review',
    '## Handoff',
    'Reviewed bank source and stable UUID.',
  ].join('\n');

test('only top-level exact PR comment or enumerated dispatch authorizes generation', () => {
  for (const bank of Object.keys(banks)) {
    const event = {
      issue: { number: 100, pull_request: {} },
      comment: { user: { login: 'owner' }, body: '/' + bank + ' materialize' },
    };
    assert.deepEqual(parseTrigger(event, 'issue_comment', 'owner'), {
      actor: 'owner',
      bank,
      number: 100,
    });
    assert.deepEqual(parseTrigger({ inputs: { bank, pr_number: '100' } }, 'workflow_dispatch', 'owner'), {
      actor: 'owner',
      bank,
      number: 100,
    });
    for (const command of [
      '/' + bank + ' materialize\nmore',
      ' /' + bank + ' materialize',
      '/' + bank + ' finalize',
      '/' + bank + ' materialize --force',
    ]) {
      assert.throws(() =>
        parseTrigger(
          {
            ...event,
            comment: { ...event.comment, body: command },
          },
          'issue_comment',
          'owner',
        ),
      );
    }
    assert.throws(() => parseTrigger(event, 'issue_comment', 'intruder'));
    assert.throws(() => parseTrigger({ ...event, issue: { number: 100 } }, 'issue_comment', 'owner'));
  }
  assert.throws(() => parseTrigger({ inputs: { bank: 'quest', pr_number: '5' } }, 'workflow_dispatch', 'owner'));
  assert.throws(() => parseTrigger({ inputs: { bank: 'questions', pr_number: '0' } }, 'workflow_dispatch', 'owner'));
});

test('bank identity is canonical, parent-linked and type-specific', () => {
  for (const bank of Object.keys(banks)) {
    const item = parseIdentity(body(bank), bank);
    assert.deepEqual(item, {
      id,
      pkg,
      bank,
      parent: 666,
      folder: pkg + '/data/lessons/c/' + id,
      yaml: pkg + '/data/lessons/c/' + id + '/' + bank + '.yaml',
    });
    assert.throws(() => parseIdentity(body(bank), bank === 'questions' ? 'flashcards' : 'questions'));
    assert.throws(() => parseIdentity(body(bank) + '\n<!-- svitlo-create-' + bank + '-flow:v1 -->', bank));
    assert.throws(() => parseIdentity(body(bank).replace('Parent Lesson PR: #666', 'Parent Lesson PR: #0'), bank));
    assert.throws(() => parseIdentity(body(bank).replace(id, 'bogus'), bank));
    assert.throws(() => parseIdentity(body(bank).replace(pkg, 'content/../math'), bank));
    assert.equal(
      parseIdentity(body(bank).replace(pkg, 'content/languages/ukrainian'), bank).pkg,
      'content/languages/ukrainian',
    );
  }
});

test('all prior bank stages must be completed exactly once within Workflow', () => {
  for (const bank of Object.keys(banks)) {
    assert.doesNotThrow(() => requireReviewedStages(body(bank), bank));
    assert.throws(() => requireReviewedStages(body(bank).replace('- [x] 4.', '- [ ] 4.'), bank));
    assert.throws(() => requireReviewedStages(body(bank).replace('- [x] 1.', '- [ ] 1.'), bank));
    assert.throws(() => requireReviewedStages(body(bank).replace('## Workflow', '## Notes'), bank));
    assert.throws(() => requireReviewedStages(body(bank).replace('- [ ] 5.', '- [x] 5.'), bank));
    assert.throws(() => requireReviewedStages(body(bank) + '\n## Workflow', bank));
    assert.throws(() =>
      requireReviewedStages(body(bank).replace('## Handoff', '- [x] 4. ' + banks[bank][3] + '\n## Handoff'), bank),
    );
  }
});

test('path allowlist guarantees bank-only outputs; no Lesson/other bank/YAML writes', () => {
  const questions = parseIdentity(body('questions'), 'questions');
  const flashcards = parseIdentity(body('flashcards'), 'flashcards');
  const prefix = questions.folder + '/';
  for (const name of [
    'questions/index.ts',
    'questions/selectOneAnswer/prompt/index.ts',
    'questions/selectOneAnswer/prompt/question/uk.md',
    'questions/selectOneAnswer/prompt/question/markdown.md',
    'questions/selectOneAnswer/prompt/question/code.py',
    'questions/selectOneAnswer/prompt/question/specification.md',
  ])
    assert.equal(allowedPath(prefix + name, questions), true, name);
  assert.equal(allowedPath(prefix + 'flashcards/index.ts', flashcards), true);
  for (const name of [
    'index.ts',
    'constants.ts',
    'questions.yaml',
    'flashcards.yaml',
    'lesson.yaml',
    'flashcards/index.ts',
    'questions/../../lesson.yaml',
    'questions/one/evil.js',
    'questions/one/../a.ts',
    'questions/one/not-a-module.ts',
    'questions/one/symlink',
    'questions/one/locale/uk.json',
  ])
    assert.equal(allowedPath(prefix + name, questions), false, name);
  for (const name of [
    'questions/index.ts',
    'lesson.yaml',
    'flashcards.yaml',
    'index.ts',
    'flashcards/other.ts',
    'flashcards/first/index.ts',
    'flashcards/../lesson.yaml',
  ])
    assert.equal(allowedPath(prefix + name, flashcards), false, name);
});

test('branch safety and pinned byte digests', () => {
  assert.equal(safeBranch('agent/astronomy-questions', 'course/parent'), true);
  assert.equal(safeBranch('agent/flashcards', 'main'), true);
  for (const name of ['main', 'x..y', '../main', 'agent//a', 'agent/.secret', 'agent/a.lock', 'agent/a/', 'a@{1}']) {
    assert.equal(safeBranch(name, name === 'main' ? 'main' : 'parent'), false);
  }
  assert.equal(gitBlob('hello'), 'b6fc4c620b67d95f953a5c1c1230aaab5db5a1b0');
  assert.equal(sha256('hello'), '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824');
});

test('read-only manifest verifier rejects path injection, truncated and altered bytes', () => {
  for (const bank of Object.keys(banks)) {
    const identity = parseIdentity(body(bank), bank);
    const info = {
      number: 100,
      head: 'a'.repeat(40),
      sourceBlob: 'b'.repeat(40),
      branch: 'agent/bank-100',
      base: 'agent/lesson',
      repo: 'KiT-Maverik/svitlo',
      bank,
      identity,
      actor: 'owner',
    };
    const source = Buffer.from('export const example = 1;\n');
    const files = [
      { path: identity.folder + '/' + bank + '/index.ts', sha256: sha256(source), base64: source.toString('base64') },
    ];
    const report = { version: 1, meta: info, files };
    assert.doesNotThrow(() => inspectManifest(report, info));
    assert.throws(() => inspectManifest({ ...report, meta: { ...info, head: 'c'.repeat(40) } }, info));
    assert.throws(() => inspectManifest({ ...report, files: [{ ...files[0], sha256: '0'.repeat(64) }] }, info));
    assert.throws(() => inspectManifest({ ...report, files: [...files, ...files] }, info));
    assert.throws(() =>
      inspectManifest(
        {
          ...report,
          files: [{ ...files[0], path: identity.folder + '/lesson.yaml' }],
        },
        info,
      ),
    );
  }
});

test('workflow uses isolated default-branch code and narrow publish permissions', () => {
  const workflow = fs.readFileSync(
    new URL('../../../.github/workflows/bank-materialization.yml', import.meta.url),
    'utf8',
  );
  assert.match(workflow, /issue_comment:/);
  assert.match(workflow, /workflow_dispatch:/);
  assert.match(workflow, /\/questions materialize/);
  assert.match(workflow, /\/flashcards materialize/);
  assert.match(workflow, /needs: \[resolve, analyze\]/);
  assert.match(workflow, /contents: write/);
  assert.match(workflow, /persist-credentials: false/);
  assert.match(workflow, /Git API/i); // Explicit Git Data publication step.
});

test('Questions and Flashcards publishers do not load Engine builders or install npm packages', () => {
  const script = fs.readFileSync(new URL('./bank-materialization.mjs', import.meta.url), 'utf8');
  const analyzeAt = script.indexOf('async function analyze(info)');
  const publishAt = script.indexOf('async function publish(info)');
  assert.ok(analyzeAt > 0 && publishAt > analyzeAt, 'expected separate analyze and publish operations');

  const moduleImports = script.slice(0, script.indexOf('const MAX_COUNT'));
  assert.doesNotMatch(moduleImports, /shared\/engine\//, 'bank CLI must not eagerly load Engine builders');
  const analyzeBody = script.slice(analyzeAt, publishAt);
  assert.match(analyzeBody, /await import\([^\n]*questionsBuilder\/questionsBuilder\.mjs/);
  assert.match(analyzeBody, /await import\([^\n]*flashcardBuilder\/flashcardBuilder\.mjs/);
  assert.doesNotMatch(script.slice(publishAt), /shared\/engine\//, 'publisher must not load either builder');

  const workflow = fs.readFileSync(
    new URL('../../../.github/workflows/bank-materialization.yml', import.meta.url),
    'utf8',
  );
  const publishJob = workflow.split('\n  publish:\n')[1];
  assert.ok(publishJob, 'separate publish job must exist');
  assert.doesNotMatch(publishJob, /npm ci|npm run package:build/, 'bank publisher must run without npm dependencies');
  assert.match(publishJob, /contents: write/);
});
