import Typography, { type TypographyProps } from '@mui/material/Typography';

export interface TextProps {
  text: string;
  wrap?: {
    enabled?: false;
    typographyProps?: Omit<TypographyProps, 'children'>;
  };
}

export const Text = ({ text, wrap }: TextProps) => {
  if (wrap?.enabled === false) return text;

  return <Typography component="p" {...wrap?.typographyProps}>{text}</Typography>;
};
