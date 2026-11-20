import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';

/**
 * Run an actual publisher process from a miniature checkout outside the repo.
 * The copied tree has no node_modules, Engine or schema files at any parent.
 */
test('Lesson publish loads and rejects invalid authorization without installed packages', () => {
  const root = fileURLToPath(new URL('../../..', import.meta.url));
  const isolated = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lesson-standalone-publish-'));
  try {
    const files = [
      'scripts/ci/lessonMaterialization/lesson-materialization.mjs',
      'scripts/ci/lessonMaterialization/lesson-gate.mjs',
      'scripts/ci/courseMaterialization/course-gate.mjs',
    ];
    for (const filename of files) {
      const destination = path.join(isolated, filename);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.copyFileSync(path.join(root, filename), destination);
    }
    const entry = path.join(isolated, files[0]);
    assert.equal(fs.existsSync(path.join(isolated, 'node_modules')), false);
    assert.equal(fs.existsSync(path.join(isolated, 'shared', 'engine')), false);
    const env = { PATH: process.env.PATH ?? '', GITHUB_REPOSITORY: 'KiT-Maverik/svitlo' };
    const imported = spawnSync(
      process.execPath,
      ['--input-type=module', '-e', 'await import(' + JSON.stringify(pathToFileURL(entry).href) + ')'],
      { cwd: isolated, env, encoding: 'utf8' },
    );
    assert.equal(imported.status, 0, imported.stderr);
    const result = spawnSync(process.execPath, [entry, 'publish'], { cwd: isolated, env, encoding: 'utf8' });
    assert.equal(result.status, 1, result.stdout + result.stderr);
    assert.match(result.stdout + result.stderr, /Missing or invalid pinned Lesson authorization metadata/);
    assert.doesNotMatch(result.stdout + result.stderr, /ERR_MODULE_NOT_FOUND|Cannot find package|ajv|node_modules/);
  } finally {
    fs.rmSync(isolated, { recursive: true, force: true });
  }
});

const lessonId = '667803f3-6535-5322-b377-810b4096d005';
const lessonPkg = 'content/astronomy';
const lessonYaml = lessonPkg + '/data/lessons/5/' + lessonId + '/lesson.yaml';
const rootFiles = ['index.ts', 'constants.ts', 'review.ts', 'methodology.md', 'production-handoff.json'];
const repoName = 'KiT-Maverik/svitlo';
const digest = value => createHash('sha256').update(value).digest('hex');
const blob = bytes =>
  createHash('sha1')
    .update('blob ' + bytes.length + '\0')
    .update(bytes)
    .digest('hex');

function fixture(root, operation) {
  const source = path.join(root, lessonYaml);
  fs.mkdirSync(path.dirname(source), { recursive: true });
  const yamlBytes = Buffer.from('test: reviewed Lesson source\n');
  fs.writeFileSync(source, yamlBytes);
  const evidence = rootFiles.map(name => {
    const filename = lessonYaml.slice(0, -'lesson.yaml'.length) + name;
    const bytes = Buffer.from('trusted generated ' + name + '\n');
    if (operation === 'finalize') fs.writeFileSync(path.join(root, filename), bytes);
    return { path: filename, sha256: digest(bytes), action: 'create', data: bytes.toString('base64') };
  });
  execFileSync('git', ['init', '-q'], { cwd: root });
  execFileSync('git', ['add', '.'], { cwd: root });
  execFileSync(
    'git',
    ['-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '-qm', 'reviewed source'],
    { cwd: root },
  );
  const head = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
  const identity = { id: lessonId, pkg: lessonPkg, slug: 'moonAppearanceBasics', yaml: lessonYaml, parent: null };
  const meta = {
    number: 710,
    repo: repoName,
    operation,
    head,
    branch: 'agent/lesson-710',
    base: 'develop',
    sourceBlob: blob(yamlBytes),
    actor: 'maintainer',
    identity,
  };
  const manifest = {
    version: 1,
    repo: meta.repo,
    pr: meta.number,
    head,
    branch: meta.branch,
    base: meta.base,
    operation,
    sourceBlob: meta.sourceBlob,
    identity,
    mode: 'strict',
    pending: [],
    verifiedFiles:
      operation === 'finalize' ? evidence.map(({ path: filename, sha256 }) => ({ path: filename, sha256 })) : [],
    entries: operation === 'finalize' ? [{ path: lessonYaml, action: 'delete' }] : evidence,
  };
  const body = [
    '<!-- svitlo-create-lesson-flow:v1 -->',
    '- Lesson UUID / textbook / slug: \`' + lessonId + '\` / \`' + lessonPkg + '\` / \`moonAppearanceBasics\`',
    '- Canonical source: \`' + lessonYaml + '\`',
    '## Lesson stages',
    ...[
      'Methodology',
      'Content Creation',
      'Content Review',
      'Experience Review',
      'Methodology Compliance',
      'Resource Production',
      'Questions',
      'Flashcards',
      'Translation',
      'Translation Review',
    ].map((name, i) => '- [' + (i < 5 ? 'x' : ' ') + '] ' + (i + 1) + '. ' + name),
    '  - [ ] 6.1 Materialize Lesson sources',
    '  - [ ] 6.2 Complete generated Lesson resources',
    '  - [ ] 6.3 Implement and integrate Scenes',
    '## Evidence',
  ].join('\n');
  return { meta, manifest, body, source, evidence };
}

async function runWithTrustedPublisher(operation, mutate = () => {}) {
  const originalFetch = globalThis.fetch;
  const previous = Object.fromEntries(
    [
      'LESSON_REPORT',
      'LESSON_REPORT_SHA256',
      'LESSON_HEAD_ROOT',
      'LESSON_DEFAULT_BRANCH',
      'GH_TOKEN',
      'GITHUB_REPOSITORY',
    ].map(key => [key, process.env[key]]),
  );
  const isolated = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lesson-publish-artifact-'));
  try {
    const root = fileURLToPath(new URL('../../..', import.meta.url));
    for (const filename of [
      'scripts/ci/lessonMaterialization/lesson-materialization.mjs',
      'scripts/ci/lessonMaterialization/lesson-gate.mjs',
      'scripts/ci/courseMaterialization/course-gate.mjs',
    ]) {
      const destination = path.join(isolated, 'trusted', filename);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.copyFileSync(path.join(root, filename), destination);
    }
    const candidate = path.join(isolated, 'candidate');
    fs.mkdirSync(candidate);
    const item = fixture(candidate, operation);
    const manifestFile = path.join(isolated, 'report.json');
    const bytes = Buffer.from(JSON.stringify(item.manifest));
    fs.writeFileSync(manifestFile, bytes);
    Object.assign(process.env, {
      LESSON_REPORT: manifestFile,
      LESSON_REPORT_SHA256: digest(bytes),
      LESSON_HEAD_ROOT: candidate,
      LESSON_DEFAULT_BRANCH: 'develop',
      GH_TOKEN: 'fixture-token',
      GITHUB_REPOSITORY: repoName,
    });
    const calls = [];
    const remote = {
      state: 'open',
      draft: true,
      head: { sha: item.meta.head, ref: item.meta.branch, repo: { full_name: repoName } },
      base: { ref: 'develop', repo: { full_name: repoName } },
      body: item.body,
    };
    globalThis.fetch = async (url, options = {}) => {
      const route = url.split('/repos/' + repoName + '/')[1];
      const method = options.method ?? 'GET';
      const data = options.body && JSON.parse(options.body);
      calls.push({ route, method, data });
      let payload;
      if (route === 'pulls/710') payload = remote;
      else if (route === 'collaborators/maintainer/permission') payload = { permission: 'write' };
      else if (route.startsWith('contents/') && route.endsWith('?ref=' + item.meta.head))
        payload = { type: 'file', sha: item.meta.sourceBlob, size: fs.statSync(item.source).size };
      else if (route === 'git/commits/' + item.meta.head) payload = { tree: { sha: 'd'.repeat(40) } };
      else if (route === 'git/trees' && method === 'POST') payload = { sha: 'e'.repeat(40) };
      else if (route === 'git/commits' && method === 'POST') payload = { sha: 'f'.repeat(40) };
      else if (route === 'git/refs/heads/' + item.meta.branch && method === 'PATCH')
        payload = { object: { sha: 'f'.repeat(40) } };
      else throw Error('Unexpected GitHub API call: ' + method + ' ' + route);
      return { ok: true, status: 200, json: async () => payload };
    };
    const entry = path.join(isolated, 'trusted/scripts/ci/lessonMaterialization/lesson-materialization.mjs');
    const publisher = await import(pathToFileURL(entry).href);
    const trackedRoot = publisher.checkedRoot(item.meta);
    assert.equal(trackedRoot, candidate);
    await mutate({ ...item, calls, remote, manifestFile });
    return { calls, result: await publisher.publish(candidate, item.meta), item };
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    fs.rmSync(isolated, { recursive: true, force: true });
  }
}

test('dependency-free Lesson publisher safely commits exactly reviewed materialize and finalize operations', async () => {
  for (const operation of ['materialize', 'finalize']) {
    const { calls, item } = await runWithTrustedPublisher(operation);
    const tree = calls.find(call => call.route === 'git/trees' && call.method === 'POST').data.tree;
    assert.equal(tree.length, operation === 'materialize' ? rootFiles.length : 1);
    if (operation === 'finalize') {
      assert.deepEqual(tree, [{ path: lessonYaml, mode: '100644', type: 'blob', sha: null }]);
    } else {
      assert(tree.every(file => file.path.endsWith('.ts') || file.path.endsWith('.md') || file.path.endsWith('.json')));
      assert(tree.every(file => !Object.hasOwn(file, 'sha') && typeof file.content === 'string'));
    }
    const commits = calls.filter(call => call.route === 'git/commits' && call.method === 'POST');
    assert.deepEqual(commits[0].data.parents, [item.meta.head]);
    const refs = calls.filter(call => call.route.startsWith('git/refs/heads/') && call.method === 'PATCH');
    assert.equal(refs.length, 1);
    assert.equal(refs[0].data.force, false);
  }
});

test('publisher rejects mutated artifact bytes before any Git write for both modes', async () => {
  for (const operation of ['materialize', 'finalize']) {
    let calls;
    await assert.rejects(
      runWithTrustedPublisher(operation, ({ manifestFile, calls: log }) => {
        calls = log;
        fs.appendFileSync(manifestFile, ' ');
      }),
      /SHA256 attestation/,
    );
    assert.equal(calls.filter(call => call.method === 'POST').length, 0);
  }
});

test('finalize rejects changed committed evidence even when manifest digest is recomputed', async () => {
  let calls;
  await assert.rejects(
    runWithTrustedPublisher('finalize', ({ manifestFile, calls: log, manifest }) => {
      calls = log;
      const forged = {
        ...manifest,
        verifiedFiles: manifest.verifiedFiles.map((item, index) =>
          index ? item : { ...item, sha256: '0'.repeat(64) },
        ),
      };
      const bytes = Buffer.from(JSON.stringify(forged));
      fs.writeFileSync(manifestFile, bytes);
      process.env.LESSON_REPORT_SHA256 = digest(bytes);
    }),
    /differs from analyzed finalization evidence/,
  );
  assert.equal(calls.filter(call => call.method === 'POST').length, 0);
});

test('publisher rejects advanced remote PR HEAD before any Git write', async () => {
  let calls;
  await assert.rejects(
    runWithTrustedPublisher('materialize', ({ remote, calls: log }) => {
      calls = log;
      remote.head.sha = 'a'.repeat(40);
    }),
    /HEAD advanced/,
  );
  assert.equal(calls.filter(call => call.method === 'POST').length, 0);
});
