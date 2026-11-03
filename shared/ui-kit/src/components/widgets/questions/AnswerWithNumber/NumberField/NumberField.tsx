'use client';

import type { CheckResult } from '../../check-result';
import type { FeedbackVisibility } from '../../feedback';
import { TextField } from '../../AnswerWithText/TextField/TextField';

interface NumberFieldProps extends FeedbackVisibility {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  result?: CheckResult | null;
  helperText?: string;
}

/**
 * Preserve the exact decimal input until the external checker validates it.
 * Numeric widgets normalize localized commas during typing and can alter 6,28.
 */
export function NumberField(props: NumberFieldProps) {
  return <TextField {...props} inputMode="decimal" />;
}
