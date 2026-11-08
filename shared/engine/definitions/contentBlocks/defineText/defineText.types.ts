import type { Locale_Languages, Locale_Options, StyledText_Rules} from "@svitlo/contracts";

import type {ContentBlock_Meta} from "../contentBlocks.types";

type Params = {
  styling?: StyledText_Rules;
  wrap?: {
    enabled?: true;
    /** MUI TypographyProps, checked by the authoring app before serialization. */
    typographyProps?: unknown;
  }
}

type Locale<SupportedLanguages extends Locale_Languages | string> = Locale_Options<SupportedLanguages>

export type ContentBlock_Text_Config<SupportedLanguages extends Locale_Languages> = ContentBlock_Meta<'text'> & {
  params: Params;
  value: Locale<SupportedLanguages>;
}

export type ContextBlock_Text_Props = ContentBlock_Meta<'text'> & {
  params: Params & { disabled?: true };
  value: Locale<string>;
}
