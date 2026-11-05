import type { Locale } from '@svitlo/engine/localization';
import { loadUiKitMessages } from '@/lib/uiKit/loadUiKitMessages';
import type { LessonResponse } from '@/lib/lessons/assembleLessonResponse';
import { Container } from '@mui/material';
import LessonLearningLayout from '@/components/layout/LearningLayout/LearningLayout';
import { LessonNavigationProvider, LessonStepNavigation } from './LessonNavigation';
import { LessonSectionBlocks } from './LessonSectionBlocks';
import styles from './Lesson.module.css';

export default async function LessonV2({ response, locale, href }: {
  response: LessonResponse;
  locale: Locale;
  href: string;
}) {
  const messages = await loadUiKitMessages(locale);
  const sections = response.sections;
  const quizIndex = sections.findIndex(section => section.type === 'quiz');
  return (
    <LessonNavigationProvider
      key={response.id}
      sectionCount={sections.length}
    >
      <LessonLearningLayout
        messages={messages}
        topics={[{ id: response.id, title: response.title, href }]}
        skippableSteps={sections.map((section, index) => index !== quizIndex && response.parameters.sections.allowSkipping && !!section.skippable)}
        quizStep={quizIndex < 0 ? undefined : quizIndex}
      >
        <div className={styles.lesson}>
          <LessonStepNavigation
            steps={sections.map(section => ({ id: section.id, title: section.navigationLabel }))}
            showStepNumbers={response.parameters.sections.showIndexes}
            allowNavigation={response.parameters.sections.allowNavigation}
          />
          <div className={styles.stage}>
            <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
              <LessonSectionBlocks
                messages={messages}
                sections={sections.map(({ id, type, content, questions }) => ({ id, type, content, questions }))}
                language={response.locale.code}
              />
            </Container>
          </div>
        </div>
      </LessonLearningLayout>
    </LessonNavigationProvider>
  );
}
