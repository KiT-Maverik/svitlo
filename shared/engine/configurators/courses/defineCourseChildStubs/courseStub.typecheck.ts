import type { Assessment_Configurator } from '../../assessments/defineAssessment';
import type { Episode_Configurator } from '../../episodes/defineEpisode';
import type { Lesson_Configurator } from '../../lessons/defineLesson';
import { defineChapter } from '../defineChapter';
import { defineCourse } from '../defineCourse';
import { defineModule } from '../defineModule';
import { defineAssessmentStub, defineEpisodeStub, defineLessonStub } from './defineCourseChildStubs';

const id = 'a275647f-203d-481a-a1c7-4d331c779d51';
const lesson = defineLessonStub({ id, slug: 'lessonSlot' });
const episode = defineEpisodeStub({ id, slug: 'episodeSlot' });
const assessment = defineAssessmentStub({ id, slug: 'assessmentSlot' });

const chapter = defineChapter({
  id,
  slug: 'chapter',
  type: 'chapter',
  params: {},
  locale: { title: 'Chapter' },
  content: {
    items: { lessonSlot: lesson, episodeSlot: episode, assessmentSlot: assessment },
    order: ['lessonSlot', 'episodeSlot', 'assessmentSlot'],
  },
});
const module = defineModule({
  id,
  slug: 'module',
  type: 'module',
  params: {},
  locale: { title: 'Module' },
  content: { items: { chapter }, order: ['chapter'] },
});
const course = defineCourse({
  id,
  slug: 'course',
  type: 'course',
  params: { languages: ['en'] as const },
  locale: { title: 'Course', description: 'Draft' },
  content: { items: { module }, order: ['module'] },
});
course.build.props({ languages: ['en'] });

// No stub can masquerade as the completed Configurator API.
// @ts-expect-error A stub is never a completed Lesson.
const completedLesson: Lesson_Configurator = lesson;
// @ts-expect-error A stub is never a completed Episode.
const completedEpisode: Episode_Configurator = episode;
// @ts-expect-error A stub is never a completed Assessment.
const completedAssessment: Assessment_Configurator = assessment;
// @ts-expect-error Stub overrides are not authorable.
lesson.build.overrides({}, { languages: ['en'] });
// @ts-expect-error Course authoring declares only English here.
course.build.props({ languages: ['pl'] });

void completedLesson;
void completedEpisode;
void completedAssessment;
