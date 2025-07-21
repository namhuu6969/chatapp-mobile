import React, { ReactNode } from 'react';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import {
  View,
  ScrollView,
  StyleSheet,
  ViewStyle,
  StyleProp,
  ScrollViewProps,
} from 'react-native';

type SafeAreaContainerProps = {
  children: ReactNode;
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  edges?: Edge[];
  scrollProps?: ScrollViewProps;
};

export const SafeAreaContainer: React.FC<SafeAreaContainerProps> = ({
  children,
  scroll = false,
  style,
  contentContainerStyle,
  edges = ['top', 'left', 'right'],
  scrollProps,
}) => {
  return (
    <SafeAreaView style={[styles.flex, style]} edges={edges}>
      {scroll ? (
        <ScrollView
          {...scrollProps}
          contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.flex, contentContainerStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scrollContent: { flexGrow: 1 },
});

export default SafeAreaContainer;
