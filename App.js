import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation';
import { CartProvider } from './context/CartContext';
import { ProfileProvider } from './context/ProfileContext';
import { 
  useFonts,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.root}>
      <ProfileProvider>
        <CartProvider>
          <NavigationContainer>
            <View style={styles.container}>
              <StatusBar 
                style="light" 
                backgroundColor="#000000"
              />
              <AppNavigator />
            </View>
          </NavigationContainer>
        </CartProvider>
      </ProfileProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});