/**
 * Source-only bank Scene handoff. Reuse the same six-file executable draft
 * templates as Lesson/Episode, and do not claim to implement or register Scenes.
 * The trusted no-token verifier must re-derive the exact files from reviewed
 * source, establish UUID ownership, and seal them before any privileged write.
 */
import { renderSceneFiles } from '../scene/materializeScene';
import { assertBankUuid } from './bankSourceSafety';
import type { BankSourceFile } from './bankSourceSafety';
import type { AssessmentBlockEvidence } from './materializeAssessmentBlock';

const record = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

export type BankSceneDraft = {
  id: string;
  slug: string;
  documentLanguage: string;
  specification: string;
};

export function collectBankSceneDrafts(
  input: unknown,
  documentLanguage: string,
  evidence: AssessmentBlockEvidence,
): BankSceneDraft[] {
  const visited = new WeakSet<object>();
  const seen = new Set<string>();
  const result: BankSceneDraft[] = [];
  function visit(value: unknown): void {
    if (!value || typeof value !== 'object' || visited.has(value)) return;
    visited.add(value);
    if (Array.isArray(value)) {
      for (const child of value) visit(child);
      return;
    }
    if (!record(value)) return;
    const config = record(value.config) ? value.config : value;
    if (config.type === 'scene') {
      assertBankUuid(config.id as string, 'Bank Scene UUID');
      const id = (config.id as string).toLowerCase();
      if (seen.has(id)) throw new Error('Bank Scene UUID occurs more than once: ' + id);
      seen.add(id);
      if (evidence.newSceneIds?.has(id)) {
        const spec = record(value.production) ? value.production.specification : undefined;
        if (typeof spec !== 'string' || !spec.trim())
          throw new Error('New Bank Scene requires independently reviewed production.specification: ' + id);
        if (typeof config.slug !== 'string' || !/^[a-z][A-Za-z0-9]*$/.test(config.slug))
          throw new Error('New Bank Scene requires canonical slug: ' + id);
        result.push({ id, slug: config.slug, documentLanguage, specification: spec });
      }
      return;
    }
    for (const [key, part] of Object.entries(config)) {
      if (!['id', 'slug', 'type', 'params', 'locale', 'production'].includes(key)) visit(part);
    }
  }
  visit(input);
  for (const id of evidence.newSceneIds ?? []) {
    if (!seen.has(id)) throw new Error('Unowned Bank Scene scaffold identity: ' + id);
  }
  return result.sort((a, b) => a.id.localeCompare(b.id, 'en'));
}

export function materializeBankSceneDrafts(
  input: unknown,
  documentLanguage: string,
  evidence: AssessmentBlockEvidence,
): BankSourceFile[] {
  const output: BankSourceFile[] = [];
  for (const scene of collectBankSceneDrafts(input, documentLanguage, evidence)) {
    const folder = 'scenes/' + scene.id.at(-1) + '/' + scene.id + '/';
    for (const [name, content] of renderSceneFiles(scene)) {
      output.push({ path: folder + name, kind: name.endsWith('.css') ? 'code' : 'typescript', content });
    }
  }
  return output;
}
