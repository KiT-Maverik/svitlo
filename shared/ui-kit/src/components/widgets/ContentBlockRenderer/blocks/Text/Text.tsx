import Typography, {type TypographyProps} from '@mui/material/Typography';

import {NonEmptyArray} from "@svitlo/engine";

export interface TextProps {
  text: string;
  wrap?: {
    enabled?: false;
    typographyProps?: Omit<TypographyProps, 'children'>;
  };
  styling?: NonEmptyArray<
    {
      applyStyle: NonEmptyArray<'highlight' | 'bold' | 'cursive' | 'underscore' | 'crossed' | 'variable'>
      color?: string
      id: string
    }
  >
}

export const Text = ({text, wrap}: TextProps) => {
  if (wrap?.enabled === false) return text;

  return <Typography component="p" {...wrap?.typographyProps}>{text}</Typography>;
};
