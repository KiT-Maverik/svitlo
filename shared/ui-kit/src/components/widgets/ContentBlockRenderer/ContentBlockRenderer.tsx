'use client';

import { Fragment, type ReactNode } from 'react';
import { Audio } from './blocks/Audio/Audio';
import { Checkpoint } from './blocks/Checkpoint/Checkpoint';
import { Code } from './blocks/Code/Code';
import { Image } from './blocks/Image/Image';
import { Markdown } from './blocks/Markdown/Markdown';
import { Scene } from './blocks/Scene/Scene';
import { ContentBlock_Text } from './blocks/Text/Text';
import { Video } from './blocks/Video/Video';
import { Youtube } from './blocks/Youtube/Youtube';
import type { ContentBlockRendererProps, ContentBlockResponse, SceneRegistry } from '#types/content-blocks';
import { assertNever, requireTaggedResponse } from './utils';
import { ContentLanguageContext, useContentLanguage } from './ContentLanguageContext';

export type {
  ContentBlockRendererProps,
  ContentBlockResponse,
  ContentBlockType,
  ResponseOf,
  SceneRegistry,
} from '#types/content-blocks';

function renderBlock(response: ContentBlockResponse, messages: ContentBlockRendererProps['messages'], sceneRegistry?: SceneRegistry): ReactNode {
  requireTaggedResponse(response);
  const nested = (block: ContentBlockResponse) => renderBlock(block, messages, sceneRegistry);

  switch (response.type) {
    case 'text': return <ContentBlock_Text {...response} />;
    case 'markdown': return <Markdown {...response} />;
    case 'checkpoint': return <Checkpoint {...response} messages={messages.checkpoint} renderNested={nested} />;
    case 'scene': return <Scene response={response} sceneRegistry={sceneRegistry} />;
    case 'code': return <Code {...response} />;
    case 'audio': return <Audio {...response} messages={messages.audio} />;
    case 'video': return <Video {...response} messages={messages.video} />;
    case 'youtube': return <Youtube {...response} messages={messages.youtube} />;
    case 'image': return <Image {...response} messages={messages.image} />;
    default: return assertNever(response);
  }
}

/** Render an ordered array of serialized content blocks. */
export function ContentBlockRenderer({ blocks, sceneRegistry, language, messages }: ContentBlockRendererProps): ReactNode {
  const inheritedLanguage = useContentLanguage();
  if (!blocks?.length) return null;
  return (
    <ContentLanguageContext.Provider value={language ?? inheritedLanguage}>
      {blocks.map(block => (
        <Fragment key={`${block.type}:${block.id}`}>{renderBlock(block, messages, sceneRegistry)}</Fragment>
      ))}
    </ContentLanguageContext.Provider>
  );
}
