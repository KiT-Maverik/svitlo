import Typography, { type TypographyProps } from '@mui/material/Typography';

import type { ContentBlock_Text_Data } from '@svitlo/engine/runtime';

import { applyStyledText } from '#utils/styledText/applyStyledText';

export const Text = ({ locale: { value }, params: { variables, wrap } }: ContentBlock_Text_Data) => {
  const rendered = applyStyledText({ text: value, variables });

  const typographyProps = wrap?.typographyProps as Omit<TypographyProps, 'children'> | undefined;

  return (
    <Typography component="p" {...typographyProps}>
      {rendered}
    </Typography>
  );
};

export const ContentBlock_Text = Text;
