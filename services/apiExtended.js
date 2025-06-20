import api from './axiosConfig';

// Roles Service
export const RolesService = {
  // Create new role
  createRole: async (roleData) => {
    try {
      return await api.post('/roles', roleData);
    } catch (error) {
      console.error('Create role failed:', error);
      throw error;
    }
  },

  // Get all roles
  getAllRoles: async () => {
    try {
      return await api.get('/roles');
    } catch (error) {
      console.error('Get roles failed:', error);
      throw error;
    }
  },

  // Get role by ID
  getRoleById: async (id) => {
    try {
      return await api.get(`/roles/${id}`);
    } catch (error) {
      console.error('Get role failed:', error);
      throw error;
    }
  },

  // Get role by name
  getRoleByName: async (name) => {
    try {
      return await api.get(`/roles/name/${name}`);
    } catch (error) {
      console.error('Get role by name failed:', error);
      throw error;
    }
  },

  // Update role
  updateRole: async (id, roleData) => {
    try {
      return await api.patch(`/roles/${id}`, roleData);
    } catch (error) {
      console.error('Update role failed:', error);
      throw error;
    }
  },

  // Delete role (soft delete)
  deleteRole: async (id) => {
    try {
      return await api.delete(`/roles/${id}`);
    } catch (error) {
      console.error('Delete role failed:', error);
      throw error;
    }
  },

  // Hard delete role
  hardDeleteRole: async (id) => {
    try {
      return await api.delete(`/roles/${id}/hard`);
    } catch (error) {
      console.error('Hard delete role failed:', error);
      throw error;
    }
  }
};

// Profiles Service
export const ProfilesService = {
  // Create profile
  createProfile: async (profileData) => {
    try {
      return await api.post('/profiles', profileData);
    } catch (error) {
      console.error('Create profile failed:', error);
      throw error;
    }
  },

  // Get all profiles (admin only)
  getAllProfiles: async () => {
    try {
      return await api.get('/profiles');
    } catch (error) {
      console.error('Get profiles failed:', error);
      throw error;
    }
  },

  // Get my profile
  getMyProfile: async () => {
    try {
      return await api.get('/profiles/me');
    } catch (error) {
      console.error('Get my profile failed:', error);
      throw error;
    }
  },

  // Get profile by ID
  getProfileById: async (id) => {
    try {
      return await api.get(`/profiles/${id}`);
    } catch (error) {
      console.error('Get profile failed:', error);
      throw error;
    }
  },

  // Get profile by user ID
  getProfileByUserId: async (userId) => {
    try {
      return await api.get(`/profiles/user/${userId}`);
    } catch (error) {
      console.error('Get profile by user ID failed:', error);
      throw error;
    }
  },

  // Update my profile
  updateMyProfile: async (profileData) => {
    try {
      return await api.patch('/profiles/me', profileData);
    } catch (error) {
      console.error('Update my profile failed:', error);
      throw error;
    }
  },

  // Update profile by ID (admin only)
  updateProfile: async (id, profileData) => {
    try {
      return await api.patch(`/profiles/${id}`, profileData);
    } catch (error) {
      console.error('Update profile failed:', error);
      throw error;
    }
  },

  // Delete my profile
  deleteMyProfile: async () => {
    try {
      return await api.delete('/profiles/me');
    } catch (error) {
      console.error('Delete my profile failed:', error);
      throw error;
    }
  },

  // Delete profile by ID (admin only)
  deleteProfile: async (id) => {
    try {
      return await api.delete(`/profiles/${id}`);
    } catch (error) {
      console.error('Delete profile failed:', error);
      throw error;
    }
  }
};

// Orders Service
export const OrdersService = {
  // Create new order
  createOrder: async (orderData) => {
    try {
      return await api.post('/orders', orderData);
    } catch (error) {
      console.error('Create order failed:', error);
      throw error;
    }
  },

  // Get all orders (admin only)
  getAllOrders: async () => {
    try {
      return await api.get('/orders');
    } catch (error) {
      console.error('Get orders failed:', error);
      throw error;
    }
  },

  // Get my orders
  getMyOrders: async () => {
    try {
      return await api.get('/orders/my-orders');
    } catch (error) {
      console.error('Get my orders failed:', error);
      throw error;
    }
  },

  // Get my order statistics
  getMyOrderStats: async () => {
    try {
      return await api.get('/orders/my-stats');
    } catch (error) {
      console.error('Get my order stats failed:', error);
      throw error;
    }
  },

  // Get orders by user ID (admin only)
  getOrdersByUserId: async (userId) => {
    try {
      return await api.get(`/orders/user/${userId}`);
    } catch (error) {
      console.error('Get orders by user ID failed:', error);
      throw error;
    }
  },

  // Get order statistics by user ID (admin only)
  getOrderStatsByUserId: async (userId) => {
    try {
      return await api.get(`/orders/user/${userId}/stats`);
    } catch (error) {
      console.error('Get order stats by user ID failed:', error);
      throw error;
    }
  },

  // Get order by ID
  getOrderById: async (id) => {
    try {
      return await api.get(`/orders/${id}`);
    } catch (error) {
      console.error('Get order failed:', error);
      throw error;
    }
  },

  // Update order
  updateOrder: async (id, orderData) => {
    try {
      return await api.patch(`/orders/${id}`, orderData);
    } catch (error) {
      console.error('Update order failed:', error);
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (id, status) => {
    try {
      return await api.patch(`/orders/${id}/status`, { status });
    } catch (error) {
      console.error('Update order status failed:', error);
      throw error;
    }
  },

  // Delete order
  deleteOrder: async (id) => {
    try {
      return await api.delete(`/orders/${id}`);
    } catch (error) {
      console.error('Delete order failed:', error);
      throw error;
    }
  }
};
