import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform, StatusBar } from 'react-native';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import ProfileButton from '../components/controls/Profile_Button';
const ProductDetails = require('../screens/ProductDetails');
import Cart from '../screens/Cart';
import External from './External';
import Dashboard from './Dashboard';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import Welcome from '../screens/Welcome';
import { useProfile } from '../context/ProfileContext';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { profile } = useProfile();

  return (
    <Stack.Navigator 
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => <ProfileButton />,
        ...Platform.select({
          android: {
            headerStatusBarHeight: StatusBar.currentHeight,
          },
        }),
      }}
    >
      <Stack.Screen 
        name="Welcome" 
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Login" 
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ 
          title: "Seiko Watch Store",
        }}
      />
      <Stack.Screen 
        name="Profile" 
        component={Profile}
        options={{ 
          title: "My Profile",
        }}
      />
      <Stack.Screen 
        name="ProductDetails" 
        component={ProductDetails}
        options={({ route }) => ({ 
          title: route.params?.productName || 'Product Details',
        })}
      />
      <Stack.Screen 
        name="Cart" 
        component={Cart}
        options={{
          title: "Shopping Cart",
        }}
      />
    </Stack.Navigator>
  );
}
