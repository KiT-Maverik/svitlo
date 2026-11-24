import { materializeContentSection } from '../contentSection/contentSection';
import { materializePracticeSection } from '../practiceSection/practiceSection';
import { materializeCodingTaskSection } from '../codingTaskSection/codingTaskSection';
import { materializeLearningFlowSection } from '../learningFlowSection/learningFlowSection';
import { materializeText } from '../text/materializeText';
import { materializeMarkdown } from '../markdown/materializeMarkdown';
import { materializeCode } from '../code/materializeCode';
import { materializeImage } from '../image/materializeImage';
import { materializeVideo } from '../video/materializeVideo';
import { materializeYoutube } from '../youtube/materializeYoutube';
import { materializeAudio } from '../audio/materializeAudio';
import { materializeSubtitles } from '../subtitles/materializeSubtitles';
import { materializeScene } from '../scene/materializeScene';
import { materializeCarousel } from '../carousel/materializeCarousel';
import { materializeCheckpoint } from '../checkpoint/materializeCheckpoint';
import { materializeCheckpointItem } from '../checkpointItem/materializeCheckpointItem';
import { materializeCheckpointAnswer } from '../checkpointAnswer/materializeCheckpointAnswer';

type Raw = Record<string, unknown>;
type File = { path: string; content: string; kind: 'typescript' | 'markdown' | 'specification' | 'code' };
type Result = {
  exportName: string;
  files: File[];
  diagnostics: { path: string; code: string; severity: 'warning'; message: string }[];
};
type Context = { directory: string; documentLanguage: string; languagesImport: string; production?: Raw };
const object = (x: unknown): x is Raw => x !== null && typeof x === 'object' && !Array.isArray(x);
const configOf = (x: unknown): Raw => {
  const result = object(x) && object(x.config) ? x.config : x;
  if (!object(result) || typeof result.type !== 'string') throw new Error('Expected authored ContentBlock Config');
  return result;
};
const productionOf = (x: unknown): Raw | undefined => (object(x) && object(x.production) ? x.production : undefined);
const child = (x: unknown): Raw => configOf(x);

function block(value: unknown, context: Context): Result {
  const config = configOf(value);
  const production = context.production ?? productionOf(value);
  const opts = { ...context, ...(production ? { production } : {}), plannedLanguages: [context.documentLanguage] };
  const render = (item: unknown, directory: string): Result =>
    block(item, { ...context, directory, production: productionOf(item) });
  switch (config.type) {
    case 'text':
      return materializeText(config as Parameters<typeof materializeText>[0], opts) as Result;
    case 'markdown':
      return materializeMarkdown(config as Parameters<typeof materializeMarkdown>[0], opts) as Result;
    case 'code':
      return materializeCode(config as Parameters<typeof materializeCode>[0], opts) as Result;
    case 'image':
      return materializeImage(config as Parameters<typeof materializeImage>[0], opts) as Result;
    case 'video':
      return materializeVideo(config as Parameters<typeof materializeVideo>[0], opts) as Result;
    case 'youtube':
      return materializeYoutube(config as Parameters<typeof materializeYoutube>[0], opts) as Result;
    case 'audio':
      return materializeAudio(config as Parameters<typeof materializeAudio>[0], opts) as Result;
    case 'subtitles':
      return materializeSubtitles(config as Parameters<typeof materializeSubtitles>[0], opts) as Result;
    case 'scene':
      return materializeScene(config as Parameters<typeof materializeScene>[0], {
        ...opts,
        registered: false,
        specificationSidecar: false,
        production: {
          specification: typeof production?.specification === 'string' ? production.specification : undefined,
          pending: true,
        },
      }) as Result;
    case 'carousel':
      return materializeCarousel(config as unknown as Parameters<typeof materializeCarousel>[0], {
        ...opts,
        renderChild: (item, directory) => render(item, directory),
      }) as Result;
    case 'checkpoint':
      return materializeCheckpoint(config as unknown as Parameters<typeof materializeCheckpoint>[0], {
        ...opts,
        renderItem: (item, directory) =>
          materializeCheckpointItem(child(item) as Parameters<typeof materializeCheckpointItem>[0], {
            ...opts,
            directory,
            renderQuestion: (question, subdir) => render(question, subdir),
            renderAnswer: (answer, subdir) =>
              materializeCheckpointAnswer(child(answer) as Parameters<typeof materializeCheckpointAnswer>[0], {
                ...opts,
                directory: subdir,
                renderChild: (nested, nestedDir) => render(nested, nestedDir),
              }),
          }),
      }) as Result;
    default:
      throw new Error('Unsupported Episode ContentBlock type: ' + config.type);
  }
}

/** Real Engine Section materializers are shared with Lesson source production.
 * Episode accepts only its existing four runtime-compatible Sections.
 */
export function materializeEpisodeSection(node: unknown, context: Context): Result {
  const config = configOf(node);
  const options = {
    ...context,
    production: productionOf(node),
    renderContentBlock: (part: unknown, opts: Context) => block(part, opts),
  };
  switch (config.type) {
    case 'content':
      return materializeContentSection(
        config as unknown as Parameters<typeof materializeContentSection>[0],
        options,
      ) as Result;
    case 'practice':
      return materializePracticeSection(
        config as unknown as Parameters<typeof materializePracticeSection>[0],
        options,
      ) as Result;
    case 'codingTask':
      return materializeCodingTaskSection(
        config as unknown as Parameters<typeof materializeCodingTaskSection>[0],
        options,
      ) as Result;
    case 'learningFlow':
      return materializeLearningFlowSection(
        config as unknown as Parameters<typeof materializeLearningFlowSection>[0],
        options,
      ) as Result;
    default:
      throw new Error('Unsupported Episode Section kind: ' + config.type);
  }
}
