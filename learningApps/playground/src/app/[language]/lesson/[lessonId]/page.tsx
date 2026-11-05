import { createLessonPage } from '@svitlo/nextjs-adapter/lesson';
import { loadLessonResponse } from '@/lib/lessons/loadLessonResponse';
import { loadUiKitMessages } from '@/lib/uiKit/loadUiKitMessages';
import PlaygroundLesson from '@/components/pages/Lesson/Lesson';

const lessonPage = createLessonPage({
  loadLesson: loadLessonResponse,
  loadMessages: loadUiKitMessages,
  renderLesson: props => <PlaygroundLesson {...props} />,
});

export const generateMetadata = lessonPage.generateMetadata;
export default lessonPage.Page;
