import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Button from '../components/controls/Button';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import { AuthService } from '../services/api';
import { ProductsService, UsersService, OrdersService, ProfilesService, RolesService } from '../services/apiExtended';

export default function APITestScreen({ navigation }) {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef(null);

  // Datos por defecto para las pruebas
  const defaultData = {
    user: {
      email: 'test@example.com',
      password: 'test123',
      name: 'Usuario de Prueba'
    },
    product: {
      name: 'Seiko Classic Watch',
      description: 'Elegante reloj clásico de la marca Seiko',
      price: 299.99,
      category: 'classic',
      stock: 50,
      imageUrl: 'https://example.com/seiko-classic.jpg'
    },
    order: {
      items: [
        {
          productId: '507f1f77bcf86cd799439011',
          quantity: 2,
          price: 299.99
        }
      ],
      totalAmount: 599.98,
      shippingAddress: {
        street: '123 Calle Principal',
        city: 'Ciudad de México',
        state: 'CDMX',
        zipCode: '01000',
        country: 'México'
      }
    },
    profile: {
      name: 'Usuario Actualizado',
      address: '456 Nueva Dirección',
      phone: '+52 55 1234 5678'
    },
    role: {
      name: 'customer',
      description: 'Cliente regular de la tienda',
      permissions: ['read_products', 'create_orders']
    }
  };

  const addLog = (type, endpoint, data, success = true) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = {
      id: Date.now(),
      timestamp,
      type,
      endpoint,
      data,
      success
    };
    
    setLogs(prevLogs => [logEntry, ...prevLogs]);
    
    // Auto-scroll hacia abajo
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  // Tests de autenticación
  const testRegister = async () => {
    setIsLoading(true);
    try {
      const response = await AuthService.register(
        defaultData.user.email,
        defaultData.user.password,
        defaultData.user.name
      );
      addLog('AUTH', 'POST /auth/register', response, true);
      Alert.alert('Éxito', 'Usuario registrado correctamente');
    } catch (error) {
      addLog('AUTH', 'POST /auth/register', { error: error.message }, false);
      Alert.alert('Error', `Error en registro: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testLogin = async () => {
    setIsLoading(true);
    try {
      const response = await AuthService.login(
        defaultData.user.email,
        defaultData.user.password
      );
      addLog('AUTH', 'POST /auth/login', response, true);
      Alert.alert('Éxito', 'Login exitoso');
    } catch (error) {
      addLog('AUTH', 'POST /auth/login', { error: error.message }, false);
      Alert.alert('Error', `Error en login: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Tests de productos
  const testCreateProduct = async () => {
    setIsLoading(true);
    try {
      const response = await ProductsService.create(defaultData.product);
      addLog('PRODUCTS', 'POST /products', response, true);
      Alert.alert('Éxito', 'Producto creado correctamente');
    } catch (error) {
      addLog('PRODUCTS', 'POST /products', { error: error.message }, false);
      Alert.alert('Error', `Error creando producto: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testGetProducts = async () => {
    setIsLoading(true);
    try {
      const response = await ProductsService.getAll();
      addLog('PRODUCTS', 'GET /products', { count: response.length, products: response }, true);
      Alert.alert('Éxito', `Se obtuvieron ${response.length} productos`);
    } catch (error) {
      addLog('PRODUCTS', 'GET /products', { error: error.message }, false);
      Alert.alert('Error', `Error obteniendo productos: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Tests de usuarios
  const testGetUsers = async () => {
    setIsLoading(true);
    try {
      const response = await UsersService.getAll();
      addLog('USERS', 'GET /users', { count: response.length, users: response }, true);
      Alert.alert('Éxito', `Se obtuvieron ${response.length} usuarios`);
    } catch (error) {
      addLog('USERS', 'GET /users', { error: error.message }, false);
      Alert.alert('Error', `Error obteniendo usuarios: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Tests de órdenes
  const testCreateOrder = async () => {
    setIsLoading(true);
    try {
      const response = await OrdersService.create(defaultData.order);
      addLog('ORDERS', 'POST /orders', response, true);
      Alert.alert('Éxito', 'Orden creada correctamente');
    } catch (error) {
      addLog('ORDERS', 'POST /orders', { error: error.message }, false);
      Alert.alert('Error', `Error creando orden: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testGetOrders = async () => {
    setIsLoading(true);
    try {
      const response = await OrdersService.getAll();
      addLog('ORDERS', 'GET /orders', { count: response.length, orders: response }, true);
      Alert.alert('Éxito', `Se obtuvieron ${response.length} órdenes`);
    } catch (error) {
      addLog('ORDERS', 'GET /orders', { error: error.message }, false);
      Alert.alert('Error', `Error obteniendo órdenes: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Tests de perfiles
  const testGetProfile = async () => {
    setIsLoading(true);
    try {
      const response = await ProfilesService.getMyProfile();
      addLog('PROFILES', 'GET /profiles/me', response, true);
      Alert.alert('Éxito', 'Perfil obtenido correctamente');
    } catch (error) {
      addLog('PROFILES', 'GET /profiles/me', { error: error.message }, false);
      Alert.alert('Error', `Error obteniendo perfil: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Tests de roles
  const testCreateRole = async () => {
    setIsLoading(true);
    try {
      const response = await RolesService.create(defaultData.role);
      addLog('ROLES', 'POST /roles', response, true);
      Alert.alert('Éxito', 'Rol creado correctamente');
    } catch (error) {
      addLog('ROLES', 'POST /roles', { error: error.message }, false);
      Alert.alert('Error', `Error creando rol: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testGetRoles = async () => {
    setIsLoading(true);
    try {
      const response = await RolesService.getAll();
      addLog('ROLES', 'GET /roles', { count: response.length, roles: response }, true);
      Alert.alert('Éxito', `Se obtuvieron ${response.length} roles`);
    } catch (error) {
      addLog('ROLES', 'GET /roles', { error: error.message }, false);
      Alert.alert('Error', `Error obteniendo roles: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Test completo de flujo
  const testCompleteFlow = async () => {
    setIsLoading(true);
    addLog('FLOW', 'INICIANDO FLUJO COMPLETO', { message: 'Ejecutando todas las pruebas...' }, true);
    
    try {
      // 1. Registro
      await testRegister();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 2. Login
      await testLogin();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 3. Obtener productos
      await testGetProducts();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 4. Obtener usuarios
      await testGetUsers();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 5. Obtener roles
      await testGetRoles();
      
      addLog('FLOW', 'FLUJO COMPLETO TERMINADO', { message: 'Todas las pruebas completadas' }, true);
      Alert.alert('Éxito', 'Flujo completo de pruebas terminado');
    } catch (error) {
      addLog('FLOW', 'FLUJO COMPLETO FALLÓ', { error: error.message }, false);
      Alert.alert('Error', `Falló el flujo completo: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>🧪 Pruebas de API NestJS</Text>
          <Text style={styles.subtitle}>
            Prueba todas las funcionalidades del backend con datos predeterminados
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔐 Autenticación</Text>
          <View style={styles.buttonRow}>
            <Button
              type="primary"
              label="Registrar Usuario"
              onPress={testRegister}
              style={[styles.testButton, { flex: 1, marginRight: 5 }]}
              disabled={isLoading}
            />
            <Button
              type="secondary"
              label="Login"
              onPress={testLogin}
              style={[styles.testButton, { flex: 1, marginLeft: 5 }]}
              disabled={isLoading}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📦 Productos</Text>
          <View style={styles.buttonRow}>
            <Button
              type="primary"
              label="Crear Producto"
              onPress={testCreateProduct}
              style={[styles.testButton, { flex: 1, marginRight: 5 }]}
              disabled={isLoading}
            />
            <Button
              type="secondary"
              label="Obtener Productos"
              onPress={testGetProducts}
              style={[styles.testButton, { flex: 1, marginLeft: 5 }]}
              disabled={isLoading}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👥 Usuarios</Text>
          <Button
            type="secondary"
            label="Obtener Usuarios"
            onPress={testGetUsers}
            style={styles.testButton}
            disabled={isLoading}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛒 Órdenes</Text>
          <View style={styles.buttonRow}>
            <Button
              type="primary"
              label="Crear Orden"
              onPress={testCreateOrder}
              style={[styles.testButton, { flex: 1, marginRight: 5 }]}
              disabled={isLoading}
            />
            <Button
              type="secondary"
              label="Obtener Órdenes"
              onPress={testGetOrders}
              style={[styles.testButton, { flex: 1, marginLeft: 5 }]}
              disabled={isLoading}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👤 Perfil</Text>
          <Button
            type="secondary"
            label="Obtener Mi Perfil"
            onPress={testGetProfile}
            style={styles.testButton}
            disabled={isLoading}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔑 Roles</Text>
          <View style={styles.buttonRow}>
            <Button
              type="primary"
              label="Crear Rol"
              onPress={testCreateRole}
              style={[styles.testButton, { flex: 1, marginRight: 5 }]}
              disabled={isLoading}
            />
            <Button
              type="secondary"
              label="Obtener Roles"
              onPress={testGetRoles}
              style={[styles.testButton, { flex: 1, marginLeft: 5 }]}
              disabled={isLoading}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚀 Prueba Completa</Text>
          <Button
            type="info"
            label="Ejecutar Flujo Completo"
            onPress={testCompleteFlow}
            style={styles.testButton}
            disabled={isLoading}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.logHeader}>
            <Text style={styles.sectionTitle}>📋 Logs de Pruebas</Text>
            <TouchableOpacity onPress={clearLogs} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Limpiar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Sistema de Logs */}
      <View style={styles.logsContainer}>
        <ScrollView 
          ref={scrollViewRef}
          style={styles.logsScrollView}
          showsVerticalScrollIndicator={true}
        >
          {logs.length === 0 ? (
            <Text style={styles.noLogsText}>No hay logs disponibles</Text>
          ) : (
            logs.map((log) => (
              <View
                key={log.id}
                style={[
                  styles.logEntry,
                  { backgroundColor: log.success ? '#d4edda' : '#f8d7da' }
                ]}
              >
                <View style={styles.logEntryHeader}>
                  <Text style={styles.logType}>{log.type}</Text>
                  <Text style={styles.logTimestamp}>{log.timestamp}</Text>
                </View>
                <Text style={styles.logEndpoint}>{log.endpoint}</Text>
                <Text style={styles.logData}>
                  {JSON.stringify(log.data, null, 2)}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background || '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: Colors.primary || '#007bff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
  },
  section: {
    margin: 15,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.darkGray || '#333',
  },
  buttonRow: {
    flexDirection: 'row',
  },
  testButton: {
    marginBottom: 10,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  logsContainer: {
    height: 200,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
  },
  logsScrollView: {
    flex: 1,
    padding: 10,
  },
  noLogsText: {
    textAlign: 'center',
    color: '#6c757d',
    fontStyle: 'italic',
    marginTop: 20,
  },
  logEntry: {
    padding: 10,
    marginBottom: 8,
    borderRadius: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
  },
  logEntryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  logType: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#495057',
  },
  logTimestamp: {
    fontSize: 10,
    color: '#6c757d',
  },
  logEndpoint: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#007bff',
    marginBottom: 5,
  },
  logData: {
    fontSize: 10,
    color: '#495057',
    fontFamily: 'monospace',
  },
});
