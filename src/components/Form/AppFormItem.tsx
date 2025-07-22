// AppFormItem.tsx
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface AppFormItemProps {
  label?: string;
  error?: string;
  children: React.ReactNode;
}

export const AppFormItem = ({ label, error, children }: AppFormItemProps) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      {children}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontWeight: '600', marginBottom: 4, color: 'white' },
  error: { color: 'red', marginTop: 4, fontSize: 12 },
});
