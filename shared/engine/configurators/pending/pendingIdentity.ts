import { createHash } from 'node:crypto';
import { z } from 'zod';

/**
 * Stable, reserved draft UUIDv8 derived from an existing authored entity UUID and
 * a role-specific path. The feedc0de prefix makes an unresolved reference easy
 * to identify in a source review. This is NOT a bank resource identifier.
 *
 * SHA-256 supplies the variable bits; version 8 and RFC 4122 variant are explicit.
 * No random or process-local state participates in identity generation.
 */
export const pendingUuid = (parentId: string, role: string): string => {
  const id = z.uuid().parse(parentId).toLowerCase();
  const hash = createHash('sha256')
    .update('svitlo:pending:v1\0')
    .update(id)
    .update('\0')
    .update(role)
    .digest('hex');
  return (
    'feedc0de-' +
    hash.slice(8, 12) +
    '-8' +
    hash.slice(13, 16) +
    '-a' +
    hash.slice(17, 20) +
    '-' +
    hash.slice(20, 32)
  );
};
