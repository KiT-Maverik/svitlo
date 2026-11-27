import { createPublishedLessonPropsPage } from '@svitlo/adapter-nextjs';
import { toLessonProps } from '@svitlo/ui-kit';

import WebLesson from '@/components/pages/Lesson/Lesson';

const lessonPage = createPublishedLessonPropsPage({
  renderLesson: props => <WebLesson {...props} response={toLessonProps(props.response)} />,
});

export const generateMetadata = lessonPage.generateMetadata;
export default lessonPage.Page;
