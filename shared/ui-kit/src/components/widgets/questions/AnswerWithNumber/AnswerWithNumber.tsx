'use client';
import type { InteractionProps } from '../interaction-props';
import { NumberField } from './NumberField/NumberField';
import { uk } from '../messages';
export function AnswerWithNumber({
  question,
  value,
  onChange,
  disabled,
  readOnly,
  result,
  showErrors,
  showCorrectAnswers,
}: InteractionProps<'numeric'>) {
  return (
    <NumberField
      label={question.unit ? `${uk.answer} (${question.unit})` : uk.answer}
      placeholder={question.placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      readOnly={readOnly}
      result={result}
      showErrors={showErrors}
      showCorrectAnswers={showCorrectAnswers}
      helperText={uk.numberFormat}
    />
  );
}
