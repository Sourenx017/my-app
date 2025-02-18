import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useProfile } from '../context/ProfileContext';
import Button from '../components/controls/Button';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

export default function Profile({ navigation }) {
  const { profile, setProfile } = useProfile();

  const handleLogout = () => {
    setProfile(null);
    navigation.replace('Welcome');
  };

  if (!profile) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.message}>Please sign in to view your profile</Text>
          <Button 
            type="primary"
            label="Go to Login"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.profileInfo}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/picture_profile.jpg')}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.title}>My Profile</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.info}>{profile.name}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.info}>{profile.email}</Text>
          </View>
        </View>
        <Button 
          type="primary"
          label="Logout"
          onPress={handleLogout}
          style={styles.logoutButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  profileInfo: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  imageContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: Colors.darkGray,
  },
  title: {
    fontSize: Fonts.size.large,
    fontFamily: Fonts.family.bold,
    color: Colors.darkGray,
    marginBottom: 30,
  },
  infoContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 30,
    marginBottom: 15,
  },
  label: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.bold,
    color: Colors.darkGray,
    width: 80,
  },
  info: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.regular,
    color: Colors.gray,
    flex: 1,
  },
  message: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.regular,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: 20,
  },
  logoutButton: {
    width: '100%',
    backgroundColor: Colors.darkGray,
  },
});