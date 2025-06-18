import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import Button from "../components/controls/Button";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import { useProfile } from "../context/ProfileContext";
import { signupWithEmailAndPassword } from "../services/firebase-service";

export default function SignUp({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setProfile } = useProfile();

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password should be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signupWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Save user profile data
      const newProfile = {
        name,
        email: user.email,
        uid: user.uid,
        emailVerified: user.emailVerified,
        address: "",
        phone: "",
      };

      setProfile(newProfile);
      alert("Registration successful! You can now log in.");
      navigation.navigate("Login");
    } catch (error) {
      // Error handling is already done in the service
      console.log("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/seiko.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Account</Text>

          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor={Colors.gray}
            value={name}
            onChangeText={setName}
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={Colors.gray}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={Colors.gray}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />

          {loading ? (
            <ActivityIndicator
              size="large"
              color={Colors.primary}
              style={styles.loader}
            />
          ) : (
            <Button
              type="primary"
              label="Create Account"
              onPress={handleSignUp}
              style={styles.signUpButton}
            />
          )}

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <Button
              type="secondary"
              label="Login"
              onPress={() => navigation.navigate("Login")}
              style={styles.loginButton}
              disabled={loading}
            />
          </View>
        </View>
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
    backgroundColor: Colors.white,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 80,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: Fonts.size.large,
    fontFamily: Fonts.family.bold,
    color: Colors.darkGray,
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    height: 55,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.regular,
    color: Colors.darkGray,
  },
  signUpButton: {
    marginTop: 10,
    backgroundColor: Colors.darkGray,
  },
  loginContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  loginText: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.regular,
    color: Colors.gray,
    marginBottom: 10,
  },
  loginButton: {
    width: "100%",
    borderColor: Colors.darkGray,
  },
});
