import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  MD3DarkTheme as PaperDarkTheme,
  PaperProvider,
} from 'react-native-paper';
import AppNavigator, { navigationRef } from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      refetchOnMount: 'always',
    },
  },
});
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    background: '#000000', // nền đen
    surface: '#121212', // màu surface tối hơn
    primary: '#add8e6', // tím nhẹ theo Material Dark
    text: '#FFFFFF', // text trắng
  },
};
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={CombinedDarkTheme}>
        <NavigationContainer ref={navigationRef}>
          <AppNavigator />
          <Toast />
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
}
