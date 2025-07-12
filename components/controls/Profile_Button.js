import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useProfile } from "../../context/ProfileContext";

export default function ProfileButton() {
  const navigation = useNavigation();
  const { profile, isAuthenticated } = useProfile();

  const handlePress = () => {
    if (!isAuthenticated) {
      navigation.navigate("Welcome");
    } else {
      navigation.navigate("Profile");
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Image
        source={
          profile?.photoUrl
            ? { uri: profile.photoUrl }
            : require("../../assets/picture_profile.jpg")
        }
        style={[
          styles.profileImage,
          isAuthenticated && styles.profileImageAuthenticated,
        ]}
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
  profileImageAuthenticated: {
    borderColor: Colors.success || "#28a745",
  },
});
