import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, mkdtempSync, mkdirSync, copyFileSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { typedCommand } from './bank-typed-gate.mjs';
import { verifyTypedManifest } from './bank-typed-materialization.mjs';
import { gitBlob, sha256 } from './bank-gate.mjs';

const owner = 'd3048d21-8690-5255-b62c-984c69ac272c';
const folder = 'content/math/data/lessons/c/' + owner;
const events = {
  questions: '/questions materialize typed',
  flashcards: '/flashcards materialize typed',
};
const canonical = bank => ({
  version: 2,
  meta: {
    bank,
    identity: { folder, bank, id: owner, pkg: 'content/math', parent: 777 },
    sourcePath: folder + '/' + bank + '/index.ts',
    head: 'a'.repeat(40),
    sourceBlob: gitBlob('export const source = {};\n'),
    reviewer: 'independent-reviewer',
    actor: 'owner',
    number: 888,
    repo: 'KiT-Maverik/svitlo',
    branch: 'agent/assessment-bank',
  },
});
const file = (filename, text) => {
  const bytes = Buffer.from(text);
  return { path: filename, sha256: sha256(bytes), base64: bytes.toString('base64') };
};
function sample(bank) {
  const data = canonical(bank);
  const root = folder + '/';
  return {
    ...data,
    inputSha256: sha256('{}'),
    treeSha: 'b'.repeat(40),
    files: [
      file(data.meta.sourcePath, 'export const finished = {};\n'),
      file(root + bank + 'Languages.ts', 'export const languages = ["uk"] as const;\n'),
      file(root + bank + '.reviewed-stage3.ts.txt', 'export const source = {};\n'),
      file(root + bank + '/first.ts', 'export const first = true;\n'),
      file(root + bank + '/first/specification.md', '# reviewed\n'),
    ],
  };
}

test('typed commands require exact top-level issue_comment actor, bank and stage', () => {
  for (const [bank, body] of Object.entries(events)) {
    const event = { issue: { number: 888, pull_request: {} }, comment: {
      body, user: { login: 'owner' },
    } };
    assert.deepEqual(typedCommand(event, 'issue_comment', 'owner'), {
      number: 888, bank, actor: 'owner',
    });
    assert.deepEqual(typedCommand({
      inputs: { mode: 'typed', bank, pr_number: '888' },
    }, 'workflow_dispatch', 'owner'), { number: 888, bank, actor: 'owner' });
    for (const command of [body + ' --force', body + '\nanything', ' ' + body,
      body.replace(' typed', ''), '/lesson materialize']) {
      assert.throws(() => typedCommand({
        ...event, comment: { ...event.comment, body: command },
      }, 'issue_comment', 'owner'));
    }
    assert.throws(() => typedCommand(event, 'issue_comment', 'intruder'));
    assert.throws(() => typedCommand({ ...event, issue: { number: 888 } }, 'issue_comment', 'owner'));
    assert.throws(() => typedCommand({ inputs: {
      mode: 'legacy', bank, pr_number: '888',
    } }, 'workflow_dispatch', 'owner'));
  }
  for (const n of ['0', '-1', 'foo', 'Infinity']) {
    assert.throws(() => typedCommand({ inputs: {
      mode: 'typed', bank: 'questions', pr_number: n,
    } }, 'workflow_dispatch', 'owner'));
  }
});

test('typed Bank publisher rejects mutated checksums, archive and non-bank paths', () => {
  for (const bank of Object.keys(events)) {
    const valid = sample(bank);
    assert.doesNotThrow(() => verifyTypedManifest(valid, valid.meta));
    assert.throws(() => verifyTypedManifest({ ...valid, treeSha: 'bad' }, valid.meta));
    assert.throws(() => verifyTypedManifest({ ...valid, files: valid.files.slice(1) }, valid.meta));
    assert.throws(() => verifyTypedManifest({ ...valid, files: [...valid.files, valid.files[0]] }, valid.meta));
    assert.throws(() => verifyTypedManifest({ ...valid, files: valid.files.map((f, i) =>
      i === 0 ? { ...f, sha256: '0'.repeat(64) } : f) }, valid.meta));
    assert.throws(() => verifyTypedManifest({ ...valid, files: valid.files.map((f, i) =>
      i === 2 ? file(f.path, 'modified reviewer source') : f) }, valid.meta));
    assert.throws(() => verifyTypedManifest({ ...valid, files: valid.files.map((f, i) =>
      i === 3 ? { ...f, path: folder + '/lesson.ts' } : f) }, valid.meta));
    assert.throws(() => verifyTypedManifest({ ...valid, meta: {
      ...valid.meta, head: 'c'.repeat(40),
    } }, valid.meta));
    assert.throws(() => verifyTypedManifest({ ...valid, files: valid.files.map((f, i) =>
      i === 4 ? { ...f, path: folder + '/other-bank/index.ts' } : f) }, valid.meta));
    const wrong = { ...valid, files: valid.files.map((f, i) =>
      i === 3 ? { ...f, base64: '////' } : f) };
    assert.throws(() => verifyTypedManifest(wrong, wrong.meta));
  }
});

test('typed publisher imports in a zero-dependency read-only environment', () => {
  const root = fileURLToPath(new URL('../../..', import.meta.url));
  const isolated = mkdtempSync(path.join(tmpdir(), 'svitlo-typed-bank-publisher-'));
  try {
    const names = ['bank-gate.mjs', 'bank-typed-gate.mjs', 'bank-typed-materialization.mjs'];
    const dir = path.join(isolated, 'scripts/ci/bankMaterialization');
    mkdirSync(dir, { recursive: true });
    for (const name of names) {
      copyFileSync(path.join(root, 'scripts/ci/bankMaterialization', name), path.join(dir, name));
    }
    assert.equal(existsSync(path.join(isolated, 'node_modules')), false);
    assert.equal(existsSync(path.join(isolated, 'shared/engine')), false);
    const result = spawnSync(process.execPath, [
      '--input-type=module', '-e',
      'await import(' + JSON.stringify(pathToFileURL(path.join(dir, names[2])).href) + ')',
    ], { encoding: 'utf8', env: { PATH: process.env.PATH ?? '' }, cwd: isolated });
    assert.equal(result.status, 0, result.stderr);
  } finally {
    rmSync(isolated, { recursive: true, force: true });
  }
});

test('workflow separates tokenless candidate analysis from scoped trusted publication', () => {
  const root = fileURLToPath(new URL('../../..', import.meta.url));
  const flow = requireWorkflow(root);
  assert.match(flow, /\/questions materialize typed/);
  assert.match(flow, /\/flashcards materialize typed/);
  const analyze = flow.split('\n  typed_analyze:\n')[1]?.split('\n  typed_publish:\n')[0];
  const publish = flow.split('\n  typed_publish:\n')[1];
  assert.ok(analyze && publish);
  assert.match(analyze, /persist-credentials: false/);
  assert.doesNotMatch(analyze, /contents: write/);
  assert.match(publish, /contents: write/);
  assert.doesNotMatch(publish, /npm ci|npm run package:build|BANK_CANDIDATE_ROOT/);
});
function requireWorkflow(root) {
  return readFileSync(path.join(root, '.github/workflows/bank-materialization.yml'), 'utf8');
}
