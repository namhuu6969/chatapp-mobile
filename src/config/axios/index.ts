const API_BASE_URL = 'http://localhost:3000';
import { navigationRef } from '@/navigation/AppNavigator';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = '';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      navigationRef.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
      Toast.show({
        type: 'error',
        text1: '⛔ Expired login',
        text2: 'Please try login again',
      });
    } else if (error.response?.status >= 400) {
      Toast.show({
        type: 'error',
        text1: '🚨 Server error',
        text2: 'Please try later',
      });
    } else {
      Toast.show({
        type: 'info',
        text1: '⚠️ Something error',
        text2: error.response?.data?.message || 'Please try again',
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
