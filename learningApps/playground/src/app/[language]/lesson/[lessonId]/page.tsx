import { createLessonPage, loadPublishedLesson } from '@svitlo/nextjs-adapter/lesson';
import { loadUiKitMessages } from '@/lib/uiKit/loadUiKitMessages';
import PlaygroundLesson from '@/components/pages/Lesson/Lesson';

const lessonPage = createLessonPage({
  loadLesson: loadPublishedLesson,
  loadMessages: loadUiKitMessages,
  renderLesson: props => <PlaygroundLesson {...props} />,
});

export const generateMetadata = lessonPage.generateMetadata;
export default lessonPage.Page;
