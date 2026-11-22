/**
 * Source-only bank preflight. The enclosing #775 trusted Git writer must resolve
 * the snapshot at the pinned PR HEAD and atomically commit this entire plan.
 * This module does not read a worktree, write files, approve reviews or publish.
 */
import { createHash } from 'node:crypto';

export type BankSourceFile = {
  path: string;
  content: string;
  kind: 'typescript' | 'markdown' | 'code' | 'specification' | 'archive';
};
export type BankSourceDiagnostic = {
  path: string;
  code: string;
  message: string;
  severity: 'warning';
};
export type BankSourceResult = {
  files: BankSourceFile[];
  diagnostics: BankSourceDiagnostic[];
  /** The existing reviewed Stage 3 index must be replaced only in an atomic commit. */
  transition?: {
    reviewedIndexPath: string;
    reviewedIndexBlobSha: string;
    archivePath: string;
    expectedHeadSha: string;
  };
  /** Always source-only; the independent publisher decides readiness. */
  publishable: false;
};

export type BankSourceSnapshot = {
  /** The trusted caller verified this is the complete scoped Git tree at HEAD. */
  complete: true;
  expectedHeadSha: string;
  observedHeadSha: string;
  entries: Readonly<Record<string, { kind: 'file' | 'symlink' | 'directory'; content?: string }>>;
};

export type BankReviewedSource = {
  /** Exact Stage 3 index.ts bytes, loaded from the approved PR revision. */
  content: string;
  blobSha: string;
  /** Authenticated independent-review evidence; never derived from input Config. */
  approved: true;
  reviewer: string;
  reviewedSourceBlobSha: string;
  /** Trusted evaluation of exact reviewed Stage 3 TS, hashed after validation. */
  reviewedInputSha256: string;
  reviewCommitSha: string;
};

const hexSha = /^[a-f0-9]{40}$/i;
const uuid = /^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/i;
const safeSegment = /^[A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+)*$/;
const nilUuid = '00000000-0000-0000-0000-000000000000';

export function assertBankUuid(id: string, at: string): void {
  if (!uuid.test(id) || id.toLowerCase() === nilUuid) throw new Error(at + ': real non-Nil UUID required');
}
export function assertBankSha(sha: string, at: string): void {
  if (!hexSha.test(sha)) throw new Error(at + ': verified 40-character Git SHA required');
}
export function assertBankStatement(value: unknown, at: string): void {
  if (typeof value !== 'string' || !value.trim()) throw new Error(at + ': nonempty reviewed rationale/evidence required');
}
export function assertBankPath(value: string): void {
  if (!value || value.startsWith('/') || value.includes('\\') ||
      value.split('/').some(segment => !safeSegment.test(segment) ||
        segment === '.' || segment === '..' || segment === '__proto__' || segment === 'constructor')) {
    throw new Error('Unsafe bank source path: ' + value);
  }
}
export function assertBankOrder(
  items: Readonly<Record<string, unknown>>,
  order: readonly string[],
  at: string,
  nonempty: boolean,
): void {
  if (!items || typeof items !== 'object' || Array.isArray(items) || !Array.isArray(order)) {
    throw new Error(at + ': expected items/order');
  }
  const keys = Object.keys(items);
  if (nonempty && !keys.length) throw new Error(at + ': empty final inventory');
  if (keys.length !== order.length || new Set(order).size !== keys.length ||
      order.some(key => !Object.hasOwn(items, key))) {
    throw new Error(at + ': order must enumerate every member exactly once');
  }
  for (const key of keys) {
    if (!/^[a-z][A-Za-z0-9]*$/.test(key) ||
        key === 'constructor' || key === '__proto__' || key === 'prototype') {
      throw new Error(at + ': unsafe item slug ' + key);
    }
  }
}
export function assertBankLanguages(
  value: { document: string; planned: readonly string[] },
): void {
  if (!value || !/^[a-z]{2}(?:-[A-Z]{2})?$/.test(value.document) ||
      !Array.isArray(value.planned) || !value.planned.length ||
      new Set(value.planned).size !== value.planned.length ||
      !value.planned.includes(value.document) ||
      value.planned.some(v => !/^[a-z]{2}(?:-[A-Z]{2})?$/.test(v))) {
    throw new Error('Bank must retain a real document locale and unique planned locales');
  }
}

/** JSON values are valid readable TypeScript literals; reject undefined and opaque executable objects. */
export function authoredBankLiteral(input: unknown): string {
  const visited = new WeakSet<object>();
  function assertPlain(value: unknown, at: string): void {
    if (value === null || typeof value === 'string' || typeof value === 'boolean') return;
    if (typeof value === 'number' && Number.isFinite(value)) return;
    if (typeof value !== 'object') throw new Error(at + ': unsupported editor value');
    if (visited.has(value)) throw new Error(at + ': circular editor value');
    if (!Array.isArray(value) && Object.getPrototypeOf(value) !== Object.prototype &&
        Object.getPrototypeOf(value) !== null) throw new Error(at + ': non-plain editor value');
    visited.add(value);
    for (const [key, item] of Object.entries(value)) {
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        throw new Error(at + ': unsafe object key');
      }
      assertPlain(item, at + '.' + key);
    }
    visited.delete(value);
  }
  assertPlain(input, '$');
  return JSON.stringify(input, null, 2);
}

/** Pin structured data to the independently reviewed source's trusted evaluation. */
export function assertReviewedBankInput(input: unknown, reviewed: BankReviewedSource): void {
  if (!/^[a-f0-9]{64}$/i.test(reviewed.reviewedInputSha256)) {
    throw new Error('Verified structured review input SHA-256 is required');
  }
  const current = createHash('sha256').update(authoredBankLiteral(input), 'utf8').digest('hex');
  if (current !== reviewed.reviewedInputSha256) {
    throw new Error('Structured bank input differs from the independently reviewed Stage 3 source');
  }
}

export function gitBlobSha(contents: string): string {
  return createHash('sha1').update('blob ' + Buffer.byteLength(contents) + '\0').update(contents).digest('hex');
}

export function preflightBankSource(
  files: BankSourceFile[],
  snapshot: BankSourceSnapshot,
  transition?: { indexPath: string; archivePath: string; reviewed: BankReviewedSource },
): BankSourceResult {
  if (snapshot.complete !== true) throw new Error('Trusted complete Git tree snapshot required');
  assertBankSha(snapshot.expectedHeadSha, 'expected HEAD');
  if (snapshot.expectedHeadSha !== snapshot.observedHeadSha) throw new Error('Stale PR HEAD');
  const unique = new Set<string>();
  for (const file of files) {
    assertBankPath(file.path);
    if (unique.has(file.path)) throw new Error('Duplicate generated source path: ' + file.path);
    unique.add(file.path);
    if (!['typescript', 'markdown', 'code', 'specification', 'archive'].includes(file.kind) ||
        typeof file.content !== 'string') {
      throw new Error('Invalid source file at ' + file.path);
    }
    const parts = file.path.split('/');
    for (let n = 1; n < parts.length; n++) {
      const ancestor = snapshot.entries[parts.slice(0, n).join('/')];
      if (ancestor && ancestor.kind !== 'directory') {
        throw new Error('Unsafe non-directory/symlink ancestor for ' + file.path);
      }
    }
    const prior = snapshot.entries[file.path];
    if (prior?.kind === 'symlink' || prior?.kind === 'directory') {
      throw new Error('Cannot replace a symlink or directory at ' + file.path);
    }
    if (prior && prior.content === undefined) {
      throw new Error('Missing complete existing source bytes at ' + file.path);
    }
    if (prior && prior.content !== file.content &&
        file.path !== transition?.indexPath) {
      throw new Error('Divergent authored source at ' + file.path);
    }
  }
  let verifiedTransition: BankSourceResult['transition'];
  if (transition) {
    const { indexPath, archivePath, reviewed } = transition;
    assertBankPath(indexPath);
    assertBankPath(archivePath);
    if (indexPath === archivePath || !unique.has(indexPath) || !unique.has(archivePath)) {
      throw new Error('Reviewed source archive/index are required in one transition plan');
    }
    assertBankSha(reviewed.blobSha, 'Stage 3 source');
    assertBankSha(reviewed.reviewedSourceBlobSha, 'approved reviewed source');
    assertBankSha(reviewed.reviewCommitSha, 'review revision');
    assertBankStatement(reviewed.reviewer, 'independent reviewer');
    if (reviewed.approved !== true || reviewed.blobSha !== reviewed.reviewedSourceBlobSha ||
        gitBlobSha(reviewed.content) !== reviewed.blobSha) {
      throw new Error('Stage 3 source differs from independently approved bytes');
    }
    const existingIndex = snapshot.entries[indexPath];
    const finalIndex = files.find(file => file.path === indexPath)!;
    const archived = files.find(file => file.path === archivePath)!;
    if (archived.content !== reviewed.content || archived.kind !== 'archive') {
      throw new Error('Reviewed Stage 3 source must be archived byte-for-byte');
    }
    if (!existingIndex || existingIndex.kind !== 'file' ||
        (existingIndex.content !== reviewed.content && existingIndex.content !== finalIndex.content)) {
      throw new Error('Stale, missing or hand-edited Stage 3 index');
    }
    if (existingIndex.content === finalIndex.content &&
        snapshot.entries[archivePath]?.content !== reviewed.content) {
      throw new Error('Partial transition: final index exists without reviewed source archive');
    }
    verifiedTransition = {
      reviewedIndexPath: indexPath,
      reviewedIndexBlobSha: reviewed.blobSha,
      archivePath,
      expectedHeadSha: snapshot.expectedHeadSha,
    };
  } else {
    for (const file of files) {
      const prior = snapshot.entries[file.path];
      if (prior && prior.content !== file.content) {
        throw new Error('Draft source already exists and must never be overwritten');
      }
    }
  }
  return { files: [...files].sort((a,b) => a.path.localeCompare(b.path, 'en')),
    diagnostics: [], transition: verifiedTransition, publishable: false };
}

/** A bank owns full immutable Config identities, not only its top-level members. */
export function assertUniqueBankEntityIds(input: unknown): void {
  const ids = new Map<string, string>();
  const seen = new WeakSet<object>();
  function visit(value: unknown, at: string): void {
    if (value === null || typeof value !== 'object') return;
    if (seen.has(value)) throw new Error(at + ': reused mutable bank source node');
    seen.add(value);
    if (!Array.isArray(value) && Object.hasOwn(value, 'id')) {
      const obj = value as Record<string, unknown>;
      if (typeof obj.type === 'string' || typeof obj.slug === 'string') {
        if (typeof obj.id !== 'string') throw new Error(at + ': missing real immutable UUID');
        assertBankUuid(obj.id, at);
        const key = obj.id.toLowerCase();
        if (ids.has(key)) throw new Error(at + ': duplicate bank entity UUID ' + obj.id + ' (first ' + ids.get(key) + ')');
        ids.set(key, at);
      }
    }
    for (const [key, entry] of Object.entries(value)) visit(entry, at + '.' + key);
  }
  visit(input, 'bank');
}

/** Production-pending nested editorial nodes must not be silently unwrapped. */
export function assertNoPendingBankSources(input: unknown): void {
  const visited = new WeakSet<object>();
  function visit(value: unknown, at: string): void {
    if (value === null || typeof value !== 'object') return;
    if (visited.has(value)) return;
    visited.add(value);
    if (!Array.isArray(value)) {
      const record = value as Record<string, unknown>;
      const production = record.production;
      if (production !== null && typeof production === 'object' &&
          !Array.isArray(production) && (production as Record<string, unknown>).pending === true) {
        throw new Error(at + ': pending bank authoring source cannot be finalized');
      }
    }
    for (const [key, child] of Object.entries(value)) visit(child, at + '.' + key);
  }
  visit(input, 'bank');
}
