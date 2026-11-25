/** Trusted Assessment source transaction. Candidate TS executes only in the
 * shared credential-free direct worker. The privileged job replays an exact
 * bounded create-only manifest. Course parent and stub are read-only pinned inputs.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { github, requireActor, safeBranch, report } from '../courseMaterialization/course-gate.mjs';
import { pinnedGitReader, ordinary } from '../directMaterialization/pinned-git.mjs';
import { executeTrustedDraft } from '../directMaterialization/trusted-draft.mjs';
import { deriveCourseEntityId } from '../../../shared/engine/generators/materializers/course/deriveCourseEntityId.mjs';
import { inspectAssessment, discoverAssessmentDraft } from './assessment-gate.mjs';
import {
  readGeneratedCourseHandoff,
  resolveIntegratedCourseLesson,
  verifyPendingCourseParent,
} from '../directMaterialization/reserved-parent-slot.mjs';

const SHA = /^[0-9a-f]{40}$/;
const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const maxBytes = 32 * 1024 * 1024;
const sha256 = value => createHash('sha256').update(value).digest('hex');
const stubPath = meta => meta.sourcePath.replace(/draft\.ts$/, 'stub.ts');
const keys = [
  'repo',
  'number',
  'parentNumber',
  'branch',
  'parentBranch',
  'head',
  'parentHead',
  'sourcePath',
  'courseRoot',
  'courseId',
  'placement',
  'parentPath',
  'textbookRoot',
  'sourceBlobSha',
  'handoffBlobSha',
  'parentBlobSha',
  'stubBlobSha',
];
export const sameAssessmentMeta = (a, b) => keys.every(key => a[key] === b[key]);

export function parseAssessmentMetadata(encoded) {
  if (typeof encoded !== 'string' || !/^[A-Za-z0-9+/=]{1,16384}$/.test(encoded))
    throw Error('Missing Assessment metadata');
  const meta = JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'));
  const identity = discoverAssessmentDraft([{ filename: meta.sourcePath, status: 'modified' }]);
  if (
    Object.keys(identity).some(key => identity[key] !== meta[key]) ||
    meta.repo !== process.env.GITHUB_REPOSITORY ||
    !Number.isSafeInteger(meta.number) ||
    meta.number < 1 ||
    !Number.isSafeInteger(meta.parentNumber) ||
    meta.parentNumber < 1 ||
    meta.number === meta.parentNumber ||
    !safeBranch(meta.branch, meta.parentBranch) ||
    !safeBranch(meta.parentBranch, process.env.COURSE_DEFAULT_BRANCH) ||
    !['head', 'parentHead', 'sourceBlobSha', 'handoffBlobSha', 'parentBlobSha', 'stubBlobSha'].every(key =>
      SHA.test(meta[key] ?? ''),
    ) ||
    !/^[A-Za-z0-9-]+$/.test(meta.actor ?? '')
  )
    throw Error('Invalid pinned Assessment transaction metadata');
  return meta;
}

/** Decode only the minimal, exact Course-generated seed shape from a pinned Git
 * blob. Editorial "placement" or arbitrary extra metadata is never authority.
 */
function exactKeys(value, keys) {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    Object.keys(value).length === keys.length &&
    keys.every(key => Object.hasOwn(value, key))
  );
}

export function parseAssessmentSeed(source) {
  const seed = readGeneratedCourseHandoff(source, {
    variable: 'assessmentSeed',
    contract: 'AssessmentWorkflowSeed',
  });
  if (
    !seed ||
    !exactKeys(seed, ['config', 'production']) ||
    !exactKeys(seed.config, ['id', 'type', 'slug', 'locale']) ||
    !exactKeys(seed.production, ['purpose', 'lessonDependencies', 'reviewedCourseSourceBlobSha', 'languages']) ||
    !UUID.test(seed.config?.id ?? '') ||
    seed.config.type !== 'assessment' ||
    !/^[A-Za-z][A-Za-z0-9]*$/.test(seed.config.slug ?? '') ||
    !seed.config.locale ||
    typeof seed.production.purpose !== 'string' ||
    !seed.production.purpose.trim() ||
    !Array.isArray(seed.production.lessonDependencies) ||
    !seed.production.lessonDependencies.length ||
    seed.production.lessonDependencies.some(
      dep => typeof dep !== 'string' || !/^[A-Za-z][A-Za-z0-9]*(?:\/[A-Za-z][A-Za-z0-9]*){0,2}$/.test(dep),
    ) ||
    new Set(seed.production.lessonDependencies).size !== seed.production.lessonDependencies.length ||
    !SHA.test(seed.production.reviewedCourseSourceBlobSha ?? '') ||
    !exactKeys(seed.production.languages, ['document', 'planned']) ||
    !/^[a-z]{2}(?:-[A-Z]{2})?$/.test(seed.production.languages.document ?? '') ||
    !Array.isArray(seed.production.languages.planned) ||
    !seed.production.languages.planned.includes(seed.production.languages.document) ||
    seed.production.languages.planned.some(
      code => typeof code !== 'string' || !/^[a-z]{2}(?:-[A-Z]{2})?$/.test(code),
    ) ||
    new Set(seed.production.languages.planned).size !== seed.production.languages.planned.length
  )
    throw Error('Invalid pinned Assessment seed identity and planning data');
  const title = seed.config.locale?.title;
  const language = seed.production.languages.document;
  if (!(
    (typeof title === 'string' && title.trim()) ||
    (title &&
      typeof title === 'object' &&
      !Array.isArray(title) &&
      typeof title[language] === 'string' &&
      title[language].trim())
  ))
    throw Error('Pinned Assessment seed lacks the approved Course source-language title');
  return seed;
}

export function verifyAssessmentDesign(seed, input, meta, plan) {
  if (
    !input ||
    !plan ||
    plan.publishable !== false ||
    input.config?.id !== seed.config.id ||
    input.config.slug !== seed.config.slug ||
    input.config.type !== 'assessment' ||
    input.production?.purpose !== seed.production.purpose ||
    JSON.stringify(input.production.lessonDependencies) !== JSON.stringify(seed.production.lessonDependencies) ||
    input.production.reviewedCourseSourceBlobSha !== seed.production.reviewedCourseSourceBlobSha ||
    JSON.stringify(input.production.languages) !== JSON.stringify(seed.production.languages) ||
    deriveCourseEntityId(
      meta.courseId,
      'assessment',
      meta.placement.includes('/')
        ? meta.placement.split('/').slice(0, -1).join('/') + '/content/' + meta.placement.split('/').at(-1)
        : meta.placement,
    ) !== seed.config.id ||
    seed.config.slug !== meta.placement.split('/').at(-1) ||
    plan.assessmentId !== seed.config.id ||
    plan.courseId !== meta.courseId ||
    plan.placement !== meta.placement ||
    plan.sourceBlobSha !== meta.sourceBlobSha ||
    plan.sourceCommitSha !== meta.head ||
    plan.sourcePath !== meta.sourcePath ||
    plan.materializedPath !== meta.sourcePath.replace(/draft\.ts$/, 'index.ts') ||
    !Array.isArray(plan.selectedQuestionIds) ||
    !plan.selectedQuestionIds.length ||
    plan.selectedQuestionIds.some(id => !UUID.test(id))
  )
    throw Error('Reviewed Assessment design diverges from immutable Course handoff');
  const sourceTitle = seed.config.locale?.title;
  const reviewedTitle = input.config.locale?.title;
  const document = seed.production.languages.document;
  const localized = title => (typeof title === 'string' ? title : title?.[document]);
  if (localized(sourceTitle) !== localized(reviewedTitle))
    throw Error('Assessment changed the Course-approved source title');
  const selected = input.config.quiz?.config?.params?.selection?.questionIds ?? [];
  if (JSON.stringify(selected) !== JSON.stringify(plan.selectedQuestionIds))
    throw Error('Assessment selected Question UUIDs differ from pinned authored Quiz Sections');
  return true;
}

/** Only real, integrated upstream Lesson Question sources may provide selections.
 * This is technical existence/ownership evidence; human Question review and
 * translations remain independently owned editorial release requirements.
 */
export function checkAssessmentBanks(meta, seed, selectedQuestionIds, reader, tree) {
  const found = new Set();
  for (const dep of seed.production.lessonDependencies) {
    if (typeof dep !== 'string' || !/^[A-Za-z][A-Za-z0-9]*(?:\/[A-Za-z][A-Za-z0-9]*){0,2}$/.test(dep))
      throw Error('Assessment must name resolved Course Lesson placement paths');
    // Course Lesson placements are references in their immediate parent's
    // content.items/order. Neither new nor reused Lessons own a Course-local
    // content/<lesson>/index.ts. Resolve the exact pinned import, not the first
    // #lessonsData string in the parent or a guessed allocated UUID.
    const segments = dep.split('/');
    if (![1, 2, 3].includes(segments.length)) throw Error('Unsupported upstream Course Lesson placement depth: ' + dep);
    // A direct Course child can be either a Module or a Chapter.
    const ownerKind = ['course', ['module', 'chapter'], 'chapter'][segments.length - 1];
    const parentPath =
      meta.courseRoot + '/' + (segments.length === 1 ? '' : segments.slice(0, -1).join('/') + '/') + 'index.ts';
    const parent = tree.get(parentPath);
    if (!ordinary(parent)) throw Error('Upstream Lesson has not been integrated into the Course: ' + dep);
    const owner = resolveIntegratedCourseLesson(reader.blob(parent, parentPath), {
      slug: segments.at(-1),
      ownerKind,
    });
    const lessonRoot = meta.textbookRoot + '/data/lessons/' + owner.at(-1) + '/' + owner + '/';
    if (!ordinary(tree.get(lessonRoot + 'index.ts'))) throw Error('Upstream Lesson source is not materialized: ' + dep);
    const bankRoot = lessonRoot + 'questions/';
    if (!ordinary(tree.get(bankRoot + 'index.ts')))
      throw Error('Upstream Lesson lacks a materialized Question Bank: ' + dep);
    // The source materializer writes a real Question definition to
    // questions/<kind>/<slug>.ts, exported by the kind index and bank root.
    // UUIDs appearing in comments, content blocks, or unrelated files are not proof.
    const rootSource = reader.blob(tree.get(bankRoot + 'index.ts'), bankRoot + 'index.ts');
    const kinds = new Set([
      'selectOneAnswer',
      'selectMultipleAnswers',
      'matchBlocks',
      'answerWithText',
      'answerWithNumber',
      'orderSequence',
      'buildAnswerWithBlocks',
      'fillBlanksWithBlocks',
      'fillBlanksWithText',
    ]);
    let items = 0;
    for (const [filename, entry] of tree) {
      if (!filename.startsWith(bankRoot) || !filename.endsWith('.ts')) continue;
      const path = filename.slice(bankRoot.length);
      const match = path.match(/^([A-Za-z][A-Za-z0-9]*)\/([a-z][A-Za-z0-9]*)\.ts$/);
      if (!match || !kinds.has(match[1])) continue;
      if (!ordinary(entry)) throw Error('Unsafe upstream Question Bank source');
      const kindIndex = bankRoot + match[1] + '/index.ts';
      if (!ordinary(tree.get(kindIndex))) throw Error('Missing Question kind index: ' + kindIndex);
      const kindSource = reader.blob(tree.get(kindIndex), kindIndex);
      if (
        !rootSource.includes(JSON.stringify('./' + match[1])) ||
        !kindSource.includes(JSON.stringify('./' + match[2]))
      )
        continue;
      const source = reader.blob(entry, filename);
      const definition = source.match(
        /export const [A-Za-z_$][A-Za-z0-9_$]*\s*=\s*define[A-Za-z]+(?:<[^;]*?>)?\s*\(\s*\{([\s\S]*?)\n\s*\}\s*\);/,
      );
      if (!definition) continue;
      const identity = definition[1].match(/^\s*id:\s*["']([0-9a-f-]{36})["'],?\s*$/m);
      if (!identity || !UUID.test(identity[1])) continue;
      if (selectedQuestionIds.includes(identity[1])) found.add(identity[1]);
      items++;
    }
    if (!items) throw Error('Upstream Question Bank has no materialized Question definitions: ' + dep);
  }
  if (selectedQuestionIds.some(id => !found.has(id)))
    throw Error('Assessment Quiz references Question UUIDs absent from approved upstream Lesson banks');
  return true;
}

function safeOutput(file, meta) {
  if (
    typeof file !== 'string' ||
    !file.startsWith(meta.courseRoot + '/' + meta.placement + '/') ||
    file.length > 500 ||
    file.includes('\\')
  )
    return false;
  const parts = file.slice((meta.courseRoot + '/' + meta.placement + '/').length).split('/');
  if (
    parts
      .slice(0, -1)
      .some(value => !/^[A-Za-z][A-Za-z0-9]*$/.test(value) || ['constructor', 'prototype', '__proto__'].includes(value))
  )
    return false;
  const leaf = parts.at(-1);
  return (
    ['index.ts', 'specification.md', 'markdown.md'].includes(leaf) ||
    /^[a-z]{2}(?:-[A-Z]{2})?\.md$/.test(leaf) ||
    /^code\.[a-z0-9]{1,10}$/.test(leaf)
  );
}
export function checkAssessmentTargets(meta, files, tree) {
  if (
    !ordinary(tree.get(meta.sourcePath)) ||
    tree.get(meta.sourcePath).sha !== meta.sourceBlobSha ||
    !ordinary(tree.get(meta.parentPath)) ||
    tree.get(meta.parentPath).sha !== meta.parentBlobSha ||
    !ordinary(tree.get(stubPath(meta))) ||
    tree.get(stubPath(meta)).sha !== meta.stubBlobSha
  )
    throw Error('Assessment source/parent is not exact pinned regular Git blobs');
  const seen = new Set();
  for (const file of files) {
    if (
      !file ||
      !safeOutput(file.path, meta) ||
      seen.has(file.path) ||
      file.path === meta.sourcePath ||
      !['typescript', 'markdown', 'specification', 'code'].includes(file.kind) ||
      typeof file.content !== 'string' ||
      !file.content
    )
      throw Error('Assessment generated an unsafe or duplicate file path');
    seen.add(file.path);
    if (tree.has(file.path)) throw Error('Assessment would overwrite existing authored source');
    const segments = file.path.split('/');
    for (let depth = 1; depth < segments.length; depth++)
      if (tree.has(segments.slice(0, depth).join('/')))
        throw Error('Assessment output traverses a non-directory/symlink ancestor');
    if ([...tree.keys()].some(other => other.startsWith(file.path + '/')))
      throw Error('Assessment output would replace a directory');
  }
  if (!seen.has(meta.sourcePath.replace(/draft\.ts$/, 'index.ts')))
    throw Error('Assessment must create its exact owned nested index without changing the parent');
  return true;
}

export function buildAssessmentManifest(meta, plan) {
  if (
    plan.publishable !== false ||
    !Array.isArray(plan.files) ||
    !plan.files.length ||
    plan.files.length > 1500 ||
    !UUID.test(plan.assessmentId)
  )
    throw Error('Invalid Assessment direct materialization plan');
  let bytes = 0;
  const entries = plan.files
    .map(file => {
      const data = Buffer.from(file.content, 'utf8');
      bytes += data.length;
      if (bytes > maxBytes) throw Error('Assessment source plan is oversized');
      return { path: file.path, kind: file.kind, sha256: sha256(data), data: data.toString('base64') };
    })
    .sort((a, b) => a.path.localeCompare(b.path));
  return {
    version: 1,
    operation: 'typed-assessment-stage4',
    meta,
    assessmentId: plan.assessmentId,
    publishable: false,
    sourceExportName: plan.sourceExportName,
    selectedQuestionIds: plan.selectedQuestionIds,
    entries,
    diagnostics: plan.diagnostics,
  };
}
export function assessmentCommitTree(manifest) {
  return [
    ...manifest.entries.map(file => ({
      path: file.path,
      mode: '100644',
      type: 'blob',
      content: Buffer.from(file.data, 'base64').toString('utf8'),
    })),
    { path: manifest.meta.sourcePath, mode: '100644', type: 'blob', sha: null },
  ];
}

export async function prepareAssessment(meta, root, execute = executeTrustedDraft) {
  const reader = pinnedGitReader(root);
  if (
    reader.git('rev-parse', 'HEAD').trim() !== meta.head ||
    reader.git('status', '--porcelain=v1', '--untracked-files=all').trim() ||
    reader.git('merge-base', meta.parentHead, meta.head).trim() !== meta.parentHead
  )
    throw Error('Assessment checkout is not clean or branch relationship is stale');
  const changes = reader.git('diff', '--name-status', '-z', meta.parentHead, meta.head).split('\0').filter(Boolean);
  if (changes.length !== 2 || changes[0] !== 'M' || changes[1] !== meta.sourcePath)
    throw Error('Assessment PR may change only its canonical reviewed draft at Stage 4');
  const tree = reader.tree(meta.head, meta.textbookRoot);
  const baseline = reader.tree(meta.parentHead, meta.textbookRoot);
  if (
    baseline.get(meta.sourcePath)?.sha !== meta.handoffBlobSha ||
    baseline.get(meta.parentPath)?.sha !== meta.parentBlobSha ||
    baseline.get(stubPath(meta))?.sha !== meta.stubBlobSha ||
    tree.get(meta.sourcePath)?.sha !== meta.sourceBlobSha ||
    tree.get(meta.parentPath)?.sha !== meta.parentBlobSha ||
    tree.get(stubPath(meta))?.sha !== meta.stubBlobSha
  )
    throw Error('Assessment parent and allocated seed changed after review');
  const seed = parseAssessmentSeed(reader.blob(baseline.get(meta.sourcePath), meta.sourcePath));
  const pinned = { sourcePath: meta.sourcePath, sourceBlobSha: meta.sourceBlobSha, sourceCommitSha: meta.head };
  const worker = execute({
    trustedRoot: path.resolve(import.meta.dirname, '../../..'),
    operation: 'assessment-stage4',
    source: pinned,
    sourceText: reader.blob(tree.get(meta.sourcePath), meta.sourcePath),
    options: {
      source: pinned,
      sourceText: reader.blob(tree.get(meta.sourcePath), meta.sourcePath),
      verifySourceInput: (_input, actual, text) =>
        actual.sourcePath === pinned.sourcePath &&
        actual.sourceBlobSha === pinned.sourceBlobSha &&
        actual.sourceCommitSha === pinned.sourceCommitSha &&
        text === reader.blob(tree.get(meta.sourcePath), meta.sourcePath),
    },
  });
  verifyAssessmentDesign(seed, worker?.input, meta, worker?.plan);
  checkAssessmentBanks(meta, seed, worker.plan.selectedQuestionIds, reader, tree);
  const output = worker.plan;
  const files = output.files.map(file => ({ ...file, path: meta.courseRoot + '/' + file.path }));
  verifyPendingCourseParent(reader.blob(tree.get(meta.parentPath), meta.parentPath), {
    kind: 'assessment',
    id: seed.config.id,
    slug: seed.config.slug,
    placement: meta.placement,
    stubSource: reader.blob(tree.get(stubPath(meta)), stubPath(meta)),
  });
  checkAssessmentTargets(meta, files, tree);
  return buildAssessmentManifest(meta, { ...output, files });
}

export function verifyDirectAssessmentManifest(meta, manifest, root) {
  if (
    !manifest ||
    manifest.version !== 1 ||
    manifest.operation !== 'typed-assessment-stage4' ||
    !sameAssessmentMeta(manifest.meta ?? {}, meta) ||
    manifest.publishable !== false ||
    !UUID.test(manifest.assessmentId ?? '') ||
    !/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(manifest.sourceExportName ?? '') ||
    !Array.isArray(manifest.selectedQuestionIds) ||
    !manifest.selectedQuestionIds.length ||
    manifest.selectedQuestionIds.some(id => !UUID.test(id)) ||
    !Array.isArray(manifest.entries) ||
    !manifest.entries.length ||
    manifest.entries.length > 1500
  )
    throw Error('Invalid sealed Assessment manifest');
  const reader = pinnedGitReader(root);
  if (
    reader.git('rev-parse', 'HEAD').trim() !== meta.head ||
    reader.git('status', '--porcelain=v1', '--untracked-files=all').trim() ||
    reader.git('merge-base', meta.parentHead, meta.head).trim() !== meta.parentHead
  )
    throw Error('Assessment publisher source checkout is stale');
  const tree = reader.tree(meta.head, meta.textbookRoot);
  const baseline = reader.tree(meta.parentHead, meta.textbookRoot);
  if (
    baseline.get(meta.sourcePath)?.sha !== meta.handoffBlobSha ||
    baseline.get(meta.parentPath)?.sha !== meta.parentBlobSha ||
    baseline.get(stubPath(meta))?.sha !== meta.stubBlobSha ||
    tree.get(meta.sourcePath)?.sha !== meta.sourceBlobSha ||
    tree.get(meta.parentPath)?.sha !== meta.parentBlobSha ||
    tree.get(stubPath(meta))?.sha !== meta.stubBlobSha
  )
    throw Error('Sealed Assessment original sources changed');
  const seed = parseAssessmentSeed(reader.blob(baseline.get(meta.sourcePath), meta.sourcePath));
  if (
    seed.config.id !== manifest.assessmentId ||
    deriveCourseEntityId(
      meta.courseId,
      'assessment',
      meta.placement.includes('/')
        ? meta.placement.split('/').slice(0, -1).join('/') + '/content/' + meta.placement.split('/').at(-1)
        : meta.placement,
    ) !== seed.config.id
  )
    throw Error('Assessment manifest identity differs from reviewed Course seed');
  checkAssessmentBanks(meta, seed, manifest.selectedQuestionIds, reader, tree);
  let size = 0;
  const files = manifest.entries.map(entry => {
    const bytes = Buffer.from(entry.data ?? '', 'base64');
    size += bytes.length;
    if (
      !entry ||
      !entry.path ||
      typeof entry.kind !== 'string' ||
      !/^[A-Za-z0-9+/]*={0,2}$/.test(entry.data ?? '') ||
      bytes.toString('base64') !== entry.data ||
      !bytes.length ||
      size > maxBytes ||
      !Buffer.from(bytes.toString('utf8'), 'utf8').equals(bytes) ||
      sha256(bytes) !== entry.sha256
    )
      throw Error('Invalid Assessment artifact file hashes or UTF-8');
    return { path: entry.path, kind: entry.kind, content: bytes.toString('utf8') };
  });
  checkAssessmentTargets(meta, files, tree);
  verifyPendingCourseParent(reader.blob(tree.get(meta.parentPath), meta.parentPath), {
    kind: 'assessment',
    id: seed.config.id,
    slug: seed.config.slug,
    placement: meta.placement,
    stubSource: reader.blob(tree.get(stubPath(meta)), stubPath(meta)),
  });
  return manifest;
}

function readManifest(filename) {
  if (
    !filename ||
    fs.lstatSync(filename).isSymbolicLink() ||
    !fs.statSync(filename).isFile() ||
    fs.statSync(filename).size > 48 * 1024 * 1024
  )
    throw Error('Missing or unsafe Assessment analysis manifest');
  return JSON.parse(fs.readFileSync(filename, 'utf8'));
}
async function main() {
  const mode = process.argv[2];
  if (!['analyze', 'publish'].includes(mode) || process.argv.length !== 3)
    throw Error('Usage: assessment-transaction.mjs analyze|publish');
  const meta = parseAssessmentMetadata(process.env.ASSESSMENT_META_B64);
  const filename = process.env.ASSESSMENT_MANIFEST;
  if (mode === 'analyze') {
    if (process.env.GH_TOKEN || process.env.GITHUB_TOKEN)
      throw Error('Read-only Assessment analysis cannot access GitHub credentials');
    const manifest = await prepareAssessment(meta, process.env.ASSESSMENT_HEAD_ROOT);
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, JSON.stringify(manifest));
    report(
      'Assessment source plan: ' +
        manifest.entries.length +
        ' Assessment-owned files; Course parent and stub retained; release remains blocked.',
    );
    return;
  }
  await requireActor(meta.actor);
  if (!sameAssessmentMeta(await inspectAssessment(meta.number, meta.parentNumber, meta), meta))
    throw Error('Assessment authorization changed before publishing');
  const manifest = readManifest(filename);
  verifyDirectAssessmentManifest(meta, manifest, process.env.ASSESSMENT_HEAD_ROOT);
  const original = await github('git/commits/' + meta.head);
  if (original?.sha !== meta.head || !SHA.test(original.tree?.sha ?? ''))
    throw Error('Missing exact reviewed Assessment Git commit');
  const nextTree = await github('git/trees', 'POST', {
    base_tree: original.tree.sha,
    tree: assessmentCommitTree(manifest),
  });
  if (!SHA.test(nextTree?.sha ?? '')) throw Error('Invalid Assessment generated Git tree');
  const nextCommit = await github('git/commits', 'POST', {
    message:
      'Materialize reviewed Assessment ' +
      manifest.assessmentId +
      '\n\nAssessment-PR: #' +
      meta.number +
      '\nCourse-PR: #' +
      meta.parentNumber +
      '\nSource-Blob: ' +
      meta.sourceBlobSha,
    tree: nextTree.sha,
    parents: [meta.head],
  });
  if (!SHA.test(nextCommit?.sha ?? '')) throw Error('Invalid Assessment materialization commit');
  if (!sameAssessmentMeta(await inspectAssessment(meta.number, meta.parentNumber, meta), meta))
    throw Error('Assessment or Course branch moved before Git ref publication');
  const updated = await github('git/refs/heads/' + meta.branch, 'PATCH', {
    sha: nextCommit.sha,
    force: false,
  });
  if (updated?.object?.sha !== nextCommit.sha)
    throw Error('Assessment branch did not advance to the authorized atomic source commit');
  report(
    'Assessment Stage 4 committed ' +
      nextCommit.sha +
      '; draft consumed while Course parent/stub remain unchanged. Resources, translations and human QA remain pending.',
  );
}
if (process.argv[1]?.endsWith('/assessment-transaction.mjs')) {
  main().catch(error => {
    report('Assessment transaction rejected: ' + error.message);
    process.exitCode = 1;
  });
}
