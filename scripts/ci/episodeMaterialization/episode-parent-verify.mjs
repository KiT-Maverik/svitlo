/** Independently verify the exact authorized parent source edit.
 * This is a narrow generated-Source placement verifier, NOT an authored
 * TypeScript parser, source evaluator, or a second materializer.
 * Requires only Node builtins; safe in the credentialed publisher.
 */
const safe = value => typeof value === 'string' && /^[A-Za-z][A-Za-z0-9]*$/.test(value) &&
  !['constructor', '__proto__', 'prototype'].includes(value);
const marker = /^\/\/ TODO \(BLOCKER\): Episode Stage 1 handoffs are not completed Episode Configurators\. Do not publish\.\r?\n\/\/ Reviewed original content order: (.+)\r?\n\/\/ Pending Episode handoffs: (.+)\r?\n/gm;
const content = /(\bconst\s+content\s*=\s*\{\s*items\s*:\s*)(\{[^{}]*\})(\s*,\s*order\s*:\s*)(\[[^\]]*\])(\s*,?\s*\}\s*;)/g;

function parseKeys(text) {
  const payload = text.trim().replace(/^\{|\}$/g, '').trim();
  if (!payload) return [];
  const entries = payload.split(',').map(value => value.trim()).filter(Boolean);
  return entries.map(entry => {
    const match = entry.match(/^(?:"([A-Za-z][A-Za-z0-9]*)"|'([A-Za-z][A-Za-z0-9]*)'|([A-Za-z][A-Za-z0-9]*))\s*:\s*([A-Za-z_$][A-Za-z0-9_$]*)$/);
    if (!match || !safe(match[1] ?? match[2] ?? match[3]))
      throw Error('Unsupported generated parent items map');
    return { key: match[1] ?? match[2] ?? match[3], reference: match[4] };
  });
}
function parseOrder(text) {
  const matches = [...text.matchAll(/["']([A-Za-z][A-Za-z0-9]*)["']/g)];
  if (!matches.every(match => safe(match[1])) ||
      text.replace(/["'][A-Za-z][A-Za-z0-9]*["']/g, '').replace(/[\[\],\s]/g, ''))
    throw Error('Unsupported generated parent order expression');
  return matches.map(match => match[1]);
}
export function verifyReservedEpisodeParent(source, candidate, { placement, slug, episodeId, orderIndex, exportName }) {
  if (!safe(slug) || !Number.isSafeInteger(orderIndex) || orderIndex < 0 ||
      typeof placement !== 'string' || placement.split('/').at(-1) !== slug ||
      !/^[a-f0-9-]{36}$/i.test(episodeId) ||
      !/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(exportName))
    throw Error('Invalid allocated Episode slot identity');
  const target = placement.split('/').length === 2 ? './content/' + slug : './' + slug;
  const alias = 'child_' + slug;
  const addedImport = 'import { ' + exportName + ' as ' + alias + ' } from ' + JSON.stringify(target) + ';\n';
  if (!candidate.startsWith(addedImport) || new RegExp('\\b' + alias + '\\b').test(source))
    throw Error('Episode parent edit added an unauthorized import or identifier');
  const blocks = [...source.matchAll(marker)];
  if (blocks.length !== 1) throw Error('Expected one immutable pending Episode handoff marker');
  const block = blocks[0];
  const originalOrder = JSON.parse(block[1]);
  const pending = JSON.parse(block[2]);
  if (!Array.isArray(originalOrder) || !originalOrder.every(safe) ||
      new Set(originalOrder).size !== originalOrder.length ||
      originalOrder[orderIndex] !== slug ||
      !Array.isArray(pending) ||
      pending.filter(row =>
        row.path === placement && row.slug === slug && row.episodeId === episodeId &&
        row.orderIndex === orderIndex && row.handoffPath === placement + '/draft.ts'
      ).length !== 1 ||
      pending.filter(row => row.slug === slug || row.path === placement || row.episodeId === episodeId).length !== 1)
    throw Error('Episode slot/order differs from the canonical Course handoff');
  const matches = [...source.matchAll(content)];
  if (matches.length !== 1) throw Error('Expected one generated Course content collection');
  const found = matches[0];
  const entries = parseKeys(found[2]);
  const active = parseOrder(found[4]);
  const keys = entries.map(e => e.key);
  if (keys.includes(slug) || new Set(keys).size !== keys.length ||
      keys.some(k => !originalOrder.includes(k)) ||
      JSON.stringify(active) !== JSON.stringify(originalOrder.filter(k => keys.includes(k))))
    throw Error('Generated Course content no longer matches reviewed sibling order');
  const nextItems = entries.map(e => JSON.stringify(e.key) + ': ' + e.reference);
  nextItems.push(JSON.stringify(slug) + ': ' + alias);
  const nextOrder = originalOrder.filter(k => k === slug || keys.includes(k));
  const sourceContent = found[1] + '{ ' + nextItems.join(', ') + ' }' +
    found[3] + JSON.stringify(nextOrder) + found[5];
  let expected = source.replace(found[0], sourceContent);
  const remaining = pending.filter(row => row.path !== placement);
  const replacement = remaining.length
    ? '// TODO (BLOCKER): Episode Stage 1 handoffs are not completed Episode Configurators. Do not publish.\n' +
      '// Reviewed original content order: ' + JSON.stringify(originalOrder) + '\n' +
      '// Pending Episode handoffs: ' + JSON.stringify(remaining) + '\n'
    : '';
  expected = expected.replace(block[0], replacement);
  expected = addedImport + expected;
  if (expected !== candidate)
    throw Error('Episode parent change differs from the exact authorized item/order/marker edit');
  return true;
}
