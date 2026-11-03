'use client';

import type { ReactNode } from 'react';
import { AudioBlock, ImageBlock, VideoBlock } from './blocks/MediaBlocks';
import { CheckpointBlock } from './blocks/CheckpointBlock';
import { CodeBlock } from './blocks/CodeBlock';
import { QuizBlock } from './blocks/QuizBlock';
import { SceneBlock } from './blocks/SceneBlock';
import { MarkdownBlock, TextBlock } from './blocks/TextBlocks';
import { YoutubeBlock } from './blocks/YoutubeBlock';
import type { ContentBlockRenderContext, ContentBlockRendererProps, NestedResponse } from './types';
import { assertNever, requireTaggedResponse } from './utils';

export type {
  ContentBlockRenderContext,
  ContentBlockRendererProps,
  ContentBlockReference,
  ContentBlockResponse,
  ContentBlockType,
  SceneRegistry,
} from './types';
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
    case 'text': return <TextBlock response={props.response} />;
    case 'markdown': return <MarkdownBlock response={props.response} />;
    case 'checkpoint': return <CheckpointBlock response={props.response} renderNested={nested} />;
    case 'scene': return <SceneBlock response={props.response} sceneRegistry={props.sceneRegistry} />;
    case 'code': return <CodeBlock response={props.response} />;
    case 'audio': return <AudioBlock response={props.response} />;
    case 'video': return <VideoBlock response={props.response} />;
    case 'youtube': return <YoutubeBlock response={props.response} />;
    case 'image': return <ImageBlock response={props.response} />;
    case 'quiz': return <QuizBlock response={props.response} questions={props.questions} renderNested={nested} />;
    default: return assertNever(props);
  }
}
