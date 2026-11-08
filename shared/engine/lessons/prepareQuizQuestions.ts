import type { Locale_Languages, Question, Quiz_Parameters } from '@svitlo/contracts/content';

type QuestionResponse = Question<'response', Locale_Languages>;
type Bank = Record<string, Record<string, Record<string, unknown>>>;

/** Deterministic for published content and reproducible for user-created attempts with a supplied seed. */
function rng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled<T>(items: readonly T[], random: () => number): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function prepareQuizQuestions(
  catalog: Bank,
  parameters: Quiz_Parameters<'response', Locale_Languages>,
): QuestionResponse[] {
  const { selection } = parameters;
  const seed = selection.seed ?? 0;
  if (!Number.isSafeInteger(seed)) throw new Error('Quiz selection seed must be an integer');
  const random = rng(seed);
  const selectedSlugs = selection.questionSlugs;
  if (selectedSlugs && (!selectedSlugs.length || new Set(selectedSlugs).size !== selectedSlugs.length))
    throw new Error('Quiz questionSlugs must be nonempty and unique');
  const all = Object.values(catalog).flatMap(group => Object.values(group)) as QuestionResponse[];
  const lookup = new Map<string, QuestionResponse>();
  for (const question of all) {
    const slug = (question as QuestionResponse & { slug?: string }).slug;
    if (!slug || lookup.has(slug)) throw new Error('Ambiguous or missing Question slug: ' + slug);
    lookup.set(slug, question);
  }
  const pool = selectedSlugs
    ? selectedSlugs.map(slug => {
        const question = lookup.get(slug);
        if (!question) throw new Error('Unknown Quiz Question: ' + slug);
        return question;
      })
    : all;
  const ordered = selection.shuffle ? shuffled(pool, random) : [...pool];
  if (selection.mode === 'sample') {
    if (
      typeof selection.count !== 'number' ||
      !Number.isSafeInteger(selection.count) ||
      selection.count <= 0 ||
      selection.count > ordered.length
    )
      throw new Error('Quiz sample count must be within the available question pool');
  } else if (selection.mode !== 'all') {
    throw new Error('Unsupported Quiz selection mode');
  }
  const chosen = selection.mode === 'sample' ? ordered.slice(0, selection.count) : ordered;
  if (!chosen.length) throw new Error('Quiz cannot be empty');

  return chosen.map(question => {
    if (question.type !== 'selectOneAnswer') return question;
    const settings = parameters.questionOptions?.selectOneAnswer;
    if (!settings) return question;
    const correct = Object.entries(question.answers.correct);
    const incorrect = Object.entries(question.answers.incorrect);
    const distractors = Object.entries(question.answers.distractors);
    if (!correct.length) throw new Error('SelectOneAnswer requires a correct answer: ' + question.id);
    if (
      settings.incorrectCount !== undefined &&
      (!Number.isSafeInteger(settings.incorrectCount) ||
        settings.incorrectCount < 0 ||
        settings.incorrectCount > incorrect.length)
    )
      throw new Error('Invalid Quiz incorrectCount for ' + question.id);
    const answers = {
      correct: Object.fromEntries([
        settings.correctVariant === 'random' ? correct[Math.floor(random() * correct.length)] : correct[0],
      ]),
      incorrect: Object.fromEntries(
        settings.incorrectCount === undefined
          ? incorrect
          : shuffled(incorrect, random).slice(0, settings.incorrectCount),
      ),
      distractors: Object.fromEntries(settings.includeDistractors === false ? [] : distractors),
    };
    if (settings.shuffleAnswers) {
      const mixed = shuffled(
        [
          ...Object.entries(answers.correct).map(([key, value]) => ({ key, value, kind: 'correct' as const })),
          ...Object.entries(answers.incorrect).map(([key, value]) => ({ key, value, kind: 'incorrect' as const })),
          ...Object.entries(answers.distractors).map(([key, value]) => ({ key, value, kind: 'distractor' as const })),
        ],
        random,
      );
      // A dedicated display order is required: response maps alone group correct/incorrect answers.
      return { ...question, answers, answerOrder: mixed.map(item => item.kind + ':' + item.key) };
    }
    return { ...question, answers };
  });
}
