import type { ReactNode } from 'react';

export interface Item {
  id: string;
  label: string;
  content?: ReactNode;
}
export interface BaseQuestion {
  id: string;
  prompt: string;
  explanation: string;
}
export interface TextNormalization {
  trim: boolean;
  ignoreCase: boolean;
  collapseWhitespace: boolean;
}
