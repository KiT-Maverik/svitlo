import type { SupportedLanguages } from '@svitlo/engine/build';

// TODO (BLOCKER): Restore reviewed Lesson languages: ["ar","be","bn","de","en","es","et","fr","he","hi","id","it","ja","ka","kk","ko","lt","lv","mr","ms","pl","pt","qm","ta","te","tr","uk","ur","vi","zh"].
export const languages = ["en"] as const satisfies SupportedLanguages;
