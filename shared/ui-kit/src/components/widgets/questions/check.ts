import type { AnswerMap, FillBlankPart, Item, QuestionOf, QuestionType, TextNormalization } from './types';
import type { CheckResult } from './check-result';

const empty: CheckResult = { status: 'incomplete', reason: 'empty' };
const invalid = (reason: Extract<CheckResult, { status: 'invalid' }>['reason']): CheckResult => ({
  status: 'invalid',
  reason,
});
const grade = (correct: boolean): CheckResult => ({ status: correct ? 'correct' : 'incorrect' });
const equal = (a: string[], b: string[]) => a.length === b.length && a.every((id, i) => id === b[i]);
const unique = (ids: string[]) => new Set(ids).size === ids.length;
const validItems = (items: Item[]) =>
  items.length > 0 && items.every(i => i.id.length > 0) && unique(items.map(i => i.id));
const contains = (items: Item[], id: string) => items.some(i => i.id === id);
const blankIds = (parts: FillBlankPart[]) =>
  parts.filter((part): part is Extract<FillBlankPart, { type: 'blank' }> => part.type === 'blank').map(part => part.id);
const validParts = (parts: FillBlankPart[]) => {
  const ids = blankIds(parts);
  return (
    parts.length > 0 &&
    ids.length > 0 &&
    ids.every(Boolean) &&
    unique(ids) &&
    parts.every(part => (part.type === 'blank' ? Boolean(part.id) : typeof part.text === 'string'))
  );
};
function validateIds(ids: string[], items: Item[]): CheckResult | undefined {
  if (!unique(ids)) return invalid('duplicate-id');
  if (ids.some(id => !contains(items, id))) return invalid('unknown-id');
}
export function normalizeText(value: string, rules: TextNormalization): string {
  let normalized = rules.trim ? value.trim() : value;
  if (rules.collapseWhitespace) normalized = normalized.replace(/\s+/gu, ' ');
  if (rules.ignoreCase) normalized = normalized.toLowerCase();
  return normalized;
}
// Decimal notation only: no grouping, exponents, hex, Infinity or partial parses.
export function parseAnswerWithNumber(value: string): number | null {
  const text = value.trim();
  if (!/^[+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+)$/u.test(text)) return null;
  const number = Number(text.replace(',', '.'));
  return Number.isFinite(number) ? number : null;
}
type Checker<K extends QuestionType> = (q: QuestionOf<K>, value: AnswerMap[K]) => CheckResult;
export const checkers: { [K in QuestionType]: Checker<K> } = {
  'single-select': (q, value) => {
    if (!validItems(q.options) || !contains(q.options, q.correctId)) return invalid('definition');
    if (value === null || value === '') return empty;
    if (!contains(q.options, value)) return invalid('unknown-id');
    return grade((q.acceptedIds ?? [q.correctId]).includes(value));
  },
  'multiple-select': (q, value) => {
    if (!validItems(q.options) || !q.correctIds.length || validateIds(q.correctIds, q.options))
      return invalid('definition');
    const issue = validateIds(value, q.options);
    if (issue) return issue;
    if (!value.length) return empty;
    return grade(value.length === q.correctIds.length && value.every(id => q.correctIds.includes(id)));
  },
  matching: (q, value) => {
    if (
      !validItems(q.left) ||
      !validItems(q.right) ||
      q.left.length !== q.right.length ||
      q.pairs.length !== q.left.length ||
      !unique(q.pairs.map(p => p.id)) ||
      q.pairs.some(p => !p.id || !contains(q.left, p.leftId) || !contains(q.right, p.rightId)) ||
      !unique(q.pairs.map(p => p.leftId)) ||
      !unique(q.pairs.map(p => p.rightId))
    )
      return invalid('definition');
    if (Object.keys(value).some(id => !contains(q.left, id))) return invalid('unknown-id');
    const selected = Object.values(value).filter(Boolean);
    const issue = validateIds(selected, q.right);
    if (issue) return issue;
    if (!selected.length) return empty;
    if (selected.length !== q.left.length) return { status: 'incomplete', reason: 'missing-items' };
    return grade(q.pairs.every(p => value[p.leftId] === p.rightId));
  },
  'short-text': (q, value) => {
    if (!q.acceptedAnswers.length || q.acceptedAnswers.some(a => !a.trim())) return invalid('definition');
    if (!value.trim()) return empty;
    return grade(
      q.acceptedAnswers.some(a => normalizeText(a, q.normalization) === normalizeText(value, q.normalization)),
    );
  },
  numeric: (q, value) => {
    if (!Number.isFinite(q.expected) || !Number.isFinite(q.tolerance) || q.tolerance < 0) return invalid('definition');
    if (!value.trim()) return empty;
    const number = parseAnswerWithNumber(value);
    if (number === null) return invalid('number-format');
    // Compensate only for binary floating-point rounding at the inclusive boundary.
    return grade((q.acceptedNumbers ?? [q.expected]).some(expected => {
      const rounding = q.tolerance === 0 ? 0 : Number.EPSILON * Math.max(Math.abs(number), Math.abs(expected), q.tolerance) * 2;
      return Math.abs(number - expected) <= q.tolerance + rounding;
    }));
  },
  ordering: (q, value) => {
    if (!validItems(q.items) || q.correctOrder.length !== q.items.length || validateIds(q.correctOrder, q.items))
      return invalid('definition');
    const issue = validateIds(value, q.items);
    if (issue) return issue;
    if (!value.length) return empty;
    if (value.length !== q.items.length) return { status: 'incomplete', reason: 'missing-items' };
    return grade(equal(value, q.correctOrder));
  },
  'block-builder': (q, value) => {
    if (
      !validItems(q.blocks) ||
      !q.acceptedSequences.length ||
      q.acceptedSequences.some(s => !s.length || validateIds(s, q.blocks))
    )
      return invalid('definition');
    const issue = validateIds(value, q.blocks);
    if (issue) return issue;
    if (!value.length) return empty;
    // A proper prefix can still be completed. Other nonempty sequences are graded.
    if (q.acceptedSequences.some(s => equal(s, value))) return grade(true);
    if (q.acceptedSequences.some(s => value.length < s.length && value.every((id, i) => s[i] === id)))
      return { status: 'incomplete', reason: 'missing-items' };
    return grade(false);
  },
  'fill-blanks-drag': (q, value) => {
    const blanks = blankIds(q.parts);
    const correctIds = Object.keys(q.correctBlocks);
    if (
      !validParts(q.parts) ||
      !validItems(q.blocks) ||
      correctIds.length !== blanks.length ||
      correctIds.some(id => !blanks.includes(id)) ||
      blanks.some(id => !contains(q.blocks, q.correctBlocks[id])) ||
      !unique(Object.values(q.correctBlocks))
    )
      return invalid('definition');
    if (Object.keys(value).some(id => !blanks.includes(id))) return invalid('unknown-id');
    const selected = Object.values(value).filter((id): id is string => Boolean(id));
    if (selected.some(id => !contains(q.blocks, id))) return invalid('unknown-id');
    if (!unique(selected)) return invalid('duplicate-id');
    if (!selected.length) return empty;
    if (selected.length !== blanks.length) return { status: 'incomplete', reason: 'missing-items' };
    return grade(blanks.every(id => value[id] === q.correctBlocks[id]));
  },
  'fill-blanks-text': (q, value) => {
    const blanks = blankIds(q.parts);
    const acceptedIds = Object.keys(q.acceptedAnswers);
    if (
      !validParts(q.parts) ||
      acceptedIds.length !== blanks.length ||
      acceptedIds.some(id => !blanks.includes(id)) ||
      blanks.some(id => !q.acceptedAnswers[id]?.length || q.acceptedAnswers[id].some(answer => !answer.trim()))
    )
      return invalid('definition');
    if (Object.keys(value).some(id => !blanks.includes(id))) return invalid('unknown-id');
    const filled = blanks.filter(id => Boolean(value[id]?.trim()));
    if (!filled.length) return empty;
    if (filled.length !== blanks.length) return { status: 'incomplete', reason: 'missing-items' };
    return grade(
      blanks.every(id =>
        q.acceptedAnswers[id].some(
          answer => normalizeText(answer, q.normalization) === normalizeText(value[id], q.normalization),
        ),
      ),
    );
  },
};
