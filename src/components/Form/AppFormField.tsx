import React from 'react';
import { Controller, useFormContext, FieldValues } from 'react-hook-form';
import { AppFormItem } from './AppFormItem';

interface AppFormFieldProps<T extends FieldValues> {
  name: keyof T & string;
  label?: string;
  render: (field: any, error?: string) => React.ReactNode;
}

export function AppFormField<T extends FieldValues>({
  name,
  label,
  render,
}: AppFormFieldProps<T>) {
  const { control, formState } = useFormContext<T>();
  const error = formState.errors?.[name]?.message as string | undefined;

  return (
    <Controller
      control={control}
      name={name as any}
      render={({ field }) => (
        <AppFormItem label={label} error={error}>
          {render(field, error)}
        </AppFormItem>
      )}
    />
  );
}
