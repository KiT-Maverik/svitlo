/**
 * @fileoverview Trusted Course-only Episode Section bridge. Reuse the exact
 * concrete Engine Section and ContentBlock materializers invoked by Lesson
 * Stage 6; never treat a reviewed Episode as authority to start a Lesson or
 * publish Props. Requires the trusted Engine build, not PR-head binaries.
 */
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const built = path.resolve(
  process.env.COURSE_RENDERER_DIST ??
    path.resolve(import.meta.dirname, '../../../shared/engine/temp/typed-course-renderers'),
);

function concrete(folder, file, symbol) {
  const result = require(path.join(built, folder, file + '.js'))[symbol];
  if (typeof result !== 'function') throw Error('Trusted Engine source materializer not found: ' + symbol);
  return result;
}

const sectionContent = concrete('contentSection', 'contentSection', 'materializeContentSection');
const sectionPractice = concrete('practiceSection', 'practiceSection', 'materializePracticeSection');
const sectionCoding = concrete('codingTaskSection', 'codingTaskSection', 'materializeCodingTaskSection');
const sectionLearning = concrete('learningFlowSection', 'learningFlowSection', 'materializeLearningFlowSection');
const sectionQuiz = concrete('quizSection', 'quizSection', 'materializeQuizSection');
const sectionFlashcards = concrete('flashcardsSection', 'flashcardsSection', 'materializeFlashcardsSection');
const sectionQuest = concrete('questSection', 'questSection', 'materializeQuestSection');
const questStage = concrete('questStage', 'questStage', 'materializeQuestStage');
const questTask = concrete('questTask', 'questTask', 'materializeQuestTask');

const text = concrete('text', 'materializeText', 'materializeText');
const markdown = concrete('markdown', 'materializeMarkdown', 'materializeMarkdown');
const code = concrete('code', 'materializeCode', 'materializeCode');
const image = concrete('image', 'materializeImage', 'materializeImage');
const video = concrete('video', 'materializeVideo', 'materializeVideo');
const youtube = concrete('youtube', 'materializeYoutube', 'materializeYoutube');
const audio = concrete('audio', 'materializeAudio', 'materializeAudio');
const subtitles = concrete('subtitles', 'materializeSubtitles', 'materializeSubtitles');
const scene = concrete('scene', 'materializeScene', 'materializeScene');
const carousel = concrete('carousel', 'materializeCarousel', 'materializeCarousel');
const checkpoint = concrete('checkpoint', 'materializeCheckpoint', 'materializeCheckpoint');
const checkpointItem = concrete('checkpointItem', 'materializeCheckpointItem', 'materializeCheckpointItem');
const checkpointAnswer = concrete('checkpointAnswer', 'materializeCheckpointAnswer', 'materializeCheckpointAnswer');

const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const unwrap = value => (isObject(value?.config) ? value.config : value);
const metadata = value => (isObject(value?.config) ? value.production : undefined);

function block(value, context) {
  const config = unwrap(value);
  const opts = {
    ...context,
    production: context.production ?? metadata(value),
    plannedLanguages: [context.documentLanguage],
  };
  const recurse = (child, directory) =>
    block(child, {
      ...opts,
      directory,
      languagesImport: opts.languagesImport,
      production: metadata(child),
    });
  switch (config?.type) {
    case 'text':
      return text(config, opts);
    case 'markdown':
      return markdown(config, opts);
    case 'code':
      return code(config, opts);
    case 'image':
      return image(config, opts);
    case 'video':
      return video(config, opts);
    case 'youtube':
      return youtube(config, opts);
    case 'audio':
      return audio(config, opts);
    case 'subtitles':
      return subtitles(config, opts);
    case 'scene':
      return scene(config, {
        ...opts,
        registered: false,
        production: {
          specification: opts.production?.specification,
          pending: true,
        },
      });
    case 'carousel':
      return carousel(config, { ...opts, renderChild: recurse });
    case 'checkpoint':
      return checkpoint(config, {
        ...opts,
        renderItem: (item, directory) =>
          checkpointItem(unwrap(item), {
            ...opts,
            directory,
            renderQuestion: (question, childDir) => recurse(question, childDir),
            renderAnswer: (answer, childDir) =>
              checkpointAnswer(unwrap(answer), {
                ...opts,
                directory: childDir,
                renderChild: recurse,
              }),
          }),
      });
    default:
      throw Error('Unsupported reviewed Episode ContentBlock kind: ' + config?.type);
  }
}

function section(value, context) {
  const config = unwrap(value);
  const options = { ...context, production: metadata(value), renderContentBlock: block };
  switch (config?.type) {
    case 'content':
      return sectionContent(config, options);
    case 'practice':
      return sectionPractice(config, options);
    case 'codingTask':
      return sectionCoding(config, options);
    case 'learningFlow':
      return sectionLearning(config, options);
    case 'quiz':
      return sectionQuiz(config, options);
    case 'flashcards':
      return sectionFlashcards(config, options);
    case 'quest':
      return sectionQuest(config, {
        ...options,
        renderStage: (stage, opts) =>
          questStage(unwrap(stage), {
            ...opts,
            production: metadata(stage),
            renderMedia: block,
          }),
        renderTask: (task, opts) =>
          questTask(unwrap(task), {
            ...opts,
            production: metadata(task),
            renderScene: block,
          }),
      });
    default:
      throw Error('Unsupported reviewed Episode Section kind: ' + config?.type);
  }
}

/** Deliberately no abstract registry: this is a Course→Episode-only bridge. */
export function materializeCourseEpisodeSection(value, context) {
  if (
    !context ||
    typeof context.directory !== 'string' ||
    typeof context.documentLanguage !== 'string' ||
    typeof context.languagesImport !== 'string'
  )
    throw Error('Canonical Course Episode Section materialization context required');
  return section(value, context);
}
