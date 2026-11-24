/** Trusted Git check/commit adapter for the existing Flashcard Bank source plans. */
import type {
  FlashcardBankWorkflowStage1,
  FlashcardBankWorkflowStage3,
} from '../../../types/workflow/flashcardBankWorkflow.types';
import {
  materializeFlashcardBankDraft,
  materializeFlashcardBank,
  type FlashcardBankDraftAuthorization,
  type FlashcardBankFinalAuthorization,
} from './materializeFlashcardBank';
import {
  readBankGitSnapshot,
  checkBankGitPlan,
  commitBankGitPlan,
  type BankGitContext,
  type BankGitCheck,
  type BankGitCommit,
} from '../bankSource/bankSourceGitTransaction';

export type FlashcardBankDraftGitAuthorization = Omit<FlashcardBankDraftAuthorization, 'snapshot'>;
export type FlashcardBankFinalGitAuthorization = Omit<FlashcardBankFinalAuthorization, 'snapshot'>;

export function checkFlashcardBankDraftSource(
  input: FlashcardBankWorkflowStage1,
  authorization: FlashcardBankDraftGitAuthorization,
  git: BankGitContext,
): BankGitCheck {
  const plan = materializeFlashcardBankDraft(input, {
    ...authorization,
    snapshot: readBankGitSnapshot(git),
  });
  return checkBankGitPlan('flashcards', git, plan);
}

export function writeFlashcardBankDraftSource(
  input: FlashcardBankWorkflowStage1,
  authorization: FlashcardBankDraftGitAuthorization,
  git: BankGitContext,
): BankGitCommit {
  const plan = materializeFlashcardBankDraft(input, {
    ...authorization,
    snapshot: readBankGitSnapshot(git),
  });
  return commitBankGitPlan('flashcards', git, plan);
}

export function checkReviewedFlashcardBankSource(
  input: FlashcardBankWorkflowStage3,
  authorization: FlashcardBankFinalGitAuthorization,
  git: BankGitContext,
): BankGitCheck {
  const plan = materializeFlashcardBank(input, {
    ...authorization,
    snapshot: readBankGitSnapshot(git),
  });
  return checkBankGitPlan('flashcards', git, plan, {
    source: authorization.source,
    evaluatedInput: input,
  });
}

export function writeReviewedFlashcardBankSource(
  input: FlashcardBankWorkflowStage3,
  authorization: FlashcardBankFinalGitAuthorization,
  git: BankGitContext,
): BankGitCommit {
  const plan = materializeFlashcardBank(input, {
    ...authorization,
    snapshot: readBankGitSnapshot(git),
  });
  return commitBankGitPlan('flashcards', git, plan, {
    source: authorization.source,
    evaluatedInput: input,
  });
}
