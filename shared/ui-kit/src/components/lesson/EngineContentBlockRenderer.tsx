'use client';

import { Fragment, Suspense, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Stack, Typography } from '@mui/material';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import type { ContentBlock_Props } from '@svitlo/engine/runtime';
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
} from '@svitlo/engine/runtime';
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

/** Locale files must already have been assembled: no dictionary fallback in the UI. */
function localizedText(value: unknown, field: string, optional = false): string | undefined {
  if (value === undefined && optional) return undefined;
  if (typeof value !== 'string') throw new Error('Expected resolved string Props at ' + field);
  return value;
}
function requiredText(value: unknown, field: string): string {
  const text = localizedText(value, field);
  if (text === undefined) throw new Error('Missing resolved string Props at ' + field);
  return text;
}
function localizedMap(values: Record<string, unknown> | undefined, field: string): Record<string, string> | undefined {
  if (!values) return undefined;
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, requiredText(value, field + '.' + key)]),
  );
}
function localizedFallback(value: Record<string, unknown> | undefined, field: string) {
  if (!value) return undefined;
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, localizedText(item, field + '.' + key, true)]),
  );
}

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
      <Typography
        component={`h${source.params.headingLevel ?? 2}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'}
        variant="h6"
      >
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
      return (
        <ContentBlock_Text
          type="text"
          id={data.id}
          value={data.locale.value}
          variables={data.params.variables}
          wrap={data.params.wrap ? { typographyProps: data.params.wrap.typographyProps } : undefined}
        />
      );
    }
    case 'markdown': {
      const data = markdown_Props_Schema.parse(block);
      return <Markdown type="markdown" id={data.id} text={data.locale.value} variables={data.locale.variables} />;
    }
    case 'code': {
      const data = code_Props_Schema.parse(block);
      return (
        <Code
          type="code"
          id={data.id}
          codeAsText={data.params.codeAsText}
          language={data.params.language}
          title={localizedText(data.locale?.title, 'code.title', true)}
          variables={localizedMap(data.locale?.variables, 'code.variables')}
        />
      );
    }
    case 'image': {
      const data = image_Props_Schema.parse(block);
      const fallback = localizedFallback(data.locale.fallback, 'image.fallback');
      const src = data.locale.src;
      const alt = data.locale.alt;
      const caption = localizedText(data.locale.caption, 'image.caption', true);
      const common = {
        src,
        alt,
        caption,
        sizes: data.params.sizes,
        unoptimized: data.params.unoptimized,
        fallback,
        messages: messages.image,
      };
      if (data.params.fill) {
        return (
          <Image
            type="image"
            id={data.id}
            fill
            aspectRatio={data.params.aspectRatio!}
            objectFit={data.params.objectFit}
            {...common}
          />
        );
      }
      return <Image type="image" id={data.id} width={data.params.width!} height={data.params.height!} {...common} />;
    }
    case 'carousel': {
      const data = carousel_Props_Schema.parse(block);
      return (
        <Carousel
          type="carousel"
          id={data.id}
          {...data.params}
          title={localizedText(data.locale.title, 'carousel.title', true)}
          slides={data.locale.slides as [(typeof data.locale.slides)[number], ...(typeof data.locale.slides)[number][]]}
          messages={messages}
        />
      );
    }
    case 'video': {
      const data = video_Props_Schema.parse(block);
      return (
        <Video
          type="video"
          id={data.id}
          fileLocation={data.locale.fileLocation}
          poster={data.locale.poster}
          label={data.locale.label}
          title={localizedText(data.locale.title, 'video.title', true)}
          fallback={localizedFallback(data.locale.fallback, 'video.fallback')}
          messages={messages.video}
        />
      );
    }
    case 'audio': {
      const data = audio_Props_Schema.parse(block);
      return (
        <Audio
          type="audio"
          id={data.id}
          fileLocation={data.locale.fileLocation}
          title={data.locale.title}
          description={localizedText(data.locale.description, 'audio.description', true)}
          fallback={localizedFallback(data.locale.fallback, 'audio.fallback')}
          messages={messages.audio}
        />
      );
    }
    case 'youtube': {
      const data = youtube_Props_Schema.parse(block);
      return (
        <Youtube
          type="youtube"
          id={data.id}
          mode={data.params.mode}
          href={data.locale.href}
          label={data.locale.label}
          title={localizedText(data.locale.title, 'youtube.title', true)}
          fallback={localizedFallback(data.locale.fallback, 'youtube.fallback')}
          messages={messages.youtube}
        />
      );
    }
    case 'scene': {
      const data = scene_Props_Schema.parse(block);
      const Scene = sceneRegistry?.(data.id);
      if (!Scene) throw new Error('Unregistered Scene: ' + data.id);
      if (!data.locale.value || typeof data.locale.value !== 'object')
        throw new Error('Scene expects object Props: ' + data.id);
      return (
        <Suspense fallback={null}>
          <Scene locales={data.locale.value} />
        </Suspense>
      );
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
