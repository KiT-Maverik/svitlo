import Typography, { type TypographyProps } from '@mui/material/Typography';
import {NonEmptyArray} from "@svitlo/engine";

export interface TextProps {
  text: string;
  wrap?: {
    enabled?: false;
    typographyProps?: Omit<TypographyProps, 'children'>;
  };
  transform?: NonEmptyArray<Replace | Style | Css | Condition>
}

type Replace = {
  operation: 'replace'
  id: string
  value: string | number
}

type Style = {
  operation: 'style'
  apply: NonEmptyArray<'highlight' | 'bold' | 'cursive' | 'underscore' | 'crossed'>
  color?: string
  id: string
}

type Css = {
  operation: 'css'
  style: string
  id: string
}

type Condition = {
  operation: 'condition'
  id: string
}

export const Text = ({ text, wrap }: TextProps) => {
  if (wrap?.enabled === false) return text;

  return <Typography component="p" {...wrap?.typographyProps}>{text}</Typography>;
};
