import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import ProfileButton from "../controls/Profile_Button";

export default function Header({ title, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../../assets/seiko.png")} />
      </View>
      <View style={styles.profileContainer}>
        <ProfileButton onPress={() => navigation.navigate('Profile')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 30,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  logo: {
    height: 100,
    width: 100,
  },
  logoContainer: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    backgroundColor: Colors.white,
    borderColor: Colors.platinum,
    borderRadius: 20,
    borderWidth: 1,
    color: Colors.jet,
    fontFamily: Fonts.family.bold,
    fontSize: Fonts.size.normal,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  profileContainer: {
    position: 'absolute',
    right: 20,
    top: 40,
  },
});