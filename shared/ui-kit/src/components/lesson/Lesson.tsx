'use client';

import { type ComponentType } from 'react';
import Container from '@mui/material/Container';
import type { ContentBlock, Locale_Languages, Question, Section_Type, UiKit_Global } from '@svitlo/engine/content';
import type { LanguageCode } from '@svitlo/engine/localization';
import { ContentBlockRenderer, type SceneRegistry } from '../widgets/ContentBlockRenderer';
import { QuestionRenderer } from '../widgets/questions';
import type { LessonLearningLayoutProps } from '../layout/LearningLayout/createLessonLearningLayout';
import { LessonNavigationProvider, useLessonNavigation } from './LessonNavigation';
import { LessonSteps } from './LessonSteps';
import styles from './Lesson.module.css';

export type LessonContentBlock = ContentBlock<'response', Locale_Languages> & { slug: string };

export type LessonView = {
  id: string;
  title: string;
  locale: { code: LanguageCode };
  parameters: { sections: {
    allowNavigation: boolean;
    allowSkipping: boolean;
    showIndexes: boolean;
  } };
  sections: readonly {
    id: string;
    type: Section_Type;
    navigationLabel: string;
    skippable?: boolean;
    content: readonly LessonContentBlock[];
    questions: readonly Question<'response', Locale_Languages>[];
  }[];
};

export type LessonProps = {
  response: LessonView;
  href: string;
  messages: UiKit_Global<'response'>;
  /** Host binding: Next.js, Electron, or ordinary React can supply a layout. */
  layout: ComponentType<LessonLearningLayoutProps>;
  /** Application-owned scene registry never leaks into the shared package. */
  sceneRegistry?: SceneRegistry;
};

function LessonBody({ response, messages, sceneRegistry }: Pick<LessonProps, 'response' | 'messages' | 'sceneRegistry'>) {
  const { progress, dispatch } = useLessonNavigation();
  const section = response.sections[progress.step];
  if (!section) return null;
  const blocks = section.content.filter(
    (block): block is Exclude<LessonContentBlock, { type: 'quiz' }> => block.type !== 'quiz',
  );
  return (
    <>
      <LessonSteps
        navigationLabel={messages.lesson.steps.navigation}
        steps={response.sections.map(item => ({ id: item.id, title: item.navigationLabel }))}
        currentStep={progress.step}
        completedStep={progress.testDone ? progress.lastStep : undefined}
        showStepNumbers={response.parameters.sections.showIndexes}
        allowNavigation={response.parameters.sections.allowNavigation}
        onNavigate={step => dispatch({ type: 'visit', step })}
      />
      <div className={styles.stage}>
        <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
          {section.type === 'quiz'
            ? <QuestionRenderer
                key={section.id}
                questions={section.questions}
                language={response.locale.code}
                sceneRegistry={sceneRegistry}
                messages={messages}
                onComplete={() => dispatch({ type: 'testDone' })}
              />
            : <ContentBlockRenderer
                key={section.id}
                blocks={blocks}
                language={response.locale.code}
                sceneRegistry={sceneRegistry}
                messages={messages}
              />}
        </Container>
      </div>
    </>
  );
}

export function Lesson({ response, href, messages, layout: Layout, sceneRegistry }: LessonProps) {
  const quizIndex = response.sections.findIndex(section => section.type === 'quiz');
  return (
    <LessonNavigationProvider key={response.id} sectionCount={response.sections.length}>
      <Layout
        messages={messages}
        topics={[{ id: response.id, title: response.title, href }]}
        skippableSteps={response.sections.map((section, index) =>
          index !== quizIndex && response.parameters.sections.allowSkipping && !!section.skippable)}
        quizStep={quizIndex < 0 ? undefined : quizIndex}
      >
        <div className={styles.lesson}>
          <LessonBody response={response} messages={messages} sceneRegistry={sceneRegistry} />
        </div>
      </Layout>
    </LessonNavigationProvider>
  );
}
