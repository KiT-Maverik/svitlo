import { createHash } from 'node:crypto';

const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const segment = /^[A-Za-z][A-Za-z0-9]*$/;

/**
 * Preserve the historical Course UUID allocation namespace:
 * sha1("svitlo-course-source-v1:<root>:<kind>:<full-placement>").
 * The generated UUID is persisted in the first materialized source; after
 * that, a moved/renamed entity must retain its explicit saved identity.
 */
export function deriveCourseEntityId(courseId, kind, placement) {
  if (
    typeof courseId !== 'string' ||
    !uuid.test(courseId) ||
    typeof kind !== 'string' ||
    !segment.test(kind) ||
    typeof placement !== 'string' ||
    !placement ||
    placement.split('/').some(part => !segment.test(part) || ['constructor', 'prototype', '__proto__'].includes(part))
  )
    throw new Error('invalid deterministic Course entity identity/placement');
  const bytes = createHash('sha1')
    .update('svitlo-course-source-v1:' + courseId + ':' + kind + ':' + placement)
    .digest()
    .subarray(0, 16);
  bytes[6] = (bytes[6] & 15) | 80;
  bytes[8] = (bytes[8] & 63) | 128;
  const hex = bytes.toString('hex');
  return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join('-');
}
