'use client';

import type { ReactNode } from 'react';
import { ContentBlock_Audio } from './blocks/Audio/ContentBlock_Audio';
import { ContentBlock_Checkpoint } from './blocks/Checkpoint/ContentBlock_Checkpoint';
import { ContentBlock_Code } from './blocks/Code/ContentBlock_Code';
import { ContentBlock_Image } from './blocks/Image/ContentBlock_Image';
import { ContentBlock_Markdown } from './blocks/Markdown/ContentBlock_Markdown';
import { ContentBlock_Quiz } from './blocks/Quiz/ContentBlock_Quiz';
import { ContentBlock_Scene } from './blocks/Scene/ContentBlock_Scene';
import { ContentBlock_Text } from './blocks/Text/Text';
import { ContentBlock_Video } from './blocks/Video/ContentBlock_Video';
import { ContentBlock_Youtube } from './blocks/Youtube/Youtube';
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
    case 'markdown': return <ContentBlock_Markdown response={props.response} />;
    case 'checkpoint': return <ContentBlock_Checkpoint response={props.response} renderNested={nested} />;
    case 'scene': return <ContentBlock_Scene response={props.response} sceneRegistry={props.sceneRegistry} />;
    case 'code': return <ContentBlock_Code response={props.response} />;
    case 'audio': return <ContentBlock_Audio response={props.response} />;
    case 'video': return <ContentBlock_Video response={props.response} />;
    case 'youtube': return <ContentBlock_Youtube response={props.response} />;
    case 'image': return <ContentBlock_Image response={props.response} />;
    case 'quiz': return <ContentBlock_Quiz response={props.response} questions={props.questions} renderNested={nested} />;
    default: return assertNever(props);
  }
}
