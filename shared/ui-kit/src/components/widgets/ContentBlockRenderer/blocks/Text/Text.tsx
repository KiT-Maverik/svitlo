import Typography, { type TypographyProps } from '@mui/material/Typography';
import { applyStyledText } from '#utils/styledText/applyStyledText';

export type TextProps = Parameters<typeof applyStyledText>[0] & {
  wrap?: {
    enabled?: false;
    typographyProps?: Omit<TypographyProps, 'children'>;
  };
};

export const Text = ({ text, wrap, styling }: TextProps) => {
  const rendered = applyStyledText({ text, styling });

  if (wrap?.enabled === false) return rendered;

  return <Typography component="p" {...wrap?.typographyProps}>{rendered}</Typography>;
};
