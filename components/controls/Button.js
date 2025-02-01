import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default function Button({ onPress, label, type, disabled, style }) {
  return (
    <TouchableOpacity 
      style={[styles.button, styles[type], disabled && styles.disabled, style]} 
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, styles[`${type}Text`]]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  primary: {
    backgroundColor: Colors.darkGray,
  },
  secondary: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.darkGray,
  },
  addToCart: {
    backgroundColor: Colors.darkGray,
    paddingVertical: 15,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryText: {
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.darkGray,
  },
  addToCartText: {
    color: Colors.white,
    fontSize: 18,
  },
});
