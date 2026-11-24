'use client';

import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/runtime';
import type {
  AssessmentResourceLoader,
  LanguageCode,
  LocalizedAssessment,
} from '@svitlo/engine/runtime';
import type { UiKitMessages } from '#types/uiKitMessages';
import { EngineContentBlockRenderer } from '../lesson/EngineContentBlockRenderer';
import { EngineQuestionRenderer } from '../lesson/EngineQuestionRenderer';
import { MediaSettingsProvider } from '../lesson/MediaSettings';
import { MediaVolumeControl } from '../lesson/MediaVolumeControl';
import CourseTopicList, { type Topic } from '../layout/LearningLayout/CourseTopicList';
import type { SceneRegistry } from '../widgets/ContentBlockRenderer';

export type AssessmentProps = {
  response: LocalizedAssessment;
  language: LanguageCode;
  href: string;
  courseHref: string;
  courseTitle: string;
  topics: readonly Topic[];
  messages: UiKitMessages;
  nextActivity?: { href: string; title: string };
  sceneRegistry?: SceneRegistry;
  assessmentLoader?: AssessmentResourceLoader;
};

/** Shared Course-owned Assessment controller for real draft and completed Props. */
function AssessmentController({
  response,
  language,
  href,
  courseHref,
  courseTitle,
  topics,
  messages,
  nextActivity,
  sceneRegistry,
  assessmentLoader,
}: AssessmentProps) {
  const sections = response.section.filter(section => section.params.disabled !== true);
  const [step, setStep] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const section = sections[step];
  const descriptor = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === language);
  useEffect(() => {
    if (moved.current) heading.current?.focus();
  }, [step]);
  if (!descriptor) throw Error('Unsupported Assessment language');
  if (!section) throw Error('Assessment has no previewable Section');
  const last = step === sections.length - 1;
  const canAdvance = section.type !== 'quiz' || quizComplete;
  const labels = messages.learningLayout;
  const move = (next: number) => {
    moved.current = true;
    setStep(next);
  };
  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Stack spacing={2}>
        <Button component="a" href={courseHref} sx={{ alignSelf: 'start' }}>
          {courseTitle}
        </Button>
        <Box component="main" lang={descriptor.locale} dir={descriptor.direction}>
          <Typography component="h1" variant="h4">
            {response.locale.title}
          </Typography>
          <Typography component="p" aria-live="polite">
            {step + 1} / {sections.length}
          </Typography>
          <Typography component="h2" variant="h5" ref={heading} tabIndex={-1} sx={{ my: 2 }}>
            {section.locale.title}
          </Typography>
          <Stack spacing={2} key={section.id}>
            {section.type === 'quiz' ? (
              <EngineQuestionRenderer
                lessonId={response.id}
                language={language}
                assessmentLoader={assessmentLoader}
                section={section}
                sceneRegistry={sceneRegistry}
                messages={messages}
                onComplete={() => setQuizComplete(true)}
              />
            ) : (
              <EngineContentBlockRenderer
                blocks={section.content}
                language={language}
                messages={messages}
                sceneRegistry={sceneRegistry}
              />
            )}
          </Stack>
        </Box>
        <Stack component="nav" aria-label={labels.navigation.bottom} direction="row" spacing={2}>
          <Button disabled={step === 0} onClick={() => move(step - 1)}>
            {labels.actions.previous}
          </Button>
          {!last ? (
            <Button variant="contained" disabled={!canAdvance} onClick={() => move(step + 1)}>
              {labels.actions.next}
            </Button>
          ) : (
            <Button
              variant="contained"
              component="a"
              href={nextActivity?.href ?? courseHref}
              disabled={!canAdvance}
            >
              {nextActivity?.title ?? courseTitle}
            </Button>
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

export function Assessment(props: AssessmentProps) {
  return (
    <MediaSettingsProvider key={props.href + ':' + props.language}>
      <AssessmentController {...props} />
    </MediaSettingsProvider>
  );
}
