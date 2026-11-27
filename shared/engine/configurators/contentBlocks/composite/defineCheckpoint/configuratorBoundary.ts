/** Shallow public Config-schema boundary for an authored child Configurator.
 * A parent checks Build availability and immutable identity, not child semantics.
 */
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

export const hasConfiguratorBuildIdentity = (value: unknown, expectedType?: string): boolean => {
  if (!isRecord(value) || typeof value.type !== 'string' ||
      (expectedType !== undefined && value.type !== expectedType) ||
      typeof value.id !== 'string' || typeof value.slug !== 'string') return false;
  const { config, build } = value;
  return isRecord(config) && isRecord(config.base) &&
    config.base.id === value.id && config.base.slug === value.slug &&
    config.base.type === value.type &&
    isRecord(build) && typeof build.data === 'function' &&
    typeof build.overrides === 'function';
};
