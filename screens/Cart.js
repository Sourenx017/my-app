import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import BottomNav from '../components/layout/BottomNav';
import CartItem from '../components/controls/CartItem';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import { useCart } from '../context/CartContext';
import Button from '../components/controls/Button';

export default function Cart({ navigation }) {
  const { cartItems, getTotal } = useCart();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.content}>
        {cartItems.length > 0 ? (
          <>
            <FlatList
              data={cartItems}
              renderItem={({ item }) => <CartItem item={item} />}
              keyExtractor={item => item.id}
              style={styles.list}
            />
            <View style={styles.footer}>
              <Text style={styles.total}>Total: ${getTotal()}</Text>
              <Button 
                label="Checkout" 
                type="primary"
                onPress={() => {/* Implement checkout */}}
              />
            </View>
          </>
        ) : (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyText}>Your cart is empty</Text>
          </View>
        )}
      </View>
      <BottomNav navigation={navigation} currentScreen="Cart" />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  list: {
    flex: 1,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  total: {
    fontSize: Fonts.size.large,
    fontFamily: Fonts.family.bold,
    color: Colors.darkGray,
    marginBottom: 10,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: Fonts.size.normal,
    color: Colors.gray,
    fontFamily: Fonts.family.regular,
  },
});
