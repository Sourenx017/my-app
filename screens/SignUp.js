import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import FormItem from '../components/controls/FormItem';
import Wrapper from '../components/layout/Wrapper';
import Header from '../components/layout/Header';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const navigation = useNavigation();

  return (
    <Wrapper>
      <Header title="Welcome" />
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Sign Up to Get Started</Text>
        <FormItem label={"Name"} />
        <FormItem label={"Email"} />
        <FormItem label={"Password"} />
        <Button title="Sign Up" onPress={() => navigation.navigate('Welcome')} />
      </View>
    </Wrapper>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
