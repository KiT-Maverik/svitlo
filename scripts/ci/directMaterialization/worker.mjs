/** One reviewed authored TypeScript entrypoint runs in the credential-free sandbox.
 * Git authorization, reference verification and all Git writes remain outside.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { createJiti } from 'jiti';

const require = createRequire(import.meta.url);
const {
  executeMaterializerEntrypoint,
} = require('./shared/engine/dist/generators/materializers/directMaterialization/directMaterialization.js');
const { operation, source } = JSON.parse(fs.readFileSync(0, 'utf8'));
const sha = /^[a-f0-9]{40}$/i;
const name = '[a-z][a-z0-9-]*';
const uuid = '[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}';
const root = 'content/' + name + '/data/';
const patterns = {
  'lesson-stage6': new RegExp('^' + root + 'lessons/[a-f0-9]/' + uuid + '/draft\\.ts$', 'i'),
  'questions-stage5': new RegExp('^' + root + 'lessons/[a-f0-9]/' + uuid + '/questions/draft\\.ts$', 'i'),
  'flashcards-stage5': new RegExp('^' + root + 'lessons/[a-f0-9]/' + uuid + '/flashcards/draft\\.ts$', 'i'),
  'course-stage5': new RegExp('^' + root + 'courses/[a-f0-9]/' + uuid + '/draft\\.ts$', 'i'),
  'episode-stage5': new RegExp(
    '^' + root + 'courses/[a-f0-9]/' + uuid + '/content/(?:[A-Za-z][A-Za-z0-9]*/)*[A-Za-z][A-Za-z0-9]*/draft\\.ts$',
    'i',
  ),
};
if (
  !Object.hasOwn(patterns, operation) ||
  !patterns[operation].test(source?.sourcePath ?? '') ||
  !sha.test(source?.sourceBlobSha ?? '') ||
  !sha.test(source?.sourceCommitSha ?? '')
)
  throw Error('Unsupported materializer request');
const entrypoint = path.resolve('/work', source.sourcePath);
const bytes = fs.readFileSync(entrypoint);
if (!Buffer.from(bytes.toString('utf8'), 'utf8').equals(bytes)) throw Error('Invalid candidate UTF-8');
const blobSha = createHash('sha1')
  .update('blob ' + bytes.length + '\0')
  .update(bytes)
  .digest('hex');
if (blobSha !== source.sourceBlobSha) throw Error('Candidate source blob mismatch');
const sourceText = bytes.toString('utf8');
const jiti = createJiti(import.meta.url, { fsCache: false });

const selectedBank =
  operation === 'questions-stage5' ? 'questions' : operation === 'flashcards-stage5' ? 'flashcards' : null;
let capturedInput;
const approvedBlockIdentifiers = input => {
  const registeredSceneIds = new Set();
  const newSceneIds = new Set();
  const existingDraftSceneIds = new Set();
  const approvedMediaBlockIds = new Set();
  const book = source.sourcePath.split('/').slice(0, 2).join('/');
  const visited = new WeakSet();
  function walk(value) {
    if (!value || typeof value !== 'object' || visited.has(value)) return;
    visited.add(value);
    if (Array.isArray(value)) {
      for (const entry of value) walk(entry);
      return;
    }
    const config = value.config && typeof value.config === 'object' ? value.config : value;
    if (typeof config.id === 'string') {
      if (config.type === 'scene') {
        if (!/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/.test(config.id))
          throw Error('Bank Scene requires canonical UUID');
        const index = book + '/scenes/' + config.id.at(-1) + '/' + config.id + '/index.ts';
        let current = '/work';
        let absent = false;
        for (const part of index.split('/')) {
          current = path.join(current, part);
          let stat;
          try {
            stat = fs.lstatSync(current);
          } catch (error) {
            if (error?.code !== 'ENOENT') throw error;
            absent = true;
            break;
          }
          if (stat.isSymbolicLink()) throw Error('Symlink in Bank Scene implementation path: ' + index);
        }
        if (absent) newSceneIds.add(config.id);
        else if (fs.readFileSync(current, 'utf8').includes('TODO (BLOCKER)'))
          existingDraftSceneIds.add(config.id);
        else registeredSceneIds.add(config.id);
      } else if (['image', 'audio', 'video', 'subtitles', 'youtube'].includes(config.type))
        approvedMediaBlockIds.add(config.id);
    }
    for (const [key, part] of Object.entries(value)) if (key !== 'production') walk(part);
  }
  walk(input?.config);
  return { registeredSceneIds, newSceneIds, existingDraftSceneIds, approvedMediaBlockIds };
};
const { parseLessonLanguageConstants, assertBankLessonLanguages } = require(
  './shared/engine/dist/generators/materializers/bankSource/lessonLanguageOwnership.js',
);
const bankOptions = input => {
  capturedInput = input;
  const ownerLessonId = source.sourcePath.split('/')[5];
  const rootParts = source.sourcePath.split('/').slice(0, 6);
  let ownerFile = '/work';
  for (const segment of rootParts.concat('constants.ts')) {
    ownerFile = path.join(ownerFile, segment);
    if (fs.lstatSync(ownerFile).isSymbolicLink()) throw Error('Unsafe owning Lesson constants.ts symlink');
  }
  if (!sha.test(source.lessonConstantsBlobSha ?? '')) throw Error('Missing pinned owning Lesson constants SHA');
  const ownerBytes = fs.readFileSync(ownerFile);
  const ownerBlob = createHash('sha1')
    .update('blob ' + ownerBytes.length + '\0')
    .update(ownerBytes)
    .digest('hex');
  if (ownerBlob !== source.lessonConstantsBlobSha)
    throw Error('Owning Lesson constants.ts differs from reviewed base');
  const ownerLanguages = parseLessonLanguageConstants(ownerBytes.toString('utf8'));
  const requestedLanguages =
    selectedBank === 'questions' ? input?.production?.languages : input?.production?.lesson?.languages;
  assertBankLessonLanguages(ownerLanguages, requestedLanguages);
  const sourceAuthorization = {
    content: sourceText,
    blobSha: source.sourceBlobSha,
    commitSha: source.sourceCommitSha,
    inputSha256: createHash('sha256')
      .update(JSON.stringify(input, null, 2))
      .digest('hex'),
  };
  const snapshot = {
    complete: true,
    expectedHeadSha: source.sourceCommitSha,
    observedHeadSha: source.sourceCommitSha,
    entries: { [selectedBank + '/draft.ts']: { kind: 'file', content: sourceText } },
  };
  const base = {
    ownerLessonId,
    source: sourceAuthorization,
    snapshot,
    blocks: approvedBlockIdentifiers(input),
    ownerLanguages,
  };
  if (selectedBank === 'questions') return base;
  return {
    ...base,
    lessonSourceSha: input.production?.lesson?.sourceSha,
    referenceSourceSha: input.production?.lesson?.reference?.sourceSha,
  };
};
const courseRoot = source.sourcePath.match(
  /^(content\/[a-z][a-z0-9-]*)\/data\/courses\/([a-f0-9])\/([a-f0-9-]{36})\//i,
);
const options =
  operation === 'lesson-stage6'
    ? {
        source,
        sourceText,
        verifySourceInput: (_input, pinned, text) =>
          pinned.sourcePath === source.sourcePath &&
          pinned.sourceBlobSha === source.sourceBlobSha &&
          pinned.sourceCommitSha === source.sourceCommitSha &&
          text === sourceText,
      }
    : operation === 'course-stage5'
      ? {
          textbookRoot: courseRoot?.[1],
          source: {
            sourcePath: source.sourcePath,
            sourceBlobSha: source.sourceBlobSha,
          },
          verifySource: ({ source: pinned, textbookRoot }) =>
            pinned.sourcePath === source.sourcePath &&
            pinned.sourceBlobSha === source.sourceBlobSha &&
            textbookRoot === courseRoot?.[1],
        }
      : operation === 'episode-stage5'
        ? { source }
        : undefined;
const plan = await executeMaterializerEntrypoint(
  operation,
  options,
  () => jiti.import(entrypoint),
  selectedBank
    ? bankOptions
    : operation === 'episode-stage5'
      ? input => {
          capturedInput = input;
          return options;
        }
      : undefined,
);
process.stdout.write(
  JSON.stringify(
    selectedBank || operation === 'episode-stage5' ? { plan, input: capturedInput } : plan,
  ),
);
