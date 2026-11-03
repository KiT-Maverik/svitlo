import Typography, { type TypographyProps } from '@mui/material/Typography';
import {NonEmptyArray} from "@svitlo/engine";

export interface TextProps {
  text: string;
  wrap?: {
    enabled?: false;
    typographyProps?: Omit<TypographyProps, 'children'>;
  };
  transform?: NonEmptyArray<Replace | Style | Css | Condition>
  variables?: {
    [key: string]: string | number | boolean
  }
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
  in?: { v: NonEmptyArray<string | number>, render: string }
  notIn?: {v: NonEmptyArray<string | number>, render: string }
  equals?: { v: string | number, render: string }
  notEquals?: { v: string | number, render: string }
  lth?: { v: number, render: string }
  gth?: { v: number, render: string }
  inRange?: { v: [number, number], render: string }
  truthy: {yesRender: string | number, noRender: string}
  id: string
}

'Blah-Blah {{id: name; option1: Bob; option2: Jane}}'

export const Text = ({ text, wrap }: TextProps) => {
  if (wrap?.enabled === false) return text;

  return <Typography component="p" {...wrap?.typographyProps}>{text}</Typography>;
};
