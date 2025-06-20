import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../components/controls/Button';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

export default function Welcome({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null, // This removes the back button
      gestureEnabled: false, // This prevents back gesture on iOS
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/seiko.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Watch Store</Text>
        <Text style={styles.subtitle}>
          Discover our exclusive collection of luxury watches
        </Text>
        
        <View style={styles.buttonContainer}>
          <Button 
            type="primary"
            label="Login"
            onPress={() => navigation.navigate('Login')}
            style={styles.button}
          />
          <Button 
            type="secondary"
            label="Create Account"
            onPress={() => navigation.navigate('SignUp')}
            style={styles.button}
          />          <Button 
            type="info"
            label="🧪 API Tests (Demo)"
            onPress={() => navigation.navigate('APITestScreen')}
            style={[styles.button, styles.apiTestButton]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 100,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: Fonts.size.xlarge,
    fontFamily: Fonts.family.bold,
    color: Colors.darkGray,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.regular,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    gap: 15,
  },
  button: {
    marginBottom: 15,
  },
  apiTestButton: {
    backgroundColor: Colors.info || '#17a2b8',
    marginTop: 20,
  },
});