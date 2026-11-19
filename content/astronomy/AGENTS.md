# Astronomy textbook package

Follow root `AGENTS.md` and applicable Studio architecture/rules. Preserve Skill taxonomy,
editorial documentation and the immutable UUID-addressed Lesson `observationJournal`.
Do not invent Scene behavior, localizations or media beyond the accepted reviewed
Lesson's production handoff. React Scenes live under textbook-owned `scenes/`,
with default exports and a generated Scene registry. Run the actual Engine-owned
generators and source checks; do not manually edit generated `sceneLoader.ts`.
The Lesson is Ukrainian-only until the remaining translations are reviewed.
Hosts own routing, Next.js, platform offline packaging and UI providers.
