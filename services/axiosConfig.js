import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Configuration
// Use 10.0.2.2 for Android emulator, or your machine's IP for physical device
const API_BASE_URL = __DEV__ 
  ? 'http://192.168.100.149:3002/api'  // Physical device - using your machine's IP
  // ? 'http://10.0.2.2:3002/api'  // Emulator - uncomment and comment above line if using emulator
  : 'https://your-production-api.com/api'; // Production

// Helper function to get auth token
export const getAuthToken = async () => {
  try {
    const { getItemAsync } = await import('expo-secure-store');
    return await getItemAsync('auth_token');
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

// Helper function to save auth token
const saveAuthToken = async (token) => {
  try {
    const { setItemAsync } = await import('expo-secure-store');
    await setItemAsync('auth_token', token);
  } catch (error) {
    console.error('Error saving auth token:', error);
  }
};

// Helper function to remove auth token
const removeAuthToken = async () => {
  try {
    const { deleteItemAsync } = await import('expo-secure-store');
    await deleteItemAsync('auth_token');
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
};

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // Increased timeout for better debugging
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

console.log('📡 API Base URL configured:', API_BASE_URL);

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    if (config.data) {
      console.log('📤 Request Data:', config.data);
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and logging
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} - ${response.config.url}`);
    if (response.data) {
      console.log('📥 Response Data:', response.data);
    }
    return response;
  },
  async (error) => {
    console.error(`❌ API Error: ${error.response?.status} - ${error.config?.url}`);
    console.error('❌ Full Error:', error.message);
    console.error('❌ Error Code:', error.code);
    if (error.response?.data) {
      console.error('📥 Error Data:', error.response.data);
    }
    
    // Handle 401 unauthorized - token expired
    if (error.response?.status === 401) {
      await removeAuthToken();
      // Optionally redirect to login screen
    }
    
    return Promise.reject(error);
  }
);

// Generic API call function with retry logic
const apiCall = async (url, config = {}) => {
  const maxRetries = 3;
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      const response = await apiClient({
        url,
        ...config,
      });
      return response.data;
    } catch (error) {
      retries++;
      
      if (retries === maxRetries) {
        const message = error.response?.data?.message || error.message || 'Network request failed';
        throw new Error(message);
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, retries) * 1000));
    }
  }
};

// Main API object with common HTTP methods
const api = {
  // GET request
  get: (url, config = {}) => apiCall(url, { method: 'GET', ...config }),
  
  // POST request
  post: (url, data, config = {}) => apiCall(url, { method: 'POST', data, ...config }),
  
  // PUT request
  put: (url, data, config = {}) => apiCall(url, { method: 'PUT', data, ...config }),
  
  // PATCH request
  patch: (url, data, config = {}) => apiCall(url, { method: 'PATCH', data, ...config }),
  
  // DELETE request
  delete: (url, config = {}) => apiCall(url, { method: 'DELETE', ...config }),
};

// Export axios instance for direct use if needed
export { apiClient as axiosInstance };
export default api;
