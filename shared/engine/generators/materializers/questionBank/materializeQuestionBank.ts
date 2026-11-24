/**
 * Explicit Question Bank Stage 1 and reviewed Stage 3 source operations.
 * Never materializes a Quiz Section, publishes Props, or fabricates a Question.
 */
import { lessonProductionAssessmentRequirements_Schema } from '../../../types/workflow/lessonAssessment.types';
import { invokeMaterializer } from '../directMaterialization/directMaterialization';
import { questionBankWorkflowStage3_Schema } from '../../../types/workflow/bankWorkflowFinal.schemas';
import type {
  QuestionBankWorkflowStage1,
  QuestionBankWorkflowMaterializerInput,
} from '../../../types/workflow/questionBankWorkflow.types';
import { materializeSelectOneAnswer } from '../selectOneAnswer/materializeSelectOneAnswer';
import { materializeSelectMultipleAnswers } from '../selectMultipleAnswers/materializeSelectMultipleAnswers';
import { materializeMatchBlocks } from '../matchBlocks/materializeMatchBlocks';
import { materializeAnswerWithText } from '../answerWithText/materializeAnswerWithText';
import { materializeAnswerWithNumber } from '../answerWithNumber/materializeAnswerWithNumber';
import { materializeOrderSequence } from '../orderSequence/materializeOrderSequence';
import { materializeBuildAnswerWithBlocks } from '../buildAnswerWithBlocks/materializeBuildAnswerWithBlocks';
import { materializeFillBlanksWithBlocks } from '../fillBlanksWithBlocks/materializeFillBlanksWithBlocks';
import { materializeFillBlanksWithText } from '../fillBlanksWithText/materializeFillBlanksWithText';
import {
  assertBankLanguages,
  assertBankOrder,
  assertBankPath,
  assertBankSha,
  assertBankStatement,
  assertBankUuid,
  assertUniqueBankEntityIds,
  assertNoPendingBankSources,
  assertReviewedBankInput,
  authoredBankLiteral,
  preflightBankSource,
  type BankReviewedSource,
  type BankSourceSnapshot,
  type BankSourceResult,
  type BankSourceFile,
  type BankSourceDiagnostic,
} from '../bankSource/bankSourceSafety';
import { materializeAssessmentBlock, type AssessmentBlockEvidence } from '../bankSource/materializeAssessmentBlock';

const kinds = [
  'selectOneAnswer',
  'selectMultipleAnswers',
  'matchBlocks',
  'answerWithText',
  'answerWithNumber',
  'orderSequence',
  'buildAnswerWithBlocks',
  'fillBlanksWithBlocks',
  'fillBlanksWithText',
] as const;
type Kind = (typeof kinds)[number];
const kindSet: ReadonlySet<string> = new Set(kinds);

/** Stage 7 is authorized by the owning Lesson PR, not by absent Quiz Sections. */
export type QuestionBankDraftAuthorization = {
  authorized: true;
  ownerLessonId: string;
  lessonSourceSha: string;
  referenceSha: string;
  methodologistReviewSha: string;
  /** Explicit additional authorization when the Lesson decided no own bank is required. */
  independentBankAuthorization?: { sourceSha: string; rationale: string };
  snapshot: BankSourceSnapshot;
};

/** The trusted writer verifies source/review/HEAD against the hosting Git API. */
export type QuestionBankFinalAuthorization = {
  ownerLessonId: string;
  independentBankAuthorization?: { sourceSha: string; rationale: string };
  reviewed: BankReviewedSource;
  snapshot: BankSourceSnapshot;
  /** Concrete Scene registry and media evidence are checked before delegation. */
  blocks: AssessmentBlockEvidence;
};

function validateStage1(
  input: QuestionBankWorkflowStage1,
  lessonId: string,
  independent?: { sourceSha: string; rationale: string },
): void {
  assertBankUuid(lessonId, 'Question Bank owning Lesson');
  if (!input || input.config?.ownerLessonId !== lessonId) {
    throw new Error('Question Bank must use the actual owning Lesson UUID');
  }
  const p = input.production;
  if (!p) throw new Error('Question Bank Lesson Stage 7 handoff required');
  assertBankLanguages(p.languages);
  assertBankSha(p.lesson.sourceSha, 'Lesson source');
  assertBankSha(p.lesson.referenceSha, 'Lesson reference');
  for (const [label, value] of [
    ['Lesson source path', p.lesson.sourcePath],
    ['Lesson reference path', p.lesson.referencePath],
    ['Lesson methodology path', p.lesson.methodologyPath],
  ] as const)
    assertBankPath(value);
  for (const [label, value] of [
    ['Lesson title', p.lesson.title],
    ['Question ownership rationale', p.ownershipRationale],
    ['audience', p.audience],
    ['scope', p.scope],
    ['prerequisites', p.prerequisites],
    ['misconceptions', p.misconceptions],
    ['media needs', p.mediaNeeds],
    ['sources and dependencies', p.sourcesAndDependencies],
  ] as const)
    assertBankStatement(value, label);
  if (
    !lessonProductionAssessmentRequirements_Schema.safeParse(p.assessment).success ||
    typeof p.assessment.quizRequiredForCompletion !== 'boolean'
  ) {
    throw new Error('Preserve all independent Lesson assessment decisions');
  }
  if (p.assessment.questionBankRequired !== true) {
    if (!independent) throw new Error('Questions N/A: independent bank authorization required');
    assertBankSha(independent.sourceSha, 'Independent Question Bank authorization');
    assertBankStatement(independent.rationale, 'Independent Question Bank rationale');
    if (independent.sourceSha !== p.lesson.sourceSha) throw new Error('Stale independent Question Bank authorization');
  }
  if (!Array.isArray(p.evidenceIntent) || !p.evidenceIntent.length) {
    throw new Error('Methodologist assessment evidence is required');
  }
  for (const item of p.evidenceIntent) {
    assertBankUuid(item.skillId, 'assessed Skill');
    for (const key of [
      'outcome',
      'assessmentMethod',
      'cognitiveOperation',
      'knowledgeAspect',
      'cognitiveDemand',
      'misconception',
      'context',
      'expectedEvidence',
    ] as const) {
      assertBankStatement(item[key], 'evidenceIntent.' + key);
    }
  }
}

/** Produce exactly one editable, nonpublishable Stage 1 TS module. */
export function materializeQuestionBankDraft(
  input: QuestionBankWorkflowStage1,
  authorization: QuestionBankDraftAuthorization,
): BankSourceResult {
  if (authorization.authorized !== true) throw new Error('Lesson Stage 7 authorization missing');
  validateStage1(input, authorization.ownerLessonId, authorization.independentBankAuthorization);
  assertBankSha(authorization.methodologistReviewSha, 'Methodologist review');
  if (
    input.production.lesson.sourceSha !== authorization.lessonSourceSha ||
    input.production.lesson.referenceSha !== authorization.referenceSha
  ) {
    throw new Error('Stale Lesson/assessment handoff');
  }
  const files: BankSourceFile[] = [
    {
      path: 'questions/draft.ts',
      kind: 'typescript',
      content:
        "import type { QuestionBankWorkflowStage1 } from '@svitlo/engine/build';\n\n" +
        '// Stage 1 editorial source. NOT a publishable bank or Quiz Section.\n' +
        'export const questionBank = ' +
        authoredBankLiteral(input) +
        ' satisfies QuestionBankWorkflowStage1;\n',
    },
  ];
  return preflightBankSource(files, authorization.snapshot);
}

/** Existing concrete kind materializers own each leaf and its nested blocks. */
function renderQuestion(
  kind: Kind,
  node: Record<string, unknown>,
  sourceLanguage: QuestionBankWorkflowMaterializerInput['production']['languages'],
  blocks: AssessmentBlockEvidence,
): { exportName: string; files: BankSourceFile[]; diagnostics?: BankSourceDiagnostic[] } {
  const context = {
    directory: 'questions/' + kind,
    languages: sourceLanguage,
    materializeBlock: (
      block: {
        config: { id: string; slug: string; type: string } & Record<string, unknown>;
        production?: Record<string, unknown>;
      },
      location: { directory: string; documentLanguage: string },
    ) => materializeAssessmentBlock(block, location, sourceLanguage.planned, 'questionsLanguages', blocks),
  };
  // The nine concrete renderers still use their own index-signature source
  // adapter types. Validate the reviewed typed bank first, then bridge each
  // plain authoring node solely at that concrete boundary (never as any).
  switch (kind) {
    case 'selectOneAnswer':
      return materializeSelectOneAnswer(node as unknown as Parameters<typeof materializeSelectOneAnswer>[0], context);
    case 'selectMultipleAnswers':
      return materializeSelectMultipleAnswers(
        node as unknown as Parameters<typeof materializeSelectMultipleAnswers>[0],
        context,
      );
    case 'matchBlocks':
      return materializeMatchBlocks(node as unknown as Parameters<typeof materializeMatchBlocks>[0], context);
    case 'answerWithText':
      return materializeAnswerWithText(node as unknown as Parameters<typeof materializeAnswerWithText>[0], context);
    case 'answerWithNumber':
      return materializeAnswerWithNumber(node as unknown as Parameters<typeof materializeAnswerWithNumber>[0], context);
    case 'orderSequence':
      return materializeOrderSequence(node as unknown as Parameters<typeof materializeOrderSequence>[0], context);
    case 'buildAnswerWithBlocks':
      return materializeBuildAnswerWithBlocks(
        node as unknown as Parameters<typeof materializeBuildAnswerWithBlocks>[0],
        context,
      );
    case 'fillBlanksWithBlocks':
      return materializeFillBlanksWithBlocks(
        node as unknown as Parameters<typeof materializeFillBlanksWithBlocks>[0],
        context,
      );
    case 'fillBlanksWithText':
      return materializeFillBlanksWithText(
        node as unknown as Parameters<typeof materializeFillBlanksWithText>[0],
        context,
      );
  }
}

/**
 * Stage 5: every approved Question, including ones not selected for any Quiz.
 * The exact Stage 3 draft remains recoverable from the reviewed Git commit and blob.
 * #775's trusted writer must apply the complete returned plan atomically.
 */
export function materializeQuestionBank(
  input: QuestionBankWorkflowMaterializerInput,
  authorization?: QuestionBankFinalAuthorization,
): BankSourceResult {
  return invokeMaterializer('questions-stage5', authorization, approved => {
    const parsed = questionBankWorkflowStage3_Schema.safeParse(input);
    if (!parsed.success) throw new Error('Invalid reviewed questionBank Stage 3 input: ' + parsed.error.message);
    return planQuestionBank(input, approved);
  });
}

function planQuestionBank(
  input: QuestionBankWorkflowMaterializerInput,
  authorization: QuestionBankFinalAuthorization,
): BankSourceResult {
  validateStage1(input, authorization.ownerLessonId, authorization.independentBankAuthorization);
  assertReviewedBankInput(input, authorization.reviewed);
  const questions = input.config.questions;
  if (!questions || typeof questions !== 'object') throw new Error('Missing complete Question inventory');
  for (const key of Object.keys(questions)) {
    if (!kindSet.has(key)) throw new Error('Unrecognized Question kind ' + key);
  }
  const quiz = input.production.quiz;
  if (!quiz || !['none', 'local'].includes(quiz.kind)) {
    throw new Error('Explicit Quiz editorial intent required');
  }
  assertBankStatement(quiz.rationale, 'Quiz intent rationale');
  if (quiz.kind === 'local') {
    assertBankOrder(quiz.sections.items, quiz.sections.order, 'Quiz Section intent', true);
    const sections = new Set<string>();
    for (const [key, value] of Object.entries(quiz.sections.items)) {
      assertBankUuid(value.sectionId, 'Quiz Section ' + key);
      assertBankPath(value.sectionPath);
      if (sections.has(value.sectionId)) throw new Error('Duplicate Quiz Section identity');
      sections.add(value.sectionId);
      assertBankStatement(value.selectionRationale, 'Quiz selection rationale');
      assertBankStatement(value.coverage, 'Quiz coverage');
      assertBankStatement(value.upstreamDependencies, 'Quiz upstream dependencies');
    }
  }
  assertUniqueBankEntityIds(questions);
  assertNoPendingBankSources(questions);
  const source = input.production.languages;
  const files: BankSourceFile[] = [];
  const diagnostics: BankSourceDiagnostic[] = [];
  const rootImports: string[] = [];
  const rootEntries: string[] = [];
  const seenIds = new Set<string>();
  let count = 0;
  for (const kind of kinds) {
    const members = questions[kind];
    if (!members) continue;
    if (typeof members !== 'object' || Array.isArray(members) || !Object.keys(members).length) {
      throw new Error('Question kind ' + kind + ' has no members');
    }
    const slugs = Object.keys(members);
    const kindImports: string[] = [];
    const entries: string[] = [];
    for (const slug of slugs) {
      if (!/^[a-z][A-Za-z0-9]*$/.test(slug)) throw new Error('Invalid Question slug ' + slug);
      const node = members[slug];
      if (!node || typeof node !== 'object') throw new Error('Missing Question at ' + kind + '/' + slug);
      const { config, production } = node;
      if (config.type !== kind || config.slug !== slug) {
        throw new Error('Question kind/slug mismatch at ' + kind + '/' + slug);
      }
      assertBankUuid(config.id, 'Question ' + kind + '/' + slug);
      if (seenIds.has(config.id.toLowerCase())) throw new Error('Duplicate Question UUID: ' + config.id);
      seenIds.add(config.id.toLowerCase());
      if (!production || production.pending) throw new Error('Unreviewed or pending Question ' + slug);
      assertBankStatement(production.rationale, 'Question rationale');
      assertBankStatement(production.distinction, 'Question distinction');
      const output = renderQuestion(kind, { config, production }, source, authorization.blocks);
      files.push(...output.files);
      diagnostics.push(...(output.diagnostics ?? []));
      kindImports.push(
        'export { ' +
          output.exportName +
          (output.exportName !== slug ? ' as ' + slug : '') +
          ' } from ' +
          JSON.stringify('./' + slug) +
          ';',
      );
      const alias = 'question_' + kind + '_' + slug;
      rootImports.push('import { ' + slug + ' as ' + alias + ' } from ' + JSON.stringify('./' + kind) + ';');
      entries.push('    ' + JSON.stringify(slug) + ': ' + alias + ',');
      count++;
    }
    files.push({
      path: 'questions/' + kind + '/index.ts',
      kind: 'typescript',
      content: kindImports.join('\n') + '\n',
    });
    rootEntries.push('  ' + JSON.stringify(kind) + ': {\n' + entries.join('\n') + '\n  },');
  }
  if (!count) throw new Error('Reviewed Question Bank must be nonempty');
  files.push({
    path: 'questions/index.ts',
    kind: 'typescript',
    content: rootImports.join('\n') + '\n\nexport const questions = {\n' + rootEntries.join('\n') + '\n};\n',
  });
  files.push({
    path: 'questionsLanguages.ts',
    kind: 'typescript',
    content:
      '// Original reviewed source locale only; translations require independent review.\n' +
      'export const languages = ' +
      JSON.stringify([source.document]) +
      ' as const;\n',
  });
  const result = preflightBankSource(files, authorization.snapshot, {
    indexPath: 'questions/index.ts',
    draftPath: 'questions/draft.ts',
    reviewed: authorization.reviewed,
  });
  // Only an external authenticated Git writer may commit this atomic transition.
  return { ...result, diagnostics };
}
