import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform, StatusBar, TouchableOpacity, Text } from "react-native";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import ProfileButton from "../components/controls/Profile_Button";
import AdminProducts from "../screens/AdminProducts";
const ProductDetails = require("../screens/ProductDetails");
import Cart from "../screens/Cart";
import OrderHistory from "../screens/OrderHistory";
import External from "./External";
import Dashboard from "./Dashboard";
import SignUp from "../screens/SignUp";
import Login from "../screens/Login";
import Welcome from "../screens/Welcome";
import BackendTest from "../screens/BackendTest";
import APITestScreen from "../screens/APITestScreen";
import { useProfile } from "../context/ProfileContext";
import Colors from "../constants/Colors";

const Stack = createNativeStackNavigator();

function AdminButton({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("AdminProducts")}
      style={{ marginRight: 10 }}
    >
      <Text style={{ color: Colors.white }}>Admin</Text>
    </TouchableOpacity>
  );
}

export default function AppNavigator() {
  const { profile, currentUser } = useProfile();
  const isAdmin = profile?.role === "admin" || currentUser?.role === "admin";

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: "#1a1a1a",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerRight: () => (
          <>
            {isAdmin && <AdminButton navigation={navigation} />}
            <ProfileButton />
          </>
        ),
        ...Platform.select({
          android: {
            headerStatusBarHeight: StatusBar.currentHeight,
          },
        }),
      })}
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
        options={{ title: "Seiko Watch Store" }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: "My Profile" }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={({ route }) => ({
          title: route.params?.productName || "Product Details",
        })}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ title: "Shopping Cart" }}
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{ title: "Order History" }}
      />
      {isAdmin && (
        <Stack.Screen
          name="AdminProducts"
          component={AdminProducts}
          options={{
            title: "Administrar Productos",
            headerStyle: {
              backgroundColor: Colors.primary || "#007bff",
            },
          }}
        />
      )}
      <Stack.Screen
        name="BackendTest"
        component={BackendTest}
        options={{ title: "Backend API Test" }}
      />
      <Stack.Screen
        name="APITestScreen"
        component={APITestScreen}
        options={{ title: "🧪 API Testing Suite" }}
      />
    </Stack.Navigator>
  );
}
