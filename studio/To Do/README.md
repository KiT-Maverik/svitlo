# Svitlo — Product To Do / Feature Backlog

**Status:** ideas and planned features captured from product discussions. **None of these files asserts that a feature is implemented, funded, approved for development or legally reviewed.**

**Location:** `studio/To Do/` is an editorial repository backlog, not a Next.js page, runtime data store, executable code or replacement for GitHub Issues/PRs. Keep one Markdown document per feature or closely related product capability. Each entry records intent, key interactions, open decisions and potential dependencies without prematurely inventing TypeScript APIs.

**Review and handoff:** before implementation, check the [Architecture Principles](../docs/architecture/README.md), live repo contracts, affected packages, security/privacy/licensing needs, parent/child safety, offline completeness, supported locale coverage, a11y, accepted trade-offs, and the required Methodologist/Screenwriter/Assessment approvals. Promote an item to a verified specification/implementation PR only after scope and acceptance criteria are agreed.

**Note on language fallbacks:** All default authored text and UI locales are mandatory and must contain **real translations**. The **English installation/recovery pack** and **explicitly labeled audio-only media fallback** are narrow product availability decisions and **do not permit replacing localized text with English**.

**Note on offline and data protection:** Full offline client use cannot guarantee perfect prevention of copying or secrecy of locally graded answers. Use honest practical protections and do not claim DRM or client-side grading prevents reverse engineering. Child handwriting-data collection and accessibility-related preferences demand appropriate consent/privacy safeguards.

## Feature index

### Onboarding, Languages & Offline Packages (5)

- [Multilingual Welcome](./onboarding/multilingual-welcome.md)
- [Offline Resource Placeholders](./onboarding/offline-resource-placeholders.md)
- [PWA Install & Language Packages](./onboarding/pwa-install-and-language-packages.md)
- [Resource Download Preferences](./onboarding/resource-download-preferences.md)
- [User Settings](./onboarding/user-settings.md)

### Audio, Video & Media Delivery (2)

- [Audio Locales, Subtitles & Fallback](./media/audio-localized-playback.md)
- [Media Storage CDN](./media/media-storage-cdn.md)

### Security, Licensing & Asset Trust (3)

- [External Assets Security](./security/external-assets-security.md)
- [Offline Content Licensing](./security/offline-content-licensing.md)
- [Quiz Answer Exposure](./security/quiz-answer-exposure.md)

### Accounts, Feedback & Content Synchronization (9)

- [Authentication & Accounts](./platform/auth-and-accounts.md)
- [Background Content Crawler](./platform/background-content-crawler.md)
- [Family Multiple Profiles](./platform/family-multiple-profiles.md)
- [GitHub Issue Reporting via Protected Next.js API](./platform/git-issues-resource-reporting.md)
- [Long Offline Full Refresh](./platform/long-offline-full-refresh.md)
- [Parent Subaccount](./platform/parent-subaccount.md)
- [PR Content Change Manifest & Sync Notes](./platform/pr-change-manifest.md)
- [Teacher Identity](./platform/teacher-identity.md)
- [UI Kit Localization Packaging for Standalone Textbooks](./platform/ui-kit-localization-packaging.md)

### Questions, Exams & Handwriting (9)

- [Accessibility Aware Question Selection](./assessment/accessibility-aware-question-selection.md)
- [Anonymous Assessments](./assessment/anonymous-assessments.md)
- [Dynamic Question Widget](./assessment/dynamic-question-widget.md)
- [Handwriting Dataset OPT IN](./assessment/handwriting-dataset-opt-in.md)
- [Handwriting Local Recognition](./assessment/handwriting-local-recognition.md)
- [Print AND Scan Tests](./assessment/print-and-scan-tests.md)
- [Quiz Dynamic Question Config](./assessment/quiz-dynamic-question-config.md)
- [Teacher Custom Exams](./assessment/teacher-custom-exams.md)
- [Teacher Review Workflows](./assessment/teacher-review-workflows.md)

### Learner Experience, Notes, Skills & Programs (19)

- [Coding Workspace](./learning/coding-workspace.md)
- [Contextual Encyclopedia Navigation](./learning/contextual-encyclopedia-navigation.md)
- [Flashcard Cram Mode](./learning/flashcard-cram-mode.md)
- [Flashcard Spaced Review](./learning/flashcard-spaced-review.md)
- [Flashcard Variable Placeholders](./learning/flashcard-variable-placeholders.md)
- [Learning HOW TO Learn Course](./learning/learning-how-to-learn-course.md)
- [Lesson Events](./learning/lesson-events.md)
- [Lesson Finish Recap Actions](./learning/lesson-finish-recap-actions.md)
- [Notes Document View](./learning/notes-document-view.md)
- [Unlocked Notes Mind Map](./learning/notes-mind-map.md)
- [Platform Onboarding Course](./learning/platform-onboarding-course.md)
- [Program Event Reactions](./learning/program-event-reactions.md)
- [Program Injections](./learning/program-injections.md)
- [Program Runtime](./learning/program-runtime.md)
- [Self Assigned Learning Tasks](./learning/self-assigned-learning-tasks.md)
- [Skill Evidence & Competency Map](./learning/skill-evidence-and-mind-map.md)
- [Unlock Rewards AND Extra Content](./learning/unlock-rewards-and-extra-content.md)
- [Visual Block Coding](./learning/visual-block-coding.md)
- [Weak Skills Recommendation](./learning/weak-skills-recommendation.md)

### Teacher & School Ecosystem (3)

- [Future School Platform](./teacher/school-management-platform.md)
- [Teacher Classes Assignments](./teacher/teacher-classes-assignments.md)
- [Teacher Research AND Product Discovery](./teacher/teacher-research-and-product-discovery.md)

### Sponsors, Announcements & Reputation (4)

- [Backend Announcements](./community/backend-announcements.md)
- [Fair Reputation](./community/fair-reputation.md)
- [Sponsor Acknowledgements](./community/sponsor-acknowledgements.md)
- [Sponsors AND Rankings](./community/sponsors-and-rankings.md)

### Public Platform, Funding & Marketing (10)

- [Partner Influencer Outreach](./growth/partner-influencer-outreach.md)
- [Program SEO Pages](./growth/program-seo-pages.md)
- [Public Platform Website](./growth/public-platform-website.md)
- [Referral & Subscription Credits](./growth/referrals-and-subscriptions.md)
- [Regional Pricing AND Grants](./growth/regional-pricing-and-grants.md)
- [Scholarships Ukraine](./growth/scholarships-ukraine.md)
- [Scientific Editorial Verification](./growth/scientific-editorial-verification.md)
- [Programmable Social Videos](./growth/social-remotion-marketing.md)
- [Sponsorship Fundraising](./growth/sponsorship-fundraising.md)
- [Team AND Hall OF Fame](./growth/team-and-hall-of-fame.md)

---

**Total planned feature documents:** 64. The previous immutable-builder quality task was resolved as an Engine code/typecheck change (see [Git-First Typed Content](../docs/architecture/git-first-typed-content.md)); it is no longer a planned feature.

**Curation rules:** Preserve open decisions as questions, distinguish proposed versus existing contracts, do not assign invented completion dates or guarantees, and update each item when a decision, prototype, implementation PR or test result actually exists. Planned features may depend on other items; descriptions are **not** authorization to start multiple implementation streams simultaneously.
