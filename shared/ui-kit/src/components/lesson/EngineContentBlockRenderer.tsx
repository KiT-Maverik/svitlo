'use client';

import { Fragment, Suspense, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Stack, Typography } from '@mui/material';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import type { ContentBlock_Props } from '@svitlo/engine';
import {
  text_Props_Schema,
  markdown_Props_Schema,
  code_Props_Schema,
  image_Props_Schema,
  carousel_Props_Schema,
  video_Props_Schema,
  audio_Props_Schema,
  youtube_Props_Schema,
  scene_Props_Schema,
  checkpoint_Props_Schema,
} from '@svitlo/engine';
import type { UiKitMessages } from '#types/uiKitMessages';
import type { SceneRegistry } from '../widgets/ContentBlockRenderer';
import { ContentBlock_Text } from '../widgets/ContentBlockRenderer/blocks/Text/Text';
import { Markdown } from '../widgets/ContentBlockRenderer/blocks/Markdown/Markdown';
import { Code } from '../widgets/ContentBlockRenderer/blocks/Code/Code';
import { Image } from '../widgets/ContentBlockRenderer/blocks/Image/Image';
import { Carousel } from '../widgets/ContentBlockRenderer/blocks/Carousel/Carousel';
import { Video } from '../widgets/ContentBlockRenderer/blocks/Video/Video';
import { Audio } from '../widgets/ContentBlockRenderer/blocks/Audio/Audio';
import { Youtube } from '../widgets/ContentBlockRenderer/blocks/Youtube/Youtube';

export type EngineContentBlockRendererProps = {
  blocks: readonly ContentBlock_Props[];
  messages: UiKitMessages;
  sceneRegistry?: SceneRegistry;
  onCheckpointComplete?: (id: string) => void;
  isCheckpointCompleted?: (id: string) => boolean;
};

function EngineCheckpoint({
  block,
  messages,
  sceneRegistry,
  onComplete,
  completed = false,
}: {
  block: Extract<ContentBlock_Props, { type: 'checkpoint' }>;
  messages: UiKitMessages;
  sceneRegistry?: SceneRegistry;
  onComplete?: () => void;
  completed?: boolean;
}) {
  const source = checkpoint_Props_Schema.parse(block);
  const [checked, setChecked] = useState<ReadonlySet<string>>(() => new Set());
  const checks = source.content.filter(item => item.check || source.params.enableChecks);
  const allDone = checks.every(item => checked.has(item.id));
  return (
    <section aria-label={source.locale.title}>
      <Typography component={`h${source.params.headingLevel ?? 2}`} variant="h6">
        {source.locale.title}
      </Typography>
      <Stack spacing={1}>
        {source.content.map((item, index) => (
          <Accordion key={item.id} disableGutters>
            <AccordionSummary expandIcon={source.params.showChevron === false ? undefined : <ExpandMoreRounded />}>
              {source.params.showIndices !== false && `${index + 1}. `}
              {text_Props_Schema.parse(item.question).locale.value}
            </AccordionSummary>
            <AccordionDetails>
              <EngineContentBlockRenderer blocks={item.answer} messages={messages} sceneRegistry={sceneRegistry} />
              {(item.check || source.params.enableChecks) && (
                <Button
                  type="button"
                  disabled={completed || checked.has(item.id)}
                  onClick={() => {
                    const next = new Set(checked).add(item.id);
                    setChecked(next);
                    if (checks.every(question => next.has(question.id))) onComplete?.();
                  }}
                >
                  {completed || checked.has(item.id) ? messages.checkpoint.checked : messages.checkpoint.check}
                </Button>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
      {source.params.requireCompletion && allDone && !completed && checks.length === 0 && (
        <Typography>{messages.checkpoint.checked}</Typography>
      )}
    </section>
  );
}

function EngineBlock({
  block,
  messages,
  sceneRegistry,
  onCheckpointComplete,
  isCheckpointCompleted,
}: {
  block: ContentBlock_Props;
  messages: UiKitMessages;
  sceneRegistry?: SceneRegistry;
  onCheckpointComplete?: (id: string) => void;
  isCheckpointCompleted?: (id: string) => boolean;
}) {
  if (block.params.disabled) return null;

  switch (block.type) {
    case 'text': {
      const data = text_Props_Schema.parse(block);
      return <ContentBlock_Text type="text" id={data.id} value={data.locale.value} variables={data.params.variables} wrap={data.params.wrap} />;
    }
    case 'markdown': {
      const data = markdown_Props_Schema.parse(block);
      return <Markdown type="markdown" id={data.id} text={data.locale.value} variables={data.locale.variables} />;
    }
    case 'code': {
      const data = code_Props_Schema.parse(block);
      return <Code type="code" id={data.id} codeAsText={data.params.codeAsText} language={data.params.language} title={data.locale.title} variables={data.locale.variables} />;
    }
    case 'image': {
      const data = image_Props_Schema.parse(block);
      const layout = data.params.fill
        ? { fill: true as const, aspectRatio: data.params.aspectRatio! }
        : { width: data.params.width!, height: data.params.height! };
      return <Image type="image" id={data.id} {...layout} src={data.locale.src} alt={data.locale.alt} caption={data.locale.caption} sizes={data.params.sizes} unoptimized={data.params.unoptimized} objectFit={data.params.objectFit} fallback={data.locale.fallback} messages={messages.image} />;
    }
    case 'carousel': {
      const data = carousel_Props_Schema.parse(block);
      return <Carousel type="carousel" id={data.id} {...data.params} title={data.locale.title} slides={data.locale.slides as [typeof data.locale.slides[number], ...typeof data.locale.slides[number][]]} messages={messages} />;
    }
    case 'video': {
      const data = video_Props_Schema.parse(block);
      return <Video type="video" id={data.id} {...data.locale} messages={messages.video} />;
    }
    case 'audio': {
      const data = audio_Props_Schema.parse(block);
      return <Audio type="audio" id={data.id} {...data.locale} messages={messages.audio} />;
    }
    case 'youtube': {
      const data = youtube_Props_Schema.parse(block);
      return <Youtube type="youtube" id={data.id} mode={data.params.mode} {...data.locale} messages={messages.youtube} />;
    }
    case 'scene': {
      const data = scene_Props_Schema.parse(block);
      const Scene = sceneRegistry?.(data.id);
      if (!Scene) throw new Error('Unregistered Scene: ' + data.id);
      if (!data.locale.value || typeof data.locale.value !== 'object') throw new Error('Scene expects object Props: ' + data.id);
      return <Suspense fallback={null}><Scene locales={data.locale.value} /></Suspense>;
    }
    case 'checkpoint':
      return (
        <EngineCheckpoint
          block={block}
          messages={messages}
          sceneRegistry={sceneRegistry}
          completed={isCheckpointCompleted?.(block.id)}
          onComplete={() => onCheckpointComplete?.(block.id)}
        />
      );
    default: {
      const unreachable: never = block;
      throw new Error('Unknown published ContentBlock: ' + String(unreachable));
    }
  }
}

/** Engine Props are the only content contract accepted by this renderer. */
export function EngineContentBlockRenderer({
  blocks,
  messages,
  sceneRegistry,
  onCheckpointComplete,
  isCheckpointCompleted,
}: EngineContentBlockRendererProps) {
  return (
    <>
      {blocks.map(block => (
        <Fragment key={block.id}>
          <EngineBlock
            block={block}
            messages={messages}
            sceneRegistry={sceneRegistry}
            onCheckpointComplete={onCheckpointComplete}
            isCheckpointCompleted={isCheckpointCompleted}
          />
        </Fragment>
      ))}
    </>
  );
}
