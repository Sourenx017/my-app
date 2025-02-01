import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
const ProductDetails = require('../screens/ProductDetails');
import Cart from '../screens/Cart';
import External from './External';
import Dashboard from './Dashboard';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ 
          title: 'Seiko Watch Store',
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
          headerTintColor: '#fff',
          headerLeft: () => null, // Hide back button
          headerBackVisible: false, // Hide back button space
        }} 
      />
      <Stack.Screen 
        name="ProductDetails" 
        component={ProductDetails}
        options={({ route }) => ({ 
          title: route.params?.productName || 'Detalle del Producto',
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
          headerTintColor: '#fff',
        })}
      />
      <Stack.Screen 
        name="Cart" 
        component={Cart}
        options={{
          title: 'Carrito de Compras',
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
          headerTintColor: '#fff',
          headerLeft: () => null, // Hide back button
          headerBackVisible: false, // Hide back button space
        }}
      />
      <Stack.Screen name="External" component={External} options={{ headerShown: false }} />
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
