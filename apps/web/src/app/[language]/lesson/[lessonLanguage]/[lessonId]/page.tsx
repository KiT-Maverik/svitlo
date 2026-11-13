import { createPublishedLessonPropsPage } from '@svitlo/adapter-nextjs';
import WebLesson from '@/components/pages/Lesson/Lesson';

const lessonPage = createPublishedLessonPropsPage({
  renderLesson: props => <WebLesson {...props} />,
});

export const generateMetadata = lessonPage.generateMetadata;
export default lessonPage.Page;
