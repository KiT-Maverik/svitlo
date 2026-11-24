/** Credentialed publisher recomputes the one permitted Course parent edit.
 * Source comments, TODO markers and author-supplied orderPath are not contracts.
 * The pinned parent stub and its actual content.items/order prove the slot.
 */
import { verifyReservedParentSlot } from '../directMaterialization/reserved-parent-slot.mjs';

export function verifyReservedEpisodeParent(source, candidate, { placement, slug, episodeId, exportName }) {
  return verifyReservedParentSlot(source, candidate, {
    kind: 'episode',
    id: episodeId,
    slug,
    placement,
    exportName,
  });
}
