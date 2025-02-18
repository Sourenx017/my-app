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
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
    width: '100%',
  },
  primary: {
    backgroundColor: Colors.darkGray,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  secondary: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.darkGray,
  },
  addToCart: {
    backgroundColor: Colors.darkGray,
    paddingVertical: 15,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
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
