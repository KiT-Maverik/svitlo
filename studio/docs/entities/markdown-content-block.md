# LaTeX formulas in Markdown ContentBlocks

**Scope:** Markdown ContentBlocks support static mathematical notation through `remark-math` and KaTeX in UI Kit. This applies wherever the `markdown` ContentBlock is supported (Lessons, Questions, Flashcards). The separate `text` ContentBlock and arbitrary strings do **not** automatically render LaTeX.

## Markdown syntax

- **Inline:** use `$S = \pi r^2$` inside a sentence.
- **Display:** put `$$` on separate lines around the equation.
- **Literal currency:** escape `$` as `\$`.
- **Authoring source:** use sibling `<language>.md` files with `readMarkdown(import.meta.url, languages)`, invariant `markdown.md` with `readMarkdown(import.meta.url)`, or inline `defineMarkdown` `locale.value`; no extra `Formula` block or Engine params are needed.

```markdown
Circle area: $S = \pi r^2$.

$$
E = mc^2
$$

Price: \$5.
```

## Accessibility, translation and safety

- Explain formulas in adjacent learner-facing prose, including symbol meanings, quantities, units and relationships. KaTeX emits MathML, but a formula alone is not a complete nonvisual explanation.
- Keep notation appropriate for the learner's level and verify complex formulas in the rendered experience.
- Preserve LaTeX commands, braces, delimiters and `%_%UPPER_SNAKE_CASE%_%` replacement placeholders during translation. Translate the surrounding prose and adapt mathematical conventions only when semantically correct and reviewed.
- In RTL locales, preserve the natural direction of prose while checking that mathematics remains readable in left-to-right mathematical order when appropriate; never reverse equations mechanically.
- Treat authored Markdown and HTML as untrusted. Sanitization happens before KaTeX; `trust` stays disabled. Do not author trusted TeX HTML/URL commands, executable links or remote assets.
- Math editing, symbolic grading and manipulatives are interactive capabilities, not part of this static Markdown rendering feature; use an explicitly designed interaction or Scene for them.

## Implementation boundary

Engine `defineMarkdown` preserves the original localized Markdown and variable contracts. UI Kit parses mathematics, sanitizes authored markup, renders with KaTeX and loads the stylesheet. Do not introduce a separate `Formula` ContentBlock solely to display static notation.
