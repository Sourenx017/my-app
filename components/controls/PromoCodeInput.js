import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { useCart } from '../../context/CartContext';

export default function PromoCodeInput() {
  const [codeInput, setCodeInput] = useState('');
  const [message, setMessage] = useState(null);
  const { promoCode, applyPromoCode, removePromoCode, appliedPromo } = useCart();

  const handleApplyCode = () => {
    if (!codeInput.trim()) {
      setMessage({ success: false, message: 'Please enter a promo code' });
      return;
    }

    const result = applyPromoCode(codeInput.trim().toUpperCase());
    setMessage(result);
    
    if (result.success) {
      setCodeInput('');
    }
  };

  const handleRemoveCode = () => {
    removePromoCode();
    setMessage(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Promo Code</Text>
      
      {!appliedPromo ? (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter promo code"
            value={codeInput}
            onChangeText={setCodeInput}
            autoCapitalize="characters"
          />
          <TouchableOpacity 
            style={styles.applyButton}
            onPress={handleApplyCode}
          >
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.appliedCodeContainer}>
          <View style={styles.appliedCodeInfo}>
            <Text style={styles.appliedCodeText}>{promoCode}</Text>
            <Text style={styles.appliedCodeDescription}>{appliedPromo.description}</Text>
          </View>
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={handleRemoveCode}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {message && (
        <Text style={[
          styles.message, 
          message.success ? styles.successMessage : styles.errorMessage
        ]}>
          {message.message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  title: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.bold,
    color: Colors.darkGray,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: Colors.inputBackground,
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.normal,
  },
  applyButton: {
    height: 45,
    backgroundColor: Colors.darkGray,
    borderRadius: 6,
    marginLeft: 10,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  applyButtonText: {
    color: Colors.white,
    fontFamily: Fonts.family.bold,
    fontSize: Fonts.size.normal,
  },
  message: {
    marginTop: 8,
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.small,
  },
  successMessage: {
    color: '#4CAF50',
  },
  errorMessage: {
    color: Colors.error,
  },
  appliedCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.inputBackground,
    padding: 12,
    borderRadius: 6,
  },
  appliedCodeInfo: {
    flex: 1,
  },
  appliedCodeText: {
    fontFamily: Fonts.family.bold,
    fontSize: Fonts.size.normal,
    color: Colors.darkGray,
  },
  appliedCodeDescription: {
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.small,
    color: Colors.gray,
    marginTop: 2,
  },
  removeButton: {
    padding: 8,
  },
  removeButtonText: {
    color: Colors.error,
    fontFamily: Fonts.family.bold,
    fontSize: Fonts.size.small,
  },
});