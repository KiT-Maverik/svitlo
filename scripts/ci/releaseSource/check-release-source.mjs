#!/usr/bin/env node
/**
 * @fileoverview Reject non-develop sources for Ready production promotions.
 * Inputs come from GitHub's trusted pull_request event, not the PR checkout.
 */
import { fileURLToPath } from 'node:url';

export function assertProductionSource({ baseRef, headRef, headRepo, repository }) {
  if (
    baseRef !== 'main' ||
    headRef !== 'develop' ||
    !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository ?? '') ||
    headRepo !== repository
  ) {
    throw new Error('Production promotion requires a same-repository Ready PR from develop to main');
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  try {
    assertProductionSource({
      baseRef: process.env.PR_BASE_REF,
      headRef: process.env.PR_HEAD_REF,
      headRepo: process.env.PR_HEAD_REPO,
      repository: process.env.GITHUB_REPOSITORY,
    });
    console.log('Verified production promotion: develop → main (same repository)');
  } catch (error) {
    console.error('::error::' + error.message);
    process.exitCode = 1;
  }
}
