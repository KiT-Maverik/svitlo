'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import type {
  AssessmentResourceLoader,
  Disability,
  Flashcard_Data,
  ContentBlock_Primitive_Data,
  LanguageCode,
} from '@svitlo/engine/runtime';

import { toPrimitiveBlockProps, type SectionViewProps } from '../../presentation';
type FlashcardsSectionViewProps = Extract<SectionViewProps, { type: 'flashcards' }>;

import type { UiKitMessages } from '#types/uiKitMessages';

import type { SceneRegistry } from '../widgets/ContentBlockRenderer';
import { Flashcard } from '../widgets/Flashcard/Flashcard';
import { EngineContentBlockRenderer } from './EngineContentBlockRenderer';

/** Only the explicitly selected cards are fetched from the independent Lesson bank. */
export function EngineFlashcardsRenderer({
  lessonId,
  language,
  assessmentLoader,
  accessNeeds = [],
  section,
  messages,
  sceneRegistry,
}: {
  lessonId: string;
  language: LanguageCode;
  assessmentLoader?: AssessmentResourceLoader;
  accessNeeds?: readonly Disability[];
  section: FlashcardsSectionViewProps;
  messages: UiKitMessages;
  sceneRegistry?: SceneRegistry;
}) {
  const ids = section.params.selection.flashcardIds;
  const accessKey = [...accessNeeds].sort().join(',');
  const identity = lessonId + ':' + language + ':' + section.id + ':' + ids.join(',') + ':' + accessKey;
  const [attempt, setAttempt] = useState(0);
  const [load, setLoad] = useState<{
    identity: string;
    status: 'loading' | 'ready' | 'error';
    cards: readonly Flashcard_Data[];
    fallbackIds: readonly string[];
  }>({ identity, status: 'loading', cards: [], fallbackIds: [] });

  useEffect(() => {
    const controller = new AbortController();
    setLoad({ identity, status: 'loading', cards: [], fallbackIds: [] });
    if (!assessmentLoader) {
      setLoad({ identity, status: 'error', cards: [], fallbackIds: [] });
    } else {
      assessmentLoader
        .loadFlashcards({ language, ids, accessNeeds, signal: controller.signal })
        .then(result => {
          const cards = result.items;
          let previous = -1;
          for (const card of cards) {
            const next = ids.indexOf(card.id);
            if (next <= previous || next === -1)
              throw new Error('Flashcard resource UUID mismatch for Section ' + section.id);
            previous = next;
          }
          // A custom host loader must not bypass eligibility even if it ignores accessNeeds.
          return {
            cards: cards.filter(card => !accessNeeds.some(need => card.parameters.disabilities.includes(need))),
            fallbackIds: result.fallbacks.map(item => item.id),
          };
        })
        .then(
          ({ cards, fallbackIds }) => {
            if (!controller.signal.aborted) setLoad({ identity, status: 'ready', cards, fallbackIds });
          },
          () => {
            if (!controller.signal.aborted) setLoad({ identity, status: 'error', cards: [], fallbackIds: [] });
          },
        );
    }
    return () => controller.abort();
  }, [assessmentLoader, lessonId, language, identity, attempt]);

  const current = load.identity === identity ? load : { status: 'loading' as const, cards: [], fallbackIds: [] };
  if (current.status === 'loading')
    return <Typography role="status">{messages.learningLayout.preparingLesson}</Typography>;
  if (current.status === 'error')
    return (
      <Stack spacing={2}>
        <Typography role="alert">{messages.learningLayout.preparingLessonError}</Typography>
        <Button onClick={() => setAttempt(value => value + 1)}>{messages.learningLayout.actions.retry}</Button>
      </Stack>
    );
  if (!current.cards.length)
    return (
      <Typography role="alert">
        {accessNeeds.length
          ? messages.flashcard.flashcard.noCompatibleCards
          : messages.learningLayout.preparingLessonError}
      </Typography>
    );
  return (
    <ResolvedFlashcards
      key={identity}
      cards={current.cards}
      fallbackIds={current.fallbackIds}
      section={section}
      messages={messages}
      sceneRegistry={sceneRegistry}
    />
  );
}

function ResolvedFlashcards({
  cards,
  fallbackIds,
  section,
  messages,
  sceneRegistry,
}: {
  cards: readonly Flashcard_Data[];
  fallbackIds: readonly string[];
  section: FlashcardsSectionViewProps;
  messages: UiKitMessages;
  sceneRegistry?: SceneRegistry;
}) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const card = cards[index];
  const select = (next: number) => {
    setIndex(next);
    setRevealed(false);
  };
  const content = useMemo(() => section.content, [section.content]);
  if (!card) return <Typography role="alert">{messages.learningLayout.preparingLessonError}</Typography>;
  const render = (blocks: readonly ContentBlock_Primitive_Data[]) => (
    <EngineContentBlockRenderer blocks={blocks} messages={messages} sceneRegistry={sceneRegistry} />
  );
  return (
    <Stack spacing={3}>
      {content.length > 0 && (
        <EngineContentBlockRenderer blocks={content} messages={messages} sceneRegistry={sceneRegistry} />
      )}
      <Typography role="status">
        {index + 1} / {cards.length}
      </Typography>
      <Box lang={fallbackIds.includes(card.id) ? 'en' : undefined}>
        <Flashcard
          key={card.id}
          messages={messages.flashcard}
          question={render(toPrimitiveBlockProps(card.content.front))}
          answer={render(toPrimitiveBlockProps(card.content.back))}
          flags={card.parameters.flags}
          revealed={revealed}
          onReveal={() => setRevealed(true)}
          onRate={() => {
            if (index < cards.length - 1) select(index + 1);
          }}
        />
      </Box>
      <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
        <Button disabled={index === 0} onClick={() => select(index - 1)}>
          {messages.learningLayout.actions.previous}
        </Button>
        <Button disabled={index >= cards.length - 1} onClick={() => select(index + 1)}>
          {messages.learningLayout.actions.next}
        </Button>
      </Stack>
    </Stack>
  );
}
