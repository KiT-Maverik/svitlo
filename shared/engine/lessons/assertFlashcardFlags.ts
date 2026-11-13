import { FLASHCARD_FLAG_COLORS, FLASHCARD_FLAG_ICONS } from '+@svitlo/contracts/content';

const colors: ReadonlySet<string> = new Set(FLASHCARD_FLAG_COLORS);
const icons: ReadonlySet<string> = new Set(FLASHCARD_FLAG_ICONS);
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/** Localized values remain source data until Lesson sparse localization runs. */
const validText = (value: unknown): boolean =>
  (typeof value === 'string' && value.trim().length > 0) ||
  (isRecord(value) &&
    Object.keys(value).length > 0 &&
    Object.values(value).every(entry => typeof entry === 'string' && entry.trim().length > 0));

/** Validate the serialized discriminated union before publishing Lesson Flashcards. */
export function assertFlashcardFlags(flashcards: readonly unknown[]): void {
  for (const card of flashcards) {
    if (!isRecord(card) || !Array.isArray(card.flags)) throw new Error('Flashcard flags must be an array');
    const builtIns = new Set<string>();
    for (const flag of card.flags as unknown[]) {
      if (!isRecord(flag) || typeof flag.type !== 'string') throw new Error('Invalid typed Flashcard flag');
      if (flag.type !== 'custom') {
        if (builtIns.has(flag.type)) throw new Error('Duplicate built-in Flashcard flag: ' + flag.type);
        builtIns.add(flag.type);
      }
      const keys = Object.keys(flag);
      switch (flag.type) {
        case 'list':
          if (
            keys.some(key => key !== 'type' && key !== 'count') ||
            !Number.isSafeInteger(flag.count) ||
            (flag.count as number) < 2
          )
            throw new Error('Invalid Flashcard list count flag');
          break;
        case 'warning':
          if (keys.length !== 1) throw new Error('Invalid Flashcard warning flag');
          break;
        case 'acronym':
          if (keys.some(key => key !== 'type' && key !== 'value') || !validText(flag.value))
            throw new Error('Invalid Flashcard acronym flag');
          break;
        case 'custom':
          if (
            keys.some(key => !['type', 'value', 'color', 'icon'].includes(key)) ||
            !validText(flag.value) ||
            typeof flag.color !== 'string' ||
            !colors.has(flag.color) ||
            (flag.icon !== undefined && (typeof flag.icon !== 'string' || !icons.has(flag.icon)))
          )
            throw new Error('Invalid Flashcard custom flag');
          break;
        default:
          throw new Error('Unknown Flashcard flag type: ' + flag.type);
      }
    }
  }
}
