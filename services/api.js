import api, { getAuthToken } from './axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

// Authentication Service
export const AuthService = {
  // Register new user
  register: async (email, password, name) => {
    try {
      const userData = { email, password, name };
      const response = await api.post('/auth/register', userData);
      
      if (response.access_token) {
        await saveAuthToken(response.access_token);
      }
      
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.access_token) {
        await saveAuthToken(response.access_token);
      }
      
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      await removeAuthToken();
      return { success: true };
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated: async () => {
    try {
      const token = await getAuthToken();
      return !!token;
    } catch (error) {
      console.error('Auth check failed:', error);
      return false;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me'); // Assuming this endpoint exists
      return response;
    } catch (error) {
      console.error('Get current user failed:', error);
      throw error;
    }
  }
};

// Products Service
export const ProductsService = {
  // Get all products
  getAll: async () => {
    try {
      return await api.get('/products');
    } catch (error) {
      console.error('Get products failed:', error);
      throw error;
    }
  },

  // Get product by ID
  getById: async (id) => {
    try {
      return await api.get(`/products/${id}`);
    } catch (error) {
      console.error('Get product failed:', error);
      throw error;
    }
  },

  // Search products
  search: async (query) => {
    try {
      return await api.get(`/products/search?q=${encodeURIComponent(query)}`);
    } catch (error) {
      console.error('Search products failed:', error);
      throw error;
    }
  },

  // Get products by category
  getByCategory: async (category) => {
    try {
      return await api.get(`/products/category/${category}`);
    } catch (error) {
      console.error('Get products by category failed:', error);
      throw error;
    }
  },

  // Create new product (admin only)
  create: async (productData) => {
    try {
      return await api.post('/products', productData);
    } catch (error) {
      console.error('Create product failed:', error);
      throw error;
    }
  },

  // Update product (admin only)
  update: async (id, productData) => {
    try {
      return await api.patch(`/products/${id}`, productData);
    } catch (error) {
      console.error('Update product failed:', error);
      throw error;
    }
  },

  // Delete product (admin only)
  delete: async (id) => {
    try {
      return await api.delete(`/products/${id}`);
    } catch (error) {
      console.error('Delete product failed:', error);
      throw error;
    }
  }
};

// Users Service
export const UsersService = {
  // Get all users (admin only)
  getAll: async () => {
    try {
      return await api.get('/users');
    } catch (error) {
      console.error('Get users failed:', error);
      throw error;
    }
  },

  // Get user by ID
  getById: async (id) => {
    try {
      return await api.get(`/users/${id}`);
    } catch (error) {
      console.error('Get user failed:', error);
      throw error;
    }
  },

  // Update user
  update: async (id, userData) => {
    try {
      return await api.patch(`/users/${id}`, userData);
    } catch (error) {
      console.error('Update user failed:', error);
      throw error;
    }
  },

  // Delete user
  delete: async (id) => {
    try {
      return await api.delete(`/users/${id}`);
    } catch (error) {
      console.error('Delete user failed:', error);
      throw error;
    }
  }
};
