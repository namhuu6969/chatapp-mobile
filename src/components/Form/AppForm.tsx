import React from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

interface AppFormProps {
  form: UseFormReturn<any>;
  children: React.ReactNode;
}

export const AppForm = ({ form, children }: AppFormProps) => {
  return (
    <FormProvider {...form}>
      <View style={styles.container}>{children}</View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {},
});
