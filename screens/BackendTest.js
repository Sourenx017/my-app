import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { AuthService } from '../services/api';
import { RolesService, ProfilesService, OrdersService } from '../services/apiExtended';
import api from '../services/axiosConfig';

const BackendTestScreen = () => {
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState([]);
  
  // Test credentials
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Test User');

  useEffect(() => {
    checkConnection();
    checkAuth();
  }, []);

  const checkConnection = async () => {
    try {
      const result = await api.get('/health');
      setConnectionStatus('connected');
      addTestResult('API Connection', 'SUCCESS', 'Backend API is reachable');
    } catch (error) {
      setConnectionStatus('error');
      addTestResult('API Connection', 'FAILED', error.message);
    }
  };

  const checkAuth = async () => {
    try {
      const authenticated = await AuthService.isAuthenticated();
      setIsAuthenticated(authenticated);
      addTestResult('Auth Check', authenticated ? 'AUTHENTICATED' : 'NOT_AUTHENTICATED', '');
    } catch (error) {
      addTestResult('Auth Check', 'ERROR', error.message);
    }
  };

  const addTestResult = (test, status, message) => {
    setTestResults(prev => [...prev, { test, status, message, time: new Date().toLocaleTimeString() }]);
  };

  const testRegister = async () => {
    setLoading(true);
    try {
      const result = await AuthService.register({
        email,
        password,
        name,
      });
      addTestResult('User Registration', 'SUCCESS', `User created: ${result.email || result.name}`);
    } catch (error) {
      addTestResult('User Registration', 'FAILED', error.message);
    }
    setLoading(false);
  };

  const testLogin = async () => {
    setLoading(true);
    try {
      const result = await AuthService.login(email, password);
      setIsAuthenticated(true);
      addTestResult('User Login', 'SUCCESS', `Token received: ${result.access_token ? 'YES' : 'NO'}`);
    } catch (error) {
      addTestResult('User Login', 'FAILED', error.message);
    }
    setLoading(false);
  };

  const testGetUsers = async () => {
    setLoading(true);
    try {
      const users = await api.get('/users');
      addTestResult('Get Users', 'SUCCESS', `Found ${users.length} users`);
    } catch (error) {
      addTestResult('Get Users', 'FAILED', error.message);
    }
    setLoading(false);
  };

  const testCreateProduct = async () => {
    setLoading(true);
    try {
      const product = await api.post('/products', {
        name: 'Test Watch',
        description: 'A beautiful test watch',
        price: 299.99,
        category: 'luxury',
        brand: 'TestBrand',
        stock: 10,
      });
      addTestResult('Create Product', 'SUCCESS', `Product created: ${product.name}`);
    } catch (error) {
      addTestResult('Create Product', 'FAILED', error.message);
    }
    setLoading(false);
  };

  const testGetProducts = async () => {
    setLoading(true);
    try {
      const products = await api.get('/products');
      addTestResult('Get Products', 'SUCCESS', `Found ${products.length} products`);
    } catch (error) {
      addTestResult('Get Products', 'FAILED', error.message);
    }
    setLoading(false);
  };

  const testCreateRole = async () => {
    setLoading(true);
    try {
      const role = await RolesService.createRole({
        name: 'Customer',
        description: 'Standard customer role',
        permissions: ['view_products', 'create_orders'],
      });
      addTestResult('Create Role', 'SUCCESS', `Role created: ${role.name}`);
    } catch (error) {
      addTestResult('Create Role', 'FAILED', error.message);
    }
    setLoading(false);
  };

  const testCreateProfile = async () => {
    setLoading(true);
    try {
      const profile = await ProfilesService.createProfile({
        firstName: 'Test',
        lastName: 'User',
        bio: 'This is a test user profile',
      });
      addTestResult('Create Profile', 'SUCCESS', `Profile created for user`);
    } catch (error) {
      addTestResult('Create Profile', 'FAILED', error.message);
    }
    setLoading(false);
  };

  const testCreateOrder = async () => {
    setLoading(true);
    try {
      // First get products to create an order
      const products = await api.get('/products');
      if (products.length === 0) {
        throw new Error('No products available to create order');
      }

      const product = products[0];
      const quantity = 1;
      const totalPrice = product.price * quantity;

      const order = await OrdersService.createOrder({
        items: [
          {
            productId: product._id,
            productName: product.name,
            quantity: quantity,
            price: product.price,
            totalPrice: totalPrice,
          },
        ],
        totalAmount: totalPrice,
        shippingAddress: '123 Test Street, Test City',
      });
      addTestResult('Create Order', 'SUCCESS', `Order created: ${order._id}`);
    } catch (error) {
      addTestResult('Create Order', 'FAILED', error.message);
    }
    setLoading(false);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const logout = async () => {
    await AuthService.logout();
    setIsAuthenticated(false);
    addTestResult('Logout', 'SUCCESS', 'User logged out');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Backend API Test</Text>
      
      {/* Connection Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>API Status:</Text>
        <Text style={[
          styles.statusText,
          { color: connectionStatus === 'connected' ? '#4CAF50' : '#F44336' }
        ]}>
          {connectionStatus.toUpperCase()}
        </Text>
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Auth Status:</Text>
        <Text style={[
          styles.statusText,
          { color: isAuthenticated ? '#4CAF50' : '#FF9800' }
        ]}>
          {isAuthenticated ? 'AUTHENTICATED' : 'NOT AUTHENTICATED'}
        </Text>
      </View>

      {/* Test Credentials */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Test Credentials</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
        />
      </View>

      {/* Test Buttons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>API Tests</Text>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={testRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Test Register</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={testLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Test Login</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, !isAuthenticated && styles.buttonDisabled]} 
          onPress={testGetUsers}
          disabled={loading || !isAuthenticated}
        >
          <Text style={styles.buttonText}>Test Get Users</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, !isAuthenticated && styles.buttonDisabled]} 
          onPress={testCreateProduct}
          disabled={loading || !isAuthenticated}
        >
          <Text style={styles.buttonText}>Test Create Product</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={testGetProducts}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Test Get Products</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, !isAuthenticated && styles.buttonDisabled]} 
          onPress={testCreateRole}
          disabled={loading || !isAuthenticated}
        >
          <Text style={styles.buttonText}>Test Create Role</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, !isAuthenticated && styles.buttonDisabled]} 
          onPress={testCreateProfile}
          disabled={loading || !isAuthenticated}
        >
          <Text style={styles.buttonText}>Test Create Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, !isAuthenticated && styles.buttonDisabled]} 
          onPress={testCreateOrder}
          disabled={loading || !isAuthenticated}
        >
          <Text style={styles.buttonText}>Test Create Order</Text>
        </TouchableOpacity>

        {isAuthenticated && (
          <TouchableOpacity 
            style={[styles.button, styles.logoutButton]} 
            onPress={logout}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Test Results */}
      <View style={styles.section}>
        <View style={styles.resultsHeader}>
          <Text style={styles.sectionTitle}>Test Results</Text>
          <TouchableOpacity onPress={clearResults} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#2196F3" />
            <Text style={styles.loadingText}>Running test...</Text>
          </View>
        )}

        {testResults.map((result, index) => (
          <View key={index} style={styles.resultItem}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultTest}>{result.test}</Text>
              <Text style={styles.resultTime}>{result.time}</Text>
            </View>
            <Text style={[
              styles.resultStatus,
              { color: result.status === 'SUCCESS' ? '#4CAF50' : '#F44336' }
            ]}>
              {result.status}
            </Text>
            {result.message ? (
              <Text style={styles.resultMessage}>{result.message}</Text>
            ) : null}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  logoutButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  clearButton: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 12,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  loadingText: {
    marginLeft: 8,
    color: '#666',
  },
  resultItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 12,
    marginBottom: 12,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultTest: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  resultTime: {
    fontSize: 12,
    color: '#666',
  },
  resultStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  resultMessage: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
  },
});

export default BackendTestScreen;
