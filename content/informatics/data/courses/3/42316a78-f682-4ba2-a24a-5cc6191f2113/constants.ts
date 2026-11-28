import type { SupportedLanguages } from '@svitlo/engine/build';

// TODO (BLOCKER): Restore the complete language set when translations are ready:
// export const languages = ["uk","en","zh","hi","es","ar","fr","bn","pt","ur","id","it","de","ja","ko","tr","vi","ta","te","mr","ms","he","pl","lt","lv","et","be","ka","kk","qm"] as const satisfies SupportedLanguages;

export const languages = ["uk"] as const satisfies SupportedLanguages;
export type CourseLanguages = typeof languages;
