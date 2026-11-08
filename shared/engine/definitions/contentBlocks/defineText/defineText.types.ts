import {StyledText_Rules} from "@svitlo/contracts";

export type ContentBlock_Text = {
  id: string;
  type: 'text';
  slug: string;
  params: {
    disabled?: true;
    styling?: StyledText_Rules;
    wrap?: {
      enabled?: true;
      /** MUI TypographyProps, checked by the authoring app before serialization. */
      typographyProps?: unknown;
    }
  }
  value: string;
}
