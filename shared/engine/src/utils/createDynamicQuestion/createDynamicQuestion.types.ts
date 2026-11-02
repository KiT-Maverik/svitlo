import type { ContentBlock, Locale_Config } from '@svitlo/contracts/content';
import type { NonEmptyArray } from '@svitlo/contracts/content';

export type DynamicQuestion_ArgumentType = 'string' | 'number' | 'boolean';

type DynamicQuestion_ArgumentBase<TType extends DynamicQuestion_ArgumentType> = {
  type: TType;
  selector: string;
};

type DynamicQuestion_ArgumentConstraints<TValue> = {
  exclude?: readonly TValue[];
  allowedValues?: readonly TValue[];
  exact?: TValue;
};

export type DynamicQuestion_StringArgumentConfig = DynamicQuestion_ArgumentBase<'string'> &
  DynamicQuestion_ArgumentConstraints<string> & {
    minLength?: number;
    maxLength?: number;
  };

export type DynamicQuestion_NumberArgumentConfig = DynamicQuestion_ArgumentBase<'number'> &
  DynamicQuestion_ArgumentConstraints<number> & {
    min?: number;
    max?: number;
    step?: number;
  };

export type DynamicQuestion_BooleanArgumentConfig = DynamicQuestion_ArgumentBase<'boolean'>;

export type DynamicQuestion_ArgumentConfig =
  DynamicQuestion_StringArgumentConfig | DynamicQuestion_NumberArgumentConfig | DynamicQuestion_BooleanArgumentConfig;

export type DynamicQuestion_ArgumentProposal<T extends DynamicQuestion_ArgumentType> = T extends 'boolean'
  ? DynamicQuestion_BooleanArgumentConfig & { value: boolean }
  : T extends 'number'
    ? DynamicQuestion_NumberArgumentConfig & { value: number }
    : T extends 'string'
      ? DynamicQuestion_StringArgumentConfig & { value: string }
      : never;

type DynamicQuestion_ArgumentValueForConfig<T extends DynamicQuestion_ArgumentConfig> =
  T extends DynamicQuestion_BooleanArgumentConfig
    ? { selector: T['selector']; value: boolean }
    : T extends DynamicQuestion_NumberArgumentConfig
      ? { selector: T['selector']; value: number }
      : T extends DynamicQuestion_StringArgumentConfig
        ? { selector: T['selector']; value: string }
        : never;

export type DynamicQuestion_ArgumentValue<T extends DynamicQuestion_ArgumentConfig> =
  DynamicQuestion_ArgumentValueForConfig<T>;

export type DynamicQuestion_Arguments = readonly [DynamicQuestion_ArgumentConfig, ...DynamicQuestion_ArgumentConfig[]];

export type DynamicQuestion_Variant<TArguments extends DynamicQuestion_Arguments> = {
  [Index in keyof TArguments]: TArguments[Index] extends DynamicQuestion_ArgumentConfig
    ? DynamicQuestion_ArgumentValue<TArguments[Index]>
    : never;
};

export type DynamicQuestion_AnswerCheck<TArguments extends DynamicQuestion_Arguments> = (
  args: DynamicQuestion_Variant<TArguments>,
) => boolean;

export interface DynamicQuestion_ArgumentValidation {
  success: boolean;
  selector: string;
  type: DynamicQuestion_ArgumentType;
  constraints: Record<string, boolean>;
}

export interface DynamicQuestion_Config<TArguments extends DynamicQuestion_Arguments = DynamicQuestion_Arguments> {
  arguments: TArguments;
  buildVariants: (config: DynamicQuestion_Config<TArguments>) => DynamicQuestion_Variant<TArguments>[];
  checkConstraints: (variant: DynamicQuestion_Variant<TArguments>) => boolean;
  content: {
    question: NonEmptyArray<ContentBlock<'data'>[]>;
    explanation: NonEmptyArray<ContentBlock<'data'>[]>;
    answer: NonEmptyArray<ContentBlock<'data'>[]>;
  };
  name: Locale_Config;
}

export interface DynamicQuestion<TArguments extends DynamicQuestion_Arguments = DynamicQuestion_Arguments> {
  getDefaultArgs: () => TArguments;
  getArgs: () => DynamicQuestion_Variant<TArguments> | undefined;
  updateArgs: (args: DynamicQuestion_Variant<TArguments>) => void;
  calculateValidVariants: () => DynamicQuestion_Variant<TArguments>[];
  hasVariants: () => boolean;
  getAllVariants: () => DynamicQuestion_Variant<TArguments>[];
  getVariant: (index: number) => DynamicQuestion_Variant<TArguments> | undefined;
  getRandomVariant: () => DynamicQuestion_Variant<TArguments> | undefined;
}
