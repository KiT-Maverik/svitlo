import type {
  ContentBlock,
  ContentBlock_Checkpoint,
  ContentBlock_Code,
  ContentBlock_Image,
  ContentBlock_Scene,
  ContentBlock_Text,
  ContentBlock_Type,
  ContentBlock_Youtube,
  Flashcard,
  Lesson,
  Question,
  Question_Type,
  Section,
  Section_Type,
  Quiz_Screen,
  Quiz_Parameters,
} from '../../content';
type TestLanguages = readonly ['en', 'uk'];

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type Assert<T extends true> = T;

type _LessonIsCanonical = Assert<Equal<Lesson<'definition', readonly ['en']>['type'], 'lesson'>>;
type _SectionDefinitionKinds = Assert<Equal<Section<'definition', TestLanguages>['type'], Section_Type>>;
type _SectionDataKinds = Assert<Equal<Section<'data', TestLanguages>['type'], Section_Type>>;
type _SectionResponseKinds = Assert<Equal<Section<'response', TestLanguages>['type'], Section_Type>>;
type _RuntimeKinds = Assert<Equal<ContentBlock<'response', TestLanguages>['type'], ContentBlock_Type>>;
type _QuestionKinds = Assert<Equal<Question<'response', TestLanguages>['type'], Question_Type>>;
type _SceneDiscriminator = Assert<Equal<ContentBlock_Scene<'response', TestLanguages>['type'], 'scene'>>;
type _SceneUsesBlockId = Assert<Equal<ContentBlock_Scene<'response', TestLanguages>['id'], string>>;
type _OrderedSectionContent = Assert<
  Equal<
    Extract<Section<'data', TestLanguages>, { content: readonly unknown[] }>['content'][number]['type'],
    ContentBlock_Type
  >
>;
type _OrderedLessonSections = Assert<Equal<Lesson<'data', TestLanguages>['sections'][number]['type'], Section_Type>>;
type _AuthoredKinds = Assert<Equal<ContentBlock<'data', TestLanguages>['type'], ContentBlock_Type>>;
type _QuizReferencesQuestions = Assert<
  Equal<NonNullable<Quiz_Parameters<'response', TestLanguages>['selection']['questionSlugs']>[number], string>
>;
type _QuizStartScreen = Assert<
  Equal<NonNullable<Quiz_Parameters<'data', TestLanguages>['screen']['starting']>, Quiz_Screen<'data', TestLanguages>>
>;
type _QuizRetryScreen = Assert<
  Equal<
    NonNullable<NonNullable<Quiz_Parameters<'response', TestLanguages>['screen']['ending']>['retry']>,
    Quiz_Screen<'response', TestLanguages>
  >
>;

type CheckpointChild = ContentBlock_Checkpoint<'response', TestLanguages>['items'][number]['answer'][number];
type _NestedBlocksRemainDiscriminated = Assert<
  Equal<CheckpointChild['type'], Exclude<ContentBlock_Type, 'checkpoint' | 'quiz'>>
>;

const runtimeText: ContentBlock_Text<'response', TestLanguages> = {
  id: 'text-id',
  type: 'text',
  value: 'hello {{id: name; value: John}}',
  styling: [{ id: 'name', applyStyle: ['highlight', 'variable'], tone: 'info' }],
  wrap: { typographyProps: { component: 'h2', variant: 'h4', sx: { mb: 2 } } },
};
const authoredText: ContentBlock_Text<'data', TestLanguages> = {
  id: 'text-id',
  slug: 'intro',
  type: 'text',
  value: 'hello {{id: name; value: John}}',
  styling: [{ id: 'name', applyStyle: ['highlight'], tone: 'warning' }],
  wrap: { typographyProps: { component: 'p', align: 'center' } },
};
const authoredYoutube: ContentBlock_Youtube<'data', TestLanguages> = {
  id: 'youtube-id',
  slug: 'video',
  type: 'youtube',
  mode: 'embed',
  href: 'https://youtu.be/M7lc1UVf-VE',
  title: 'Lesson video',
  label: 'Watch the lesson video',
  fallback: {
    offline: 'Connect to watch',
    unavailable: 'Video unavailable',
  },
};
const authoredImage: ContentBlock_Image<'data', TestLanguages> = {
  id: 'image-id',
  slug: 'diagram',
  type: 'image',
  src: '/diagram.png',
  alt: 'Light ray diagram',
  caption: 'Path of a light ray',
  width: 800,
  height: 450,
  fallback: { unavailable: 'Diagram unavailable' },
};
const authoredCode: ContentBlock_Code<'data', TestLanguages> = {
  id: 'code-id',
  slug: 'greeting',
  type: 'code',
  codeAsText: 'console.log("%_%GREETING%_%");',
  language: 'typescript',
  variables: [{ id: 'GREETING', value: 'Hello' }],
};
const runtimeCode: ContentBlock_Code<'response', TestLanguages> = {
  id: 'code-id',
  type: 'code',
  codeAsText: 'console.log("%_%GREETING%_%");',
  language: 'typescript',
  variables: [{ id: 'GREETING', value: 'Hello' }],
};
const authoredFillImage: ContentBlock_Image<'data', TestLanguages> = {
  id: 'image-fill-id',
  slug: 'responsive-diagram',
  type: 'image',
  src: '/diagram.png',
  alt: 'Responsive light ray diagram',
  fill: true,
  aspectRatio: 16 / 9,
  objectFit: 'contain',
  sizes: '(max-width: 768px) 100vw, 768px',
};
// @ts-expect-error YouTube links and embeds require an accessible label.
const unlabelledYoutube: ContentBlock_Youtube<'response', TestLanguages> = {
  id: 'youtube-id',
  type: 'youtube',
  mode: 'embed',
  href: 'https://youtu.be/M7lc1UVf-VE',
};
const runtimeScene: ContentBlock_Scene<'response', TestLanguages> = {
  id: 'scene-id',
  type: 'scene',
  locales: { title: 'Light ray' },
};
const authoredScene: ContentBlock_Scene<'data', TestLanguages, { title: string }> = {
  id: 'scene-id',
  slug: 'ray',
  type: 'scene',
  locales: { en: { title: 'Light ray' }, uk: { title: 'Промінь світла' } },
};
void authoredScene;

const customQuizScreen: Quiz_Screen<'response', TestLanguages> = {
  content: [runtimeText],
};
// @ts-expect-error A custom screen requires at least one content block.
const emptyQuizScreen: Quiz_Screen<'response', TestLanguages> = { content: [] };

// @ts-expect-error A localized runtime content block must carry its discriminator.
const missingDiscriminator: ContentBlock_Text<'response', TestLanguages> = {
  id: 'text-id',
  value: 'hello',
};

declare const flashcard: Flashcard<'data', TestLanguages>;
// @ts-expect-error Canonical authored card content arrays cannot be mutated.
flashcard.front.push(runtimeText);

declare const quiz: Extract<Section<'response', TestLanguages>, { type: 'quiz' }>;
// @ts-expect-error Quiz question selection references are immutable.
quiz.parameters.selection.questionSlugs!.push('another-question');

void [
  runtimeText,
  authoredText,
  authoredYoutube,
  authoredImage,
  authoredFillImage,
  authoredCode,
  runtimeCode,
  unlabelledYoutube,
  runtimeScene,
  customQuizScreen,
  emptyQuizScreen,
  missingDiscriminator,
  quiz,
  flashcard,
];
