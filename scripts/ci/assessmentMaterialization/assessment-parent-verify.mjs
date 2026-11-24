/** Trusted Assessment parent edit: one existing UUID-bound draft stub only.
 * The parser inspects the actual Course/Module/Chapter items and order;
 * TODO comments are never used as a source of placement truth.
 */
import {
  replaceReservedParentSlot,
  verifyReservedParentSlot,
} from '../directMaterialization/reserved-parent-slot.mjs';

export function restoreAssessmentPlacement(source, { id, slug, placement, exportName }) {
  return replaceReservedParentSlot(source, {
    kind: 'assessment',
    id,
    slug,
    placement,
    exportName,
  }).content;
}

/** Recompute from pinned original bytes; reject any extra parent edit. */
export function verifyAssessmentParentPatch(source, candidate, { id, slug, placement, exportName }) {
  return verifyReservedParentSlot(source, candidate, {
    kind: 'assessment',
    id,
    slug,
    placement,
    exportName,
  });
}
