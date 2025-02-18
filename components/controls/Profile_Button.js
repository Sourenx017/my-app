import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../../context/ProfileContext';

export default function ProfileButton() {
  const navigation = useNavigation();
  const { profile } = useProfile();

  const handlePress = () => {
    if (!profile) {
      navigation.navigate('Welcome');
    } else {
      navigation.navigate('Profile');
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Image 
        source={require('../../assets/picture_profile.jpg')} 
        style={styles.profileImage}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
});
