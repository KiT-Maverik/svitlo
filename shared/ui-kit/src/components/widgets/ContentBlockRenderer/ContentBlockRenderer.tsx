'use client';

import { useEffect, useState, type ComponentType, type ReactNode } from 'react';
import MarkdownContent from '../MarkdownContent/MarkdownContent';
import KnowledgeCheckpoint from '../KnowledgeCheckpoint/KnowledgeCheckpoint';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import type { ContentBlock_Catalog, Question_Catalog } from '@svitlo/engine/content';

/** Only the new, serialized response catalog is accepted here. */
type ResponseCatalog = ContentBlock_Catalog<'response'>;
export type ContentBlockType = keyof ResponseCatalog;
export type ContentBlockResponse<Type extends ContentBlockType> = NonNullable<ResponseCatalog[Type]>[string];

type SceneResponse = ContentBlockResponse<'scene'>;

/** The key is a stable, explicitly registered scene identifier, never a JSON component. */
export type SceneRegistry = Readonly<
  Record<string, ComponentType<{ locale: SceneResponse['locale'] }>>
>;

export interface ContentBlockRenderContext {
  sceneRegistry?: SceneRegistry;
  questions?: Question_Catalog<'response'>;
}

export type ContentBlockRendererProps = {
  [Type in ContentBlockType]: ContentBlockRenderContext & {
    type: Type;
    response: ContentBlockResponse<Type>;
  };
}[ContentBlockType];

export type ContentBlockReference = {
  [Type in ContentBlockType]: { type: Type; key: string };
}[ContentBlockType];

type NestedResponse = { [Type in ContentBlockType]: ContentBlockResponse<Type> }[ContentBlockType];
type TaggedResponse = {
  [Type in ContentBlockType]: ContentBlockResponse<Type> & { type: Type };
}[ContentBlockType];

const supportedTypes = new Set<string>([
  'text', 'markdown', 'checkpoint', 'scene', 'code',
  'audio', 'video', 'youtube', 'image', 'quiz',
]);

function assertNever(value: never): never {
  throw new Error('Unsupported content block type: ' + String((value as { type: string }).type));
}

/**
 * Nested blocks in the current contracts do not carry type. Agent 3 must add
 * response.type; until then, reject ambiguous payloads instead of guessing by
 * their shape (several variants have overlapping properties).
 */
function requireTaggedResponse(response: NestedResponse): TaggedResponse {
  if (!('type' in response) || typeof response.type !== 'string' || !supportedTypes.has(response.type)) {
    throw new Error('Nested content block ' + response.id + ' requires a supported response.type discriminator');
  }
  // This assertion is restricted to the JSON boundary; the new contract will
  // make it redundant when ContentBlock_Response_Meta includes type: T.
  return response as TaggedResponse;
}

function renderNested(response: NestedResponse, context: ContentBlockRenderContext): ReactNode {
  const tagged = requireTaggedResponse(response);
  switch (tagged.type) {
    case 'text': return <ContentBlockRenderer type="text" response={tagged} {...context} />;
    case 'markdown': return <ContentBlockRenderer type="markdown" response={tagged} {...context} />;
    case 'checkpoint': return <ContentBlockRenderer type="checkpoint" response={tagged} {...context} />;
    case 'scene': return <ContentBlockRenderer type="scene" response={tagged} {...context} />;
    case 'code': return <ContentBlockRenderer type="code" response={tagged} {...context} />;
    case 'audio': return <ContentBlockRenderer type="audio" response={tagged} {...context} />;
    case 'video': return <ContentBlockRenderer type="video" response={tagged} {...context} />;
    case 'youtube': return <ContentBlockRenderer type="youtube" response={tagged} {...context} />;
    case 'image': return <ContentBlockRenderer type="image" response={tagged} {...context} />;
    case 'quiz': return <ContentBlockRenderer type="quiz" response={tagged} {...context} />;
    default: return assertNever(tagged);
  }
}

function localizedAttributes(response: { locale: { code: string } }) {
  const language = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === response.locale.code);
  return { lang: language?.locale ?? response.locale.code, dir: language?.direction ?? 'ltr' };
}

function CodeBlock({ response }: { response: ContentBlockResponse<'code'> }) {
  const [loaded, setLoaded] = useState<{ path: string; value: string } | null>(null);
  const [failed, setFailed] = useState<{ path: string; message: string } | null>(null);
  const locationIsLocal = response.fileLocation.startsWith('/') && !response.fileLocation.startsWith('//');

  useEffect(() => {
    if (response.codeParams.length !== 0 || !locationIsLocal) return;
    const controller = new AbortController();
    void fetch(response.fileLocation, { signal: controller.signal })
      .then(async result => {
        if (!result.ok) throw new Error('HTTP ' + result.status);
        return result.text();
      })
      .then(value => {
        if (!controller.signal.aborted) setLoaded({ path: response.fileLocation, value });
      })
      .catch(reason => {
        if (!controller.signal.aborted) setFailed({ path: response.fileLocation, message: String(reason) });
      });
    return () => controller.abort();
  }, [response.fileLocation, response.codeParams, locationIsLocal]);

  if (response.codeParams.length !== 0) {
    throw new Error('Code block selector/parameter transformations are not defined by the Response contract');
  }
  if (!locationIsLocal) throw new Error('Code fileLocation must reference a same-origin published resource');
  if (failed?.path === response.fileLocation) return <p role="alert">{failed.message}</p>;
  return (
    <pre {...localizedAttributes(response)}>
      <code>{loaded?.path === response.fileLocation ? loaded.value : response.fileLocation}</code>
    </pre>
  );
}

function validateYoutubeUrl(href: string): URL {
  let url: URL;
  try { url = new URL(href); }
  catch { throw new Error('Invalid YouTube URL'); }
  if (url.protocol !== 'https:') throw new Error('YouTube URL must use HTTPS');
  const allowed = ['youtu.be', 'youtube.com', 'www.youtube.com', 'm.youtube.com', 'www.youtube-nocookie.com'];
  if (!allowed.includes(url.hostname.toLowerCase())) throw new Error('URL is not a supported YouTube host');
  return url;
}

function youtubeEmbedUrl(href: string): string {
  const url = validateYoutubeUrl(href);
  const host = url.hostname.toLowerCase();
  let id: string | undefined;
  if (host === 'youtu.be') id = url.pathname.slice(1);
  else if (host === 'youtube.com' || host === 'www.youtube.com' || host === 'm.youtube.com' || host === 'www.youtube-nocookie.com') {
    if (url.pathname === '/watch') id = url.searchParams.get('v') ?? undefined;
    else if (url.pathname.startsWith('/embed/')) id = url.pathname.slice('/embed/'.length);
    else if (url.pathname.startsWith('/shorts/')) id = url.pathname.slice('/shorts/'.length);
  }
  if (!id || !/^[A-Za-z0-9_-]{11}$/.test(id)) throw new Error('Unsupported YouTube video identifier');
  return 'https://www.youtube-nocookie.com/embed/' + id;
}

function YoutubeBlock({ response }: { response: ContentBlockResponse<'youtube'> }) {
  const attributes = localizedAttributes(response);
  if (response.mode === 'link') {
    validateYoutubeUrl(response.href);
    return (
      <a {...attributes} href={response.href} rel="noopener noreferrer" target="_blank">
        {response.title || response.hint || response.href}
      </a>
    );
  }
  if (response.mode === 'embed') {
    const url = youtubeEmbedUrl(response.href);
    if (!response.title && !response.hint) throw new Error('Embedded YouTube blocks require an accessible title or hint');
    return (
      <figure {...attributes}>
        <iframe
          src={url}
          title={response.title || response.hint}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
        {response.hint && <figcaption>{response.hint}</figcaption>}
      </figure>
    );
  }
  throw new Error('Unsupported YouTube display mode');
}

function stableHash(value: string): number {
  let hash = 2166136261;
  for (const char of value) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return hash >>> 0;
}

function QuizBlock({
  response,
  context,
}: {
  response: ContentBlockResponse<'quiz'>;
  context: ContentBlockRenderContext;
}) {
  const questions = response.questionSlugs.map(slug => {
    const question = context.questions?.selectOneAnswer?.[slug];
    if (!question) throw new Error('Missing selectOneAnswer question: ' + slug);
    return question;
  });
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [retriesUsed, setRetriesUsed] = useState(0);
  const score = questions.filter(question => Object.entries(question.answers.correct)
    .some(([key, item]) => (answers[question.id] === key || answers[question.id] === item.id))).length;
  const attrs = localizedAttributes(response);
  return (
    <section {...attrs} aria-label={response.welcome}>
      <p>{response.welcome}</p>
      <form onSubmit={event => { event.preventDefault(); setSubmitted(true); }}>
        {questions.map((question, index) => {
          const options = [
            ...Object.entries(question.answers.correct),
            ...Object.entries(question.answers.incorrect),
            ...Object.entries(question.answers.distractors),
          ].sort((a, b) => stableHash(question.id + ':' + a[0]) - stableHash(question.id + ':' + b[0]));
          const name = 'quiz-' + response.id + '-' + question.id;
          return (
            <fieldset key={question.id} disabled={submitted}>
              <legend>{index + 1}</legend>
              <div id={name + '-prompt'}>
                {question.question.map((block, blockIndex) => (
                  <div key={block.id + ':' + blockIndex}>{renderNested(block, context)}</div>
                ))}
              </div>
              <div role="group" aria-labelledby={name + '-prompt'}>
                {options.map(([key, block]) => {
                  const optionId = name + '-' + key;
                  return (
                    <div key={key}>
                      <input
                        id={optionId}
                        type="radio"
                        name={name}
                        value={key}
                        aria-labelledby={optionId + '-content'}
                        checked={answers[question.id] === key}
                        onChange={() => setAnswers(previous => ({ ...previous, [question.id]: key }))}
                      />
                      <div id={optionId + '-content'}>{renderNested(block, context)}</div>
                    </div>
                  );
                })}
              </div>
              {submitted && response.interaction.allowExplanations && question.explanation?.map((block, blockIndex) => (
                <div key={block.id + ':' + blockIndex}>{renderNested(block, context)}</div>
              ))}
            </fieldset>
          );
        })}
        {!submitted && questions.length > 0 && <input type="submit" disabled={questions.some(q => !answers[q.id])} />}
        {submitted && response.results.showScore && response.results.visibility !== 'hidden' && (
          <output aria-live="polite">{score} / {questions.length}</output>
        )}
        {submitted && retriesUsed < response.interaction.retries && (
          <input type="reset" onClick={() => {
            setSubmitted(false);
            setAnswers({});
            setRetriesUsed(previous => previous + 1);
          }} />
        )}
      </form>
    </section>
  );
}

/**
 * Central, exhaustive dispatch. Passing 'response' is mandatory; definitions and
 * authored data cannot be passed without a type error.
 */
export function ContentBlockRenderer(props: ContentBlockRendererProps): ReactNode {
  const context: ContentBlockRenderContext = { sceneRegistry: props.sceneRegistry, questions: props.questions };
  switch (props.type) {
    case 'text':
      return <p {...localizedAttributes(props.response)}>{props.response.value}</p>;
    case 'markdown':
      return <MarkdownContent content={props.response.text} {...localizedAttributes(props.response)} />;
    case 'checkpoint': {
      const response = props.response;
      const locale = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === response.locale.code)?.locale ?? 'en-US';
      return (
        <KnowledgeCheckpoint
          title={response.title}
          locale={locale}
          headingLevel={response.headingLevel}
          showIndices={response.showIndices}
          showChevron={response.showChevron}
          showIcon={response.showIcon}
          indexPosition={response.indexPosition}
          iconPosition={response.iconPosition}
          chevronPosition={response.chevronPosition}
          enableChecks={response.enableChecks ?? false}
          renderAsGroup={response.renderAsGroup}
          items={response.items.map((item, index) => ({
            id: `${response.id}:${index}`,
            question: item.question,
            answer: item.answer,
            enableCheck: item.check,
          }))}
          slots={{ renderAnswer: answers => answers.map((block, index) => (
            <div key={`${block.id}:${index}`}>{renderNested(block, context)}</div>
          )) }}
        />
      );
    }
    case 'scene': {
      const Scene = props.sceneRegistry?.[props.response.id];
      if (!Scene) throw new Error('Unregistered scene id: ' + props.response.id);
      return <Scene locale={props.response.locale} />;
    }
    case 'code':
      return <CodeBlock response={props.response} />;
    case 'audio':
      return (
        <figure {...localizedAttributes(props.response)}>
          <audio controls src={props.response.fileLocation} aria-label={props.response.title} preload="metadata" />
          {props.response.description && <figcaption>{props.response.description}</figcaption>}
        </figure>
      );
    case 'video':
      return (
        <video {...localizedAttributes(props.response)} controls src={props.response.fileLocation}
          poster={props.response.poster} preload="metadata" playsInline />
      );
    case 'youtube':
      return <YoutubeBlock response={props.response} />;
    case 'image':
      return <img {...localizedAttributes(props.response)} src={props.response.src} alt={props.response.alt} loading="lazy" />;
    case 'quiz':
      return <QuizBlock response={props.response} context={context} />;
    default:
      return assertNever(props);
  }
}

/** Resolve a type-grouped catalog against an explicitly ordered list. */
export function ContentBlockCatalogRenderer({
  catalog,
  order,
  ...context
}: ContentBlockRenderContext & {
  catalog: ResponseCatalog;
  order: readonly ContentBlockReference[];
}): ReactNode {
  const catalogKeys = new Set<string>();
  for (const [type, blocks] of Object.entries(catalog)) {
    if (!supportedTypes.has(type)) throw new Error('Unsupported catalog content type: ' + type);
    if (blocks) for (const key of Object.keys(blocks)) catalogKeys.add(type + ':' + key);
  }
  const rendered = new Set<string>();
  const content = order.map(({ type, key }) => {
    const identity = type + ':' + key;
    if (rendered.has(identity)) throw new Error('Duplicate content reference: ' + identity);
    rendered.add(identity);
    if (!catalogKeys.has(identity)) throw new Error('Missing content reference: ' + identity);
    switch (type) {
      case 'text': return <ContentBlockRenderer key={identity} type="text" response={catalog.text![key]} {...context} />;
      case 'markdown': return <ContentBlockRenderer key={identity} type="markdown" response={catalog.markdown![key]} {...context} />;
      case 'checkpoint': return <ContentBlockRenderer key={identity} type="checkpoint" response={catalog.checkpoint![key]} {...context} />;
      case 'scene': return <ContentBlockRenderer key={identity} type="scene" response={catalog.scene![key]} {...context} />;
      case 'code': return <ContentBlockRenderer key={identity} type="code" response={catalog.code![key]} {...context} />;
      case 'audio': return <ContentBlockRenderer key={identity} type="audio" response={catalog.audio![key]} {...context} />;
      case 'video': return <ContentBlockRenderer key={identity} type="video" response={catalog.video![key]} {...context} />;
      case 'youtube': return <ContentBlockRenderer key={identity} type="youtube" response={catalog.youtube![key]} {...context} />;
      case 'image': return <ContentBlockRenderer key={identity} type="image" response={catalog.image![key]} {...context} />;
      case 'quiz': return <ContentBlockRenderer key={identity} type="quiz" response={catalog.quiz![key]} {...context} />;
      default: return assertNever(type);
    }
  });
  if (rendered.size !== catalogKeys.size) {
    throw new Error('Content order omits ' + (catalogKeys.size - rendered.size) + ' catalog block(s)');
  }
  return <>{content}</>;
}
