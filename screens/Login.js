import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Keyboard,
} from "react-native";
import Button from "../components/controls/Button";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import { useProfile } from "../context/ProfileContext";

export default function Login({ navigation }) {
  // Estado para el formulario y validación
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const { login } = useProfile();

  // Manejar el login
  const handleInputChange = useCallback((field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setFormErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  }, []);

  // Validar el formulario cuando los datos cambian
  useEffect(() => {
    const validateForm = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmailValid =
        formData.email.trim() !== "" && emailRegex.test(formData.email);
      const isPasswordValid = formData.password.length >= 6;

      setIsFormValid(isEmailValid && isPasswordValid);
    };

    validateForm();
  }, [formData]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      Keyboard.dismiss();

      await login(formData.email, formData.password);
      navigation.replace("Home");
    } catch (error) {
      Alert.alert(
        "Error en el Login",
        error.message ||
          "Por favor verifica tus credenciales y vuelve a intentarlo."
      );
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
          <Text style={styles.title}>Welcome Back</Text>

          <TextInput
            style={[styles.input, formErrors.email ? styles.inputError : null]}
            placeholder="Email"
            placeholderTextColor={Colors.gray}
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
          {formErrors.email ? (
            <Text style={styles.errorText}>{formErrors.email}</Text>
          ) : null}

          <TextInput
            style={[
              styles.input,
              formErrors.password ? styles.inputError : null,
            ]}
            placeholder="Password"
            placeholderTextColor={Colors.gray}
            value={formData.password}
            onChangeText={(value) => handleInputChange("password", value)}
            secureTextEntry
            editable={!loading}
          />
          {formErrors.password ? (
            <Text style={styles.errorText}>{formErrors.password}</Text>
          ) : null}

          {loading ? (
            <ActivityIndicator
              size="large"
              color={Colors.primary}
              style={styles.loader}
            />
          ) : (
            <Button
              type="primary"
              label="Login"
              onPress={handleLogin}
              style={styles.loginButton}
              disabled={!isFormValid}
            />
          )}

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <Button
              type="secondary"
              label="Create Account"
              onPress={() => navigation.navigate("SignUp")}
              style={styles.signUpButton}
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
  inputError: {
    borderColor: Colors.error,
  },
  loginButton: {
    marginTop: 10,
    backgroundColor: Colors.darkGray,
  },
  signUpContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  signUpText: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.regular,
    color: Colors.gray,
    marginBottom: 10,
  },
  signUpButton: {
    width: "100%",
    borderColor: Colors.darkGray,
  },
  errorText: {
    color: Colors.error,
    fontSize: Fonts.size.small,
    fontFamily: Fonts.family.regular,
    marginBottom: 10,
    marginTop: -10,
  },
  loader: {
    marginVertical: 20,
  },
});
