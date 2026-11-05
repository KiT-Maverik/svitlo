import { createPublishedLessonPage } from '@svitlo/nextjs-adapter/lesson';
import PlaygroundLesson from '@/components/pages/Lesson/Lesson';

const lessonPage = createPublishedLessonPage({
  renderLesson: props => <PlaygroundLesson {...props} />,
});

export const generateMetadata = lessonPage.generateMetadata;
export default lessonPage.Page;
