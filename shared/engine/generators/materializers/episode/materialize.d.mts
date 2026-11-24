export type EpisodeSourceFile = { path: string; content: string; kind: 'typescript' | 'markdown' | 'code' | 'specification' };
export type EpisodeSourceResult = { id: string; exportName: string; pendingEpisode?: boolean; files: EpisodeSourceFile[]; diagnostics: {path:string;code:string;severity:'warning';message?:string}[] };
export function materializeEpisode(input: unknown, context: {
  directory: string;
  sourceLanguage: string;
  plannedLanguages: readonly string[];
  materializeSection: (node: unknown, context: {directory:string}) => unknown;
}): EpisodeSourceResult;
