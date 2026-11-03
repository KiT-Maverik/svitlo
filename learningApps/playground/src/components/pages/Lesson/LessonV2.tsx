import type { Locale } from '@svitlo/engine/localization';
import type { LessonResponse } from '@/lib/lessons/assembleLessonResponse';
import { LocaleProvider } from '@/i18n/LocaleProvider/LocaleProvider';
import LessonLearningLayout from '@/components/layout/LearningLayout/LearningLayout';
import { LessonProgressProvider } from './LessonProgress/LessonProgress';
import LessonV2Client from './LessonV2Client';
import { SceneLocaleProvider } from './SceneLocaleContext';

export default function LessonV2({ response, locale, href }: {
  response: LessonResponse;
  locale: Locale;
  href: string;
}) {
  const sections = response.sectionOrder.map(slug => response.sections[slug]);
  const quizIndex = sections.findIndex(section => section.type === 'quiz');
  const scenes = {
    simulation: response.sections.theory?.content.scene?.lightPropagationSimulation?.messages,
    ray: response.sections.theory?.content.scene?.lightRayDiagram?.messages,
    practice: response.sections.practice?.content.scene?.showcase?.messages,
  };
  return (
    <LocaleProvider locale={locale}>
      <SceneLocaleProvider locale={locale} scenes={scenes}>
      <LessonProgressProvider
        key={response.id}
        lessonId={response.id}
        sectionIds={sections.map(section => section.id)}
        quizSectionId={quizIndex < 0 ? undefined : sections[quizIndex].id}
        requireQuiz={response.parameters.requireQuiz}
      >
        <LessonLearningLayout
          topics={[{ id: response.id, title: response.title, href }]}
          skippableSteps={sections.map(section => response.parameters.sections.allowSkipping && !!section.skippable)}
          quizStep={quizIndex < 0 ? undefined : quizIndex}
        >
          <LessonV2Client response={response} />
        </LessonLearningLayout>
      </LessonProgressProvider>
      </SceneLocaleProvider>
    </LocaleProvider>
  );
}
