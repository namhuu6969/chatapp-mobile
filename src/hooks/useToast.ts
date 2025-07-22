import Toast from 'react-native-toast-message';

export function useToast() {
  const showInfo = (message: string, description?: string) => {
    Toast.show({
      type: 'info',
      text1: message,
      text2: description,
    });
  };

  const showSuccess = (message: string, description?: string) => {
    Toast.show({
      type: 'success',
      text1: message,
      text2: description,
    });
  };

  const showWarning = (message: string, description?: string) => {
    Toast.show({
      type: 'info',
      text1: '⚠️ ' + message,
      text2: description,
      props: { style: { backgroundColor: 'orange' } },
    });
  };

  const showError = (message: string, description?: string) => {
    Toast.show({
      type: 'error',
      text1: message,
      text2: description,
    });
  };

  return { showInfo, showSuccess, showWarning, showError };
}
