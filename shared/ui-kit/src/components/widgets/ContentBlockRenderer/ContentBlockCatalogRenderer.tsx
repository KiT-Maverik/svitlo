'use client';

import type { ReactNode } from 'react';
import { ContentBlockRenderer } from './ContentBlockRenderer';
import type {
  ContentBlockReference,
  ContentBlockRenderContext,
  ContentBlockRendererProps,
  NestedResponse,
  ResponseCatalog,
} from './types';
import { supportedTypes } from './utils';

/** Resolve a type-grouped catalog against an explicitly ordered list. */
export function ContentBlockCatalogRenderer({
  catalog,
  order,
  ...context
}: ContentBlockRenderContext & {
  catalog: ResponseCatalog;
  order: readonly ContentBlockReference[];
}): ReactNode {
  const catalogKeys = new Set<string>();
  for (const [type, blocks] of Object.entries(catalog)) {
    if (!supportedTypes.has(type)) throw new Error('Unsupported catalog content type: ' + type);
    if (blocks) for (const key of Object.keys(blocks)) catalogKeys.add(type + ':' + key);
  }
  const rendered = new Set<string>();
  const content = order.map(({ type, key }) => {
    const identity = type + ':' + key;
    if (rendered.has(identity)) throw new Error('Duplicate content reference: ' + identity);
    rendered.add(identity);
    if (!catalogKeys.has(identity)) throw new Error('Missing content reference: ' + identity);

    // The catalog key and block type are checked together above. The assertion
    // restores their correlation after indexing a discriminated union by type.
    const blocks = catalog[type] as Readonly<Record<string, NestedResponse>>;
    return <ContentBlockRenderer key={identity} {...({ type, response: blocks[key], ...context } as ContentBlockRendererProps)} />;
  });
  if (rendered.size !== catalogKeys.size) {
    throw new Error('Content order omits ' + (catalogKeys.size - rendered.size) + ' catalog block(s)');
  }
  return <>{content}</>;
}
