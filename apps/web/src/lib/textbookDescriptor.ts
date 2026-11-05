/** Host-facing metadata: a textbook may omit development-only or skills features. */
export type TextbookDescriptor = Readonly<{
  id: string;
  title: string;
  featuredLessonId?: string;
  featuredLessonLabel?: string;
  skillAnalyticsDomains?: readonly string[];
  skillLearningEmptyMessage?: string;
}>;
