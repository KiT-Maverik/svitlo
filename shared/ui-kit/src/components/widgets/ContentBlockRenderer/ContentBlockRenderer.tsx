'use client';

import type { ReactNode } from 'react';
import { Audio } from './blocks/Audio/Audio';
import { Checkpoint } from './blocks/Checkpoint/Checkpoint';
import { Code } from './blocks/Code/Code';
import { Image } from './blocks/Image/Image';
import { Markdown } from './blocks/Markdown/Markdown';
import { ContentBlock_Quiz } from './blocks/Quiz/ContentBlock_Quiz';
import { Scene } from './blocks/Scene/Scene';
import { ContentBlock_Text } from './blocks/Text/Text';
import { Video } from './blocks/Video/Video';
import { Youtube } from './blocks/Youtube/Youtube';
import type { ContentBlockRenderContext, ContentBlockRendererProps, NestedResponse } from '#types/content-blocks';
import { assertNever, requireTaggedResponse } from './utils';

export type {
  ContentBlockRenderContext,
  ContentBlockRendererProps,
  ContentBlockReference,
  ContentBlockResponse,
  ContentBlockType,
  SceneRegistry,
} from '#types/content-blocks';
/** Dispatch a nested response through the same parent renderer as top-level blocks. */
function renderNested(response: NestedResponse, context: ContentBlockRenderContext): ReactNode {
  const tagged = requireTaggedResponse(response);
  return <ContentBlockRenderer {...({ type: tagged.type, response: tagged, ...context } as ContentBlockRendererProps)} />;
}

/** The single parent dispatcher for serialized content block responses. */
export function ContentBlockRenderer(props: ContentBlockRendererProps): ReactNode {
  const context = { questions: props.questions, sceneRegistry: props.sceneRegistry };
  const nested = (response: NestedResponse) => renderNested(response, context);

  switch (props.type) {
    case 'text': return <ContentBlock_Text {...props.response} />;
    case 'markdown': return <Markdown response={props.response} />;
    case 'checkpoint': return <Checkpoint response={props.response} renderNested={nested} />;
    case 'scene': return <Scene response={props.response} sceneRegistry={props.sceneRegistry} />;
    case 'code': return <Code response={props.response} />;
    case 'audio': return <Audio response={props.response} />;
    case 'video': return <Video {...props.response} />;
    case 'youtube': return <Youtube {...props.response} />;
    case 'image': return <Image {...props.response} />;
    case 'quiz': return <ContentBlock_Quiz response={props.response} questions={props.questions} renderNested={nested} />;
    default: return assertNever(props);
  }
}
