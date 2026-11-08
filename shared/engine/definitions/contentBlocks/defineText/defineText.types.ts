import {type Locale_Languages, type Locale_Options, StyledText_Rules} from "@svitlo/contracts";

import type {ContentBlock_Meta} from "../contentBlocks.types";

export type ContentBlock_Text_Config<SupportedLanguages extends Locale_Languages> = ContentBlock_Meta<'text'> & {
  params: {
    disabled?: true;
    styling?: StyledText_Rules;
    wrap?: {
      enabled?: true;
      /** MUI TypographyProps, checked by the authoring app before serialization. */
      typographyProps?: unknown;
    }
  }
  value: Locale_Options<SupportedLanguages>;
}

export type ContextBlock_Text_Props = ContentBlock_Text_Config<string>;
