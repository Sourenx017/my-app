import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { useCart } from '../../context/CartContext';

export default function ShippingOptions() {
  const { SHIPPING_OPTIONS, selectedShipping, setSelectedShipping } = useCart();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shipping Options</Text>
      
      {SHIPPING_OPTIONS.map(option => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.optionContainer,
            selectedShipping.id === option.id && styles.selectedOption
          ]}
          onPress={() => setSelectedShipping(option)}
        >
          <View style={styles.optionDetails}>
            <Text style={styles.optionName}>{option.name}</Text>
            <Text style={styles.deliveryTime}>{option.deliveryDays}</Text>
          </View>
          <Text style={styles.optionPrice}>
            {option.price === 0 ? 'FREE' : `$${option.price.toFixed(2)}`}
          </Text>
        </TouchableOpacity>
      ))}
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
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: Colors.inputBackground,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  selectedOption: {
    backgroundColor: Colors.lightGray,
    borderColor: Colors.gray,
  },
  optionDetails: {
    flex: 1,
  },
  optionName: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.bold,
    color: Colors.darkGray,
  },
  deliveryTime: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.family.regular,
    color: Colors.gray,
    marginTop: 3,
  },
  optionPrice: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.bold,
    color: Colors.darkGray,
  },
});