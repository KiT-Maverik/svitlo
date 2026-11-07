/**
 * Approved Flashcards YAML -> canonical authored Flashcard data + stable links.
 * No new runtime contract, guessed question content, or translated target locales.
 */
export function compileFlashcards({ source, bank, lessonId, language, workspace, helpers }) {
  const { uuid5, loc, safeAsset, issue, fail, required, unique } = helpers;
  const file = 'flashcards/flashcards.yaml';
  const requirements = [];
  const questions = new Map();
  for (const [type, catalog] of Object.entries(bank)) {
    for (const [slug, data] of Object.entries(catalog)) {
      required(!questions.has(slug), file, 'flashcards', 'ambiguous Question slug ' + slug);
      questions.set(slug, { type, data });
    }
  }
  unique(
    source.flashcards.map(card => card.slug),
    file,
    'flashcards',
  );
  unique(
    source.relationships.map(link => link.key),
    file,
    'relationships',
  );
  const knownCards = new Map(source.flashcards.map(card => [card.slug, uuid5(lessonId, 'flashcard/' + card.slug)]));
  const refValue = (reference, field) => {
    const found = questions.get(reference.questionSlug);
    required(found, file, field + '.questionSlug', 'unknown Question in full bank: ' + reference.questionSlug);
    let value = found.data;
    for (const [index, part] of reference.fieldPath.entries()) {
      required(
        value !== null && typeof value === 'object' && Object.hasOwn(value, part),
        file,
        field + '.fieldPath[' + index + ']',
        'unknown canonical Question property: ' + String(part),
      );
      value = value[part];
    }
    required(
      typeof value === 'string' ||
        (value &&
          !Array.isArray(value) &&
          typeof value === 'object' &&
          typeof value[language] === 'string' &&
          Object.keys(value).every(key => key === language)),
      file,
      field + '.fieldPath',
      'referenced Question field must resolve to canonical localized text or invariant string',
    );
    const access = reference.fieldPath.map(part => '[' + JSON.stringify(part) + ']').join('');
    const expression =
      'questionBank[' + JSON.stringify(found.type) + '][' + JSON.stringify(reference.questionSlug) + ']' + access;
    return { __svitloQuestionExpression: expression };
  };
  const text = (value, field) =>
    value !== null && typeof value === 'object' ? refValue(value, field) : loc(value, language, file, field);
  const blockData = (block, slug, position, index) => {
    const field = 'flashcards.' + slug + '.' + position + '[' + index + ']';
    const base = {
      id: uuid5(lessonId, 'flashcard-block/' + slug + '/' + position + '/' + index),
      slug: position + '-' + index,
      type: block.type,
    };
    if (block.type === 'text') {
      return {
        ...base,
        value: text(block.value, field + '.value'),
        ...(block.styling ? { styling: block.styling } : {}),
        ...(block.wrap ? { wrap: block.wrap } : {}),
      };
    }
    if (block.type === 'markdown') {
      return { ...base, locales: text(block.value, field + '.value') };
    }
    if (block.type === 'code') {
      return {
        ...base,
        language: block.language,
        code: text(block.code, field + '.code'),
        ...(block.title ? { title: text(block.title, field + '.title') } : {}),
        ...(block.variables
          ? {
              variables: block.variables.map((entry, i) => ({
                id: entry.id,
                value: text(entry.value, field + '.variables[' + i + '].value'),
              })),
            }
          : {}),
      };
    }
    if (block.type === 'image' && block.assetPath) {
      if (!safeAsset(workspace, block.assetPath, file, field + '.assetPath')) {
        issue(requirements, 'media', field, 'Missing Flashcard image: ' + block.assetPath, 'Media Production');
      }
      return {
        ...base,
        src: loc(block.assetPath, language, file, field + '.assetPath'),
        alt: text(block.alt, field + '.alt'),
        ...(block.caption ? { caption: text(block.caption, field + '.caption') } : {}),
        ...block.layout,
      };
    }
    if (block.type === 'image' && block.assetRequest) {
      issue(
        requirements,
        'media',
        field,
        'Flashcard image request: ' + block.assetRequest.description,
        'Media Production',
      );
      fail(
        file,
        field + '.assetRequest',
        'pending image cannot become a real ContentBlock without an approved asset path and accessible alt',
      );
    }
    issue(
      requirements,
      'contract',
      field,
      'Flashcard block type ' + block.type + ' is proposed, not a typed runtime implementation',
    );
    fail(
      file,
      field,
      'unsupported/pending Flashcard block: ' +
        block.type +
        '; keep it blocked until an approved ContentBlock mapping exists',
    );
  };
  const cards = source.flashcards.map((card, index) => {
    const field = 'flashcards[' + index + ']';
    const types = card.flags.filter(flag => flag.type !== 'custom').map(flag => flag.type);
    unique(types, file, field + '.flags');
    const flags = card.flags.map((flag, i) => {
      const location = field + '.flags[' + i + ']';
      if (flag.type === 'list' || flag.type === 'warning') return flag;
      if (flag.type === 'custom')
        return {
          type: 'custom',
          color: flag.color,
          ...(flag.icon ? { icon: flag.icon } : {}),
          value: loc(flag.value, language, file, location + '.value'),
        };
      const word = flag.parts.map(part => part.letters).join('');
      required(
        word === flag.value,
        file,
        location + '.parts',
        'acronym parts must concatenate to the approved acronym',
      );
      if (flag.localePolicy === 'needsLocalizedVersion') {
        issue(
          requirements,
          'localization',
          location,
          'Review and localize acronym mnemonic in target languages',
          'Translation Production',
        );
      }
      return {
        type: 'acronym',
        value: flag.localePolicy === 'invariant' ? flag.value : loc(flag.value, language, file, location + '.value'),
      };
    });
    return {
      id: knownCards.get(card.slug),
      ...(card.isDefault ? { isDefault: true } : {}),
      front: card.front.map((b, i) => blockData(b, card.slug, 'front', i)),
      back: card.back.map((b, i) => blockData(b, card.slug, 'back', i)),
      hint: card.hint.map((b, i) => blockData(b, card.slug, 'hint', i)),
      tags: card.tags,
      flags,
    };
  });
  const seenEdges = new Set();
  const links = source.relationships.map((edge, i) => {
    const p = 'relationships[' + i + ']';
    required(knownCards.has(edge.source), file, p + '.source', 'unknown Flashcard ' + edge.source);
    required(knownCards.has(edge.target), file, p + '.target', 'unknown Flashcard ' + edge.target);
    required(edge.source !== edge.target, file, p, 'Flashcard cannot link to itself');
    const symmetric = ['reverse', 'equivalent', 'contrast', 'complementary'].includes(edge.type);
    const endpoints = symmetric ? [edge.source, edge.target].sort() : [edge.source, edge.target];
    const signature = JSON.stringify([edge.type, ...endpoints]);
    required(!seenEdges.has(signature), file, p, 'duplicate typed Flashcard edge');
    seenEdges.add(signature);
    return {
      relationshipId: uuid5(lessonId, 'flashcard-link/' + edge.key),
      type: edge.type,
      sourceFlashcardId: knownCards.get(edge.source),
      targetFlashcardId: knownCards.get(edge.target),
    };
  });
  for (const [i, dependency] of source.unresolvedDependencies.entries())
    issue(requirements, dependency.kind, 'unresolvedDependencies[' + i + ']', dependency.description);
  return { cards, links, requirements };
}

/** Render safe, explicitly validated Question field access as actual TypeScript expressions. */
export function serializeFlashcardsTS(value) {
  if (Array.isArray(value)) return '[' + value.map(serializeFlashcardsTS).join(', ') + ']';
  if (value !== null && typeof value === 'object') {
    if (Object.keys(value).length === 1 && typeof value.__svitloQuestionExpression === 'string')
      return value.__svitloQuestionExpression;
    return (
      '{' +
      Object.entries(value)
        .map(([key, member]) => JSON.stringify(key) + ': ' + serializeFlashcardsTS(member))
        .join(', ') +
      '}'
    );
  }
  return JSON.stringify(value);
}
