import type {
  ContentBlock,
  ContentBlock_Checkpoint,
  ContentBlock_Code,
  ContentBlock_Image,
  ContentBlock_Quiz,
  ContentBlock_Quiz_Screen,
  ContentBlock_Reference,
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
} from '../../content';
import type { LanguageCode } from '../languages';

type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

type _LessonIsCanonical = Assert<Equal<Lesson<'definition', LanguageCode>['type'], 'lesson'>>;
type _SectionDefinitionKinds = Assert<Equal<Section<'definition', LanguageCode>['type'], Section_Type>>;
type _SectionDataKinds = Assert<Equal<Section<'data', LanguageCode>['type'], Section_Type>>;
type _SectionResponseKinds = Assert<Equal<Section<'response', LanguageCode>['type'], Section_Type>>;
type _RuntimeKinds = Assert<Equal<ContentBlock<'response', LanguageCode>['type'], ContentBlock_Type>>;
type _QuestionKinds = Assert<Equal<Question<'response', LanguageCode>['type'], Question_Type>>;
type _SceneDiscriminator = Assert<Equal<ContentBlock_Scene<'response', LanguageCode>['type'], 'scene'>>;
type _SceneUsesRegistryKey = Assert<Equal<ContentBlock_Scene<'response', LanguageCode>['rendererKey'], string>>;
type _OrderedBlockReference = Assert<Equal<ContentBlock_Reference['type'], ContentBlock_Type>>;
type _QuizReferencesQuestions = Assert<Equal<ContentBlock_Quiz<'response', LanguageCode>['questionSlugs'][number], string>>;
type _QuizStartScreen = Assert<Equal<
  NonNullable<ContentBlock_Quiz<'data', LanguageCode>['screen']['starting']>,
  ContentBlock_Quiz_Screen<'data', LanguageCode>
>>;
type _QuizRetryScreen = Assert<Equal<
  NonNullable<NonNullable<ContentBlock_Quiz<'response', LanguageCode>['screen']['ending']>['retry']>,
  ContentBlock_Quiz_Screen<'response', LanguageCode>
>>;

type CheckpointChild = ContentBlock_Checkpoint<'response', LanguageCode>['items'][number]['answer'][number];
type _NestedBlocksRemainDiscriminated = Assert<
  Equal<CheckpointChild['type'], Exclude<ContentBlock_Type, 'checkpoint' | 'quiz'>>
>;

const runtimeText: ContentBlock_Text<'response', LanguageCode> = {
  id: 'text-id',
  type: 'text',
  value: 'hello {{id: name; value: John}}',
  styling: [{ id: 'name', applyStyle: ['highlight', 'variable'], tone: 'info' }],
  wrap: { typographyProps: { component: 'h2', variant: 'h4', sx: { mb: 2 } } },
};
const authoredText: ContentBlock_Text<'data', LanguageCode> = {
  id: 'text-id',
  slug: 'intro',
  value: 'hello {{id: name; value: John}}',
  styling: [{ id: 'name', applyStyle: ['highlight'], tone: 'warning' }],
  wrap: { typographyProps: { component: 'p', align: 'center' } },
};
const authoredYoutube: ContentBlock_Youtube<'data', LanguageCode> = {
  id: 'youtube-id',
  slug: 'video',
  mode: 'embed',
  href: 'https://youtu.be/M7lc1UVf-VE',
  title: 'Lesson video',
  fallback: {
    offline: 'Connect to watch',
    unavailable: 'Video unavailable',
  },
};
const authoredImage: ContentBlock_Image<'data', LanguageCode> = {
  id: 'image-id',
  slug: 'diagram',
  src: '/diagram.png',
  alt: 'Light ray diagram',
  caption: 'Path of a light ray',
  width: 800,
  height: 450,
  fallback: { unavailable: 'Diagram unavailable' },
};
const authoredCode: ContentBlock_Code<'data', LanguageCode> = {
  id: 'code-id',
  slug: 'greeting',
  fileLocation: '/examples/greeting.ts',
  language: 'typescript',
  variables: [{ id: 'greeting', value: 'Hello' }],
};
const runtimeCode: ContentBlock_Code<'response', LanguageCode> = {
  id: 'code-id',
  type: 'code',
  code: 'console.log("{{greeting}}");',
  language: 'typescript',
  variables: [{ id: 'greeting', value: 'Hello' }],
};
const authoredFillImage: ContentBlock_Image<'data', LanguageCode> = {
  id: 'image-fill-id',
  slug: 'responsive-diagram',
  src: '/diagram.png',
  alt: 'Responsive light ray diagram',
  fill: true,
  aspectRatio: 16 / 9,
  objectFit: 'contain',
  sizes: '(max-width: 768px) 100vw, 768px',
};
// @ts-expect-error Embedded YouTube videos require an accessible title or hint.
const unlabelledYoutube: ContentBlock_Youtube<'response', LanguageCode> = {
  id: 'youtube-id',
  type: 'youtube',
  mode: 'embed',
  href: 'https://youtu.be/M7lc1UVf-VE',
};
const runtimeScene: ContentBlock_Scene<'response', LanguageCode> = {
  id: 'scene-id',
  type: 'scene',
  rendererKey: 'lightRayDiagram',
  messages: { title: 'Light ray' },
};

const customQuizScreen: ContentBlock_Quiz_Screen<'response', LanguageCode> = {
  content: [runtimeText],
};
// @ts-expect-error A custom screen requires at least one content block.
const emptyQuizScreen: ContentBlock_Quiz_Screen<'response', LanguageCode> = { content: [] };

// @ts-expect-error A localized runtime content block must carry its discriminator.
const missingDiscriminator: ContentBlock_Text<'response', LanguageCode> = {
  id: 'text-id',
  value: 'hello',
};

declare const flashcard: Flashcard<'data', LanguageCode>;
// @ts-expect-error Canonical authored card content arrays cannot be mutated.
flashcard.front.push(runtimeText);

declare const quiz: ContentBlock_Quiz<'response', LanguageCode>;
// @ts-expect-error Quiz question references are immutable.
quiz.questionSlugs.push('another-question');

void [runtimeText, authoredText, authoredYoutube, authoredImage, authoredFillImage, authoredCode, runtimeCode, unlabelledYoutube, runtimeScene, customQuizScreen, emptyQuizScreen, missingDiscriminator, quiz, flashcard];
