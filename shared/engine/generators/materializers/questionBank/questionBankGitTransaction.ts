/** Trusted Git check/commit adapter for the existing Question Bank source plans. */
import type {
  QuestionBankWorkflowStage1,
  QuestionBankWorkflowMaterializerInput,
} from '../../../types/workflow/questionBankWorkflow.types';
import {
  materializeQuestionBankDraft,
  materializeQuestionBank,
  type QuestionBankDraftAuthorization,
  type QuestionBankFinalAuthorization,
} from './materializeQuestionBank';
import {
  readBankGitSnapshot,
  checkBankGitPlan,
  commitBankGitPlan,
  type BankGitContext,
  type BankGitCheck,
  type BankGitCommit,
} from '../bankSource/bankSourceGitTransaction';

export type QuestionBankDraftGitAuthorization = Omit<QuestionBankDraftAuthorization, 'snapshot'>;
export type QuestionBankFinalGitAuthorization = Omit<QuestionBankFinalAuthorization, 'snapshot'>;

export function checkQuestionBankDraftSource(
  input: QuestionBankWorkflowStage1,
  authorization: QuestionBankDraftGitAuthorization,
  git: BankGitContext,
): BankGitCheck {
  const plan = materializeQuestionBankDraft(input, {
    ...authorization,
    snapshot: readBankGitSnapshot(git),
  });
  return checkBankGitPlan('questions', git, plan);
}

export function writeQuestionBankDraftSource(
  input: QuestionBankWorkflowStage1,
  authorization: QuestionBankDraftGitAuthorization,
  git: BankGitContext,
): BankGitCommit {
  const plan = materializeQuestionBankDraft(input, {
    ...authorization,
    snapshot: readBankGitSnapshot(git),
  });
  return commitBankGitPlan('questions', git, plan);
}

export function checkReviewedQuestionBankSource(
  input: QuestionBankWorkflowMaterializerInput,
  authorization: QuestionBankFinalGitAuthorization,
  git: BankGitContext,
): BankGitCheck {
  const plan = materializeQuestionBank(input, {
    ...authorization,
    snapshot: readBankGitSnapshot(git),
  });
  return checkBankGitPlan('questions', git, plan, {
    reviewed: authorization.reviewed,
    evaluatedInput: input,
  });
}

export function writeReviewedQuestionBankSource(
  input: QuestionBankWorkflowMaterializerInput,
  authorization: QuestionBankFinalGitAuthorization,
  git: BankGitContext,
): BankGitCommit {
  const plan = materializeQuestionBank(input, {
    ...authorization,
    snapshot: readBankGitSnapshot(git),
  });
  return commitBankGitPlan('questions', git, plan, {
    reviewed: authorization.reviewed,
    evaluatedInput: input,
  });
}
