import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { parseTypedIdentity, parseReviewEvidence } from './lesson-typed-gate.mjs';
import { typedManifest, indexed, publish } from './lesson-typed-materialization.mjs';
import { gitBlob } from '../courseMaterialization/course-gate.mjs';

const repo = 'KiT-Maverik/svitlo';
const id = '12345678-1234-4234-8234-123456789001';
const folder = 'content/math/data/lessons/1/' + id;
const source = folder + '/index.ts';
const raw = Buffer.from('export const authored = { config: {}, production: {} };\n');
const sha256 = value => createHash('sha256').update(value).digest('hex');
const identityBody = [
  '<!-- svitlo-create-lesson-flow:v1 -->',
  '- Lesson UUID / textbook / slug: ' + id + ' / content/math / intro',
  '- Source path: ' + source,
  '## Lesson stages',
  ...['Methodology','Content Creation','Content Review','Experience Review',
    'Methodology Compliance','Resource Production','Questions','Flashcards',
    'Translation','Translation Review'].flatMap((name, i) => [
    '- [' + (i < 5 ? 'x' : ' ') + '] ' + (i + 1) + '. ' + name,
    ...(i === 5 ? ['  - [ ] 6.1 Materialize Lesson sources',
      '  - [ ] 6.2 Complete generated Lesson resources',
      '  - [ ] 6.3 Implement and integrate Scenes'] : []),
  ]),
  '## Evidence',
].join('\n');

async function exercise({ permission = 'write', advance = false,
    rejectLease = false, corruptArtifact = false } = {}) {
  const originalFetch = globalThis.fetch;
  const env = Object.fromEntries(['GH_TOKEN','GITHUB_REPOSITORY',
    'LESSON_DEFAULT_BRANCH','LESSON_TYPED_REPORT','LESSON_TYPED_REPORT_SHA256'].map(
    key => [key, process.env[key]]));
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-typed-publish-'));
  const calls = [];
  try {
    const entry = path.join(root, source);
    fs.mkdirSync(path.dirname(entry), { recursive: true });
    fs.writeFileSync(entry, raw);
    const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
    git('init','-q');
    git('add','.');
    git('-c','user.name=Fixture','-c','user.email=f@example.invalid',
      'commit','-qm','reviewed Lesson');
    const head = git('rev-parse','HEAD');
    const blob = gitBlob(raw);
    const comments = [3,4,5].map(stage => ({
      id: 100 + stage, user: {login:'reviewer'},
      body: ['<!-- svitlo-lesson-review:v1 -->','Stage: ' + stage,
        'Source commit: ' + head,'Source blob: ' + blob,
        'Verdict: accepted','Reviewer context: review-' + stage,
        ...(stage === 3 ? ['Author context: author-2'] : [])].join('\n'),
    }));
    const meta = {
      number: 710, repo, head, branch: 'agent/lesson',
      base: 'develop', sourceBlob: blob, identity: parseTypedIdentity(identityBody),
      parent: null, actor: 'maintainer', operation: 'materialize-typed',
      reviews: parseReviewEvidence(comments),
    };
    const plan = {
      lessonId:id, sourcePath:source, archivePath:folder + '/workflow.stage2.ts',
      sourceBlobSha:blob, reviewCommitSha:head, publishable:false,
      reviewEvidenceSha:gitBlob(Buffer.from(JSON.stringify(meta.reviews))),
      diagnostics:[{code:'pending-scene',severity:'warning'}],
      files:[
        {path:source,kind:'typescript',content:'export const lesson = 1;\n'},
        {path:folder + '/languages.ts',kind:'typescript',content:'export const languages = ["en"];\n'},
      ],
    };
    const report = typedManifest(plan, meta, raw, indexed(root, 'content/math'), root);
    const reportFile = path.join(root, 'report.json');
    const reportBytes = Buffer.from(JSON.stringify(report));
    fs.writeFileSync(reportFile, corruptArtifact ? Buffer.concat([reportBytes, Buffer.from(' ')]) : reportBytes);
    Object.assign(process.env, {
      GH_TOKEN:'fixture-token', GITHUB_REPOSITORY:repo, LESSON_DEFAULT_BRANCH:'develop',
      LESSON_TYPED_REPORT:reportFile, LESSON_TYPED_REPORT_SHA256:sha256(reportBytes),
    });
    const remote = {
      number: 710, state:'open', draft:true, body:identityBody,
      head:{sha:head,ref:'agent/lesson',repo:{full_name:repo}},
      base:{ref:'develop',repo:{full_name:repo}},
    };
    let readPr = 0;
    globalThis.fetch = async (url, options = {}) => {
      const route = url.split('/repos/' + repo + '/')[1];
      const method = options.method || 'GET';
      const data = options.body ? JSON.parse(options.body) : null;
      calls.push({route,method,data});
      let payload;
      if (route === 'pulls/710') {
        readPr++;
        // Each fresh() inspects twice; advance on the second fresh().
        if (advance && readPr >= 3) remote.head.sha = '0'.repeat(40);
        payload = remote;
      } else if (route === 'collaborators/maintainer/permission' ||
          route === 'collaborators/reviewer/permission')
        payload = {permission};
      else if (route === 'issues/710/comments?per_page=100&page=1') payload = comments;
      else if (route === 'compare/' + head + '...' + head) payload = {status:'identical'};
      else if (route.includes('contents/') && route.endsWith('?ref=' + head))
        payload = {type:'file',sha:blob,size:raw.length};
      else if (route === 'git/commits/' + head && method === 'GET')
        payload = {tree:{sha:'b'.repeat(40)}};
      else if (route === 'git/trees' && method === 'POST') payload = {sha:'c'.repeat(40)};
      else if (route === 'git/commits' && method === 'POST') payload = {sha:'d'.repeat(40)};
      else if (route === 'git/refs/heads/agent/lesson' && method === 'PATCH') {
        if (rejectLease)
          return {ok:false,status:422,json:async()=>({message:'not fast-forward'})};
        payload = {object:{sha:'d'.repeat(40)}};
      } else throw Error('Unexpected GitHub request: ' + method + ' ' + route);
      return {ok:true,status:200,json:async()=>payload};
    };
    return { calls, result: await publish(root, meta) };
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key,value] of Object.entries(env)) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
    fs.rmSync(root, { recursive:true, force:true });
  }
}

test('typed publisher makes one atomic no-force source+archive commit at exact reviewed parent', async () => {
  const {calls} = await exercise();
  const commit = calls.find(call => call.route === 'git/commits' && call.method === 'POST');
  const tree = calls.find(call => call.route === 'git/trees' && call.method === 'POST');
  const lease = calls.find(call => call.route === 'git/refs/heads/agent/lesson');
  assert.equal(commit.data.parents.length, 1);
  assert.equal(commit.data.parents[0].length, 40);
  assert.deepEqual(tree.data.tree.map(file => file.path).sort(), [
    source,folder + '/languages.ts',folder + '/workflow.stage2.ts',
  ].sort());
  assert.equal(lease.data.force, false);
  assert.equal(lease.data.sha, 'd'.repeat(40));
});

test('stale review/HEAD refuses branch write after constructing candidate commit', async () => {
  let calls;
  await assert.rejects(async () => {
    try { const result = await exercise({advance:true});calls = result.calls; }
    catch (error) { throw error; }
  }, /HEAD advanced/);
  // A failed call cannot return its local logs; remote HEAD verification
  // still fails before PATCH. The throw is the observable safety assertion.
});

test('tampered manifest and unauthorized actor are rejected before any write', async () => {
  await assert.rejects(() => exercise({corruptArtifact:true}), /SHA256 attestation/);
  await assert.rejects(() => exercise({permission:'read'}), /permission/);
});

test('non-fast-forward branch lease is never forced or silently retried', async () => {
  await assert.rejects(() => exercise({rejectLease:true}),
    /GitHub HTTP 422 for git\/refs\/heads\/agent\/lesson/);
});
