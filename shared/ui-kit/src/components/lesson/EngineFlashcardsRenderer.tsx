'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import type {
  AssessmentResourceLoader,
  Flashcard_Props,
  FlashcardsSection_Props,
  LanguageCode,
} from '@svitlo/engine/runtime';
import type { UiKitMessages } from '#types/uiKitMessages';
import { Flashcard } from '../widgets/Flashcard/Flashcard';
import type { SceneRegistry } from '../widgets/ContentBlockRenderer';
import { EngineContentBlockRenderer } from './EngineContentBlockRenderer';

/** Only the explicitly selected cards are fetched from the independent Lesson bank. */
export function EngineFlashcardsRenderer({
  lessonId,
  language,
  assessmentLoader,
  section,
  messages,
  sceneRegistry,
}: {
  lessonId: string;
  language: LanguageCode;
  assessmentLoader?: AssessmentResourceLoader;
  section: FlashcardsSection_Props;
  messages: UiKitMessages;
  sceneRegistry?: SceneRegistry;
}) {
  const ids = section.params.selection.flashcardIds;
  const identity = lessonId + ':' + language + ':' + section.id + ':' + ids.join(',');
  const [attempt, setAttempt] = useState(0);
  const [load, setLoad] = useState<{
    identity: string;
    status: 'loading' | 'ready' | 'error';
    cards: readonly Flashcard_Props[];
  }>({ identity, status: 'loading', cards: [] });

  useEffect(() => {
    const controller = new AbortController();
    setLoad({ identity, status: 'loading', cards: [] });
    if (!assessmentLoader) {
      setLoad({ identity, status: 'error', cards: [] });
    } else {
      assessmentLoader.loadFlashcards({ lessonId, language, ids, signal: controller.signal })
        .then(cards => {
          if (cards.length !== ids.length || cards.some((card, index) => card.id !== ids[index]))
            throw new Error('Flashcard resource UUID mismatch for Section ' + section.id);
          return cards;
        })
        .then(
          cards => {
            if (!controller.signal.aborted) setLoad({ identity, status: 'ready', cards });
          },
          () => {
            if (!controller.signal.aborted) setLoad({ identity, status: 'error', cards: [] });
          },
        );
    }
    return () => controller.abort();
  }, [assessmentLoader, lessonId, language, identity, attempt]);

  const current = load.identity === identity ? load : { status: 'loading' as const, cards: [] };
  if (current.status === 'loading') return <Typography role="status">{messages.learningLayout.preparingLesson}</Typography>;
  if (current.status === 'error')
    return (
      <Stack spacing={2}>
        <Typography role="alert">{messages.learningLayout.preparingLessonError}</Typography>
        <Button onClick={() => setAttempt(value => value + 1)}>{messages.learningLayout.actions.retry}</Button>
      </Stack>
    );
  return (
    <ResolvedFlashcards
      key={identity}
      cards={current.cards}
      section={section}
      messages={messages}
      sceneRegistry={sceneRegistry}
    />
  );
}

function ResolvedFlashcards({
  cards,
  section,
  messages,
  sceneRegistry,
}: {
  cards: readonly Flashcard_Props[];
  section: FlashcardsSection_Props;
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
  const render = (blocks: Flashcard_Props['content']['front']) => (
    <EngineContentBlockRenderer blocks={blocks} messages={messages} sceneRegistry={sceneRegistry} />
  );
  return (
    <Stack spacing={3}>
      {content.length > 0 && <EngineContentBlockRenderer blocks={content} messages={messages} sceneRegistry={sceneRegistry} />}
      <Typography role="status">{index + 1} / {cards.length}</Typography>
      <Flashcard
        key={card.id}
        messages={messages.flashcard}
        question={render(card.content.front)}
        answer={render(card.content.back)}
        flags={card.parameters.flags}
        revealed={revealed}
        onReveal={() => setRevealed(true)}
        onRate={() => { if (index < cards.length - 1) select(index + 1); }}
      />
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Button disabled={index === 0} onClick={() => select(index - 1)}>{messages.learningLayout.actions.previous}</Button>
        <Button disabled={index >= cards.length - 1} onClick={() => select(index + 1)}>{messages.learningLayout.actions.next}</Button>
      </Stack>
    </Stack>
  );
}
