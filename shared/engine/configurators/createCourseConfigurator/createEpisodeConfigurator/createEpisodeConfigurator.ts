import type {
  Course_Creator,
  Episode,
  Locale_Languages,
} from '@svitlo/contracts/content';

export function createEpisodeConfigurator<const L extends Locale_Languages>(
  input: Episode<'data', L>,
): Course_Creator<Episode<'data', L>, L> {
  const getData = (): Episode<'data', L> => ({ ...input, sections: [...input.sections] });
  return {
    getData,
    getContentEntries: () => ({ lessons: [], groups: [], overrides: [], episodes: [getData()] }),
  };
}
