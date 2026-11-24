/**
 * @fileoverview Trusted review evidence from the existing entity PR description.
 * The command gate separately authorizes its invocation actor. Evidence binds
 * the actual review outcome to Git revisions, not a GitHub reviewer identity.
 */
const SHA = /^[a-f0-9]{40}$/;
const PREFIX = '- Review evidence (v1): ';
const LINE =
  /^- Review evidence \(v1\): (3|4|5|questions-na) \| (accepted|rejected) \| ([a-f0-9]{40}) \| ([a-f0-9]{40})$/;

/** Required stages are in workflow order. Optional stages are explicitly scoped. */
export function parseReviewEvidence(body, requiredStages, allowedStages = requiredStages) {
  if (typeof body !== 'string' || body.length > 65536 || !requiredStages.length)
    throw Error('Missing or oversized PR review evidence');
  const entries = new Map();
  let fence = null;
  let comment = false;
  for (const line of body.split(/\r?\n/)) {
    const delimiter = /^ {0,3}(`{3,}|~{3,})(.*)$/.exec(line);
    const containsEvidence = line.toLowerCase().includes(PREFIX.trim().toLowerCase());
    if (containsEvidence && (fence || comment || delimiter || line.includes('<!--')))
      throw Error('Review evidence must be a visible PR description record');
    if (!comment && delimiter) {
      if (!fence) fence = delimiter[1];
      else if (delimiter[1][0] === fence[0] && delimiter[1].length >= fence.length && !delimiter[2].trim())
        fence = null;
    }
    if (!fence && !delimiter) {
      for (const token of line.match(/<!--|-->/g) ?? []) comment = token === '<!--';
    }
    if (!containsEvidence) continue;
    const match = LINE.exec(line);
    if (!match) throw Error('Malformed review evidence');
    const [, rawStage, verdict, commit, blob] = match;
    const stage = rawStage === 'questions-na' ? rawStage : Number(rawStage);
    if (!allowedStages.includes(stage) || entries.has(stage))
      throw Error('Unexpected or duplicate review evidence for stage ' + stage);
    if (verdict !== 'accepted') throw Error('Rejected review evidence for stage ' + stage);
    entries.set(stage, { stage, verdict, commit, blob });
  }
  return requiredStages.map(stage => {
    if (!entries.has(stage)) throw Error('Missing accepted review evidence for stage ' + stage);
    return entries.get(stage);
  });
}

/** Verify the current source and, for earlier stages, actual pinned Git history. */
export async function verifyReviewEvidence(body, { stages, allowedStages, head, blob, readBlob, isAncestor }) {
  if (!SHA.test(head ?? '') || !SHA.test(blob ?? '')) throw Error('Invalid reviewed source revision');
  const evidence = parseReviewEvidence(body, stages, allowedStages);
  const latest = evidence.at(-1);
  if (latest.commit !== head || latest.blob !== blob)
    throw Error('Stale review evidence at current HEAD or source blob');
  for (let i = 0; i < evidence.length - 1; i++) {
    const item = evidence[i];
    if ((await readBlob(item.commit)) !== item.blob)
      throw Error('Review evidence does not match historical source blob');
    if (!(await isAncestor(item.commit, evidence[i + 1].commit)))
      throw Error('Review evidence commits are not in ancestry order');
  }
  return evidence;
}
