import type { FieldValues, UseFormProps } from 'react-hook-form';
import { useForm as useRhfForm } from 'react-hook-form';

export function useForm<
  TFormInput extends FieldValues = FieldValues,
  TContext = unknown,
  TFormOutput extends FieldValues = FieldValues
>(props: UseFormProps<TFormInput, TContext, TFormOutput>) {
  return useRhfForm<TFormInput, TContext, TFormOutput>(props);
}
