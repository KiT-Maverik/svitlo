import { createPublishedLessonPage } from '@svitlo/adapter-nextjs';
import WebLesson from '@/components/pages/Lesson/Lesson';

const lessonPage = createPublishedLessonPage({
  renderLesson: props => <WebLesson {...props} />,
});

export const generateMetadata = lessonPage.generateMetadata;
export default lessonPage.Page;
