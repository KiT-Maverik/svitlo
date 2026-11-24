'use client';

import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { LanguageCode, LocalizedEpisode } from '@svitlo/engine/runtime';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/runtime';
import type { UiKitMessages } from '#types/uiKitMessages';
import { EngineContentBlockRenderer } from '../lesson/EngineContentBlockRenderer';
import { MediaSettingsProvider } from '../lesson/MediaSettings';
import { MediaVolumeControl } from '../lesson/MediaVolumeControl';
import CourseTopicList, { type Topic } from '../layout/LearningLayout/CourseTopicList';
import type { SceneRegistry } from '../widgets/ContentBlockRenderer';

export type EpisodeProps = {
  response: LocalizedEpisode;
  language: LanguageCode;
  href: string;
  courseHref: string;
  courseTitle: string;
  topics: readonly Topic[];
  nextActivity?: { href: string; title: string };
  messages: UiKitMessages;
  sceneRegistry?: SceneRegistry;
};

/** Independent narrative controller. No Lesson, Skills or assessment bank state. */
function EpisodeController({ response, language, href, courseHref, courseTitle, topics, nextActivity, messages, sceneRegistry }: EpisodeProps) {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState<ReadonlySet<string>>(() => new Set());
  const section = response.section[step];
  const heading = useRef<HTMLHeadingElement>(null);
  const changed = useRef(false);
  useEffect(() => {
    if (changed.current) heading.current?.focus();
  }, [step]);
  if (!section) throw Error('Episode has no playable Section');
  const descriptor = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === language);
  if (!descriptor) throw Error('Unsupported Episode language');
  const required = section.content.filter(block =>
    block.type === 'checkpoint' && !block.params.disabled && block.params.requireCompletion &&
    block.content.some(item => item.check ?? block.params.enableChecks ?? false),
  );
  const key = (id: string) => section.id + '/' + id;
  const canAdvance = required.every(block => completed.has(key(block.id)));
  const last = step === response.section.length - 1;
  const labels = messages.learningLayout;
  function move(target: number) {
    changed.current = true;
    setStep(target);
  }
  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Stack spacing={2}>
        <Button component="a" href={courseHref} sx={{ alignSelf: 'start' }}>{courseTitle}</Button>
        <Box component="main" lang={descriptor.locale} dir={descriptor.direction}>
          <Typography component="h1" variant="h4">{response.locale.title}</Typography>
          <Typography component="p" aria-live="polite">{step + 1} / {response.section.length}</Typography>
          <Typography component="h2" variant="h5" ref={heading} tabIndex={-1} sx={{ my: 2 }}>{section.locale.title}</Typography>
          <Stack spacing={2} key={section.id}>
            <EngineContentBlockRenderer blocks={section.content} messages={messages} language={language}
              sceneRegistry={sceneRegistry} isCheckpointCompleted={id => completed.has(key(id))}
              onCheckpointComplete={id => setCompleted(previous => new Set([...previous, key(id)]))} />
          </Stack>
        </Box>
        <Stack component="nav" aria-label={labels.navigation.bottom} direction="row" spacing={2}>
          <Button disabled={step === 0} onClick={() => move(step - 1)}>{labels.actions.previous}</Button>
          {!last ? (
            <Button variant="contained" disabled={!canAdvance} onClick={() => move(step + 1)}>{labels.actions.next}</Button>
          ) : canAdvance ? (
            <Button variant="contained" component="a" href={nextActivity?.href ?? courseHref}>{nextActivity?.title ?? courseTitle}</Button>
          ) : (
            <Button variant="contained" disabled>{labels.actions.next}</Button>
          )}
        </Stack>
        <MediaVolumeControl messages={messages.navbarPreferences.volume} />
        <Box component="nav" aria-label={labels.navigation.topics}>
          <CourseTopicList topics={topics} pathname={href} onNavigate={() => {}} />
        </Box>
      </Stack>
    </Container>
  );
}

export function Episode(props: EpisodeProps) {
  return (
    <MediaSettingsProvider key={props.href + ':' + props.language}>
      <EpisodeController {...props} />
    </MediaSettingsProvider>
  );
}
