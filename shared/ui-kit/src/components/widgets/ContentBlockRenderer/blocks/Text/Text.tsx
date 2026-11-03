import Typography, { type TypographyProps } from '@mui/material/Typography';
import type { ContentBlock_Text_Response } from '@svitlo/engine/content';
import { applyStyledText } from '#utils/styledText/applyStyledText';

export const Text = ({ value, styling, wrap }: ContentBlock_Text_Response) => {
  const rendered = applyStyledText({ text: value, styling });

  if (wrap?.enabled === false) return rendered;

  const typographyProps = wrap?.typographyProps as Omit<TypographyProps, 'children'> | undefined;

  return <Typography component="p" {...typographyProps}>{rendered}</Typography>;
};

export const ContentBlock_Text = Text;
