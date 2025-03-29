import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Alert } from 'react-native';
import BottomNav from '../components/layout/BottomNav';
import CartItem from '../components/controls/CartItem';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import { useCart } from '../context/CartContext';
import Button from '../components/controls/Button';
import ShippingOptions from '../components/controls/ShippingOptions';
import PromoCodeInput from '../components/controls/PromoCodeInput';
import { useProfile } from '../context/ProfileContext';
import FormItem from '../components/controls/FormItem';

export default function Cart({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      gestureEnabled: false,
    });
  }, [navigation]);

  const { profile } = useProfile();
  const { 
    cartItems, 
    getSubtotal, 
    getTotal,
    getDiscount,
    getShippingCost,
    placeOrder
  } = useCart();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: profile?.name || '',
    address: profile?.address || '',
    city: '',
    zipCode: '',
    country: 'United States',
  });
  
  const [paymentMethod, setPaymentMethod] = useState('credit_card'); // Simple placeholder for payment method

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart Empty', 'Please add items to your cart before checking out.');
      return;
    }
    
    setIsCheckingOut(true);
  };

  const handlePlaceOrder = async () => {
    // In a real app, this would process the payment through a gateway
    try {
      // Simulate payment processing
      const paymentDetails = {
        method: paymentMethod,
        timestamp: new Date().toISOString(),
      };
      
      // Place the order
      const newOrder = await placeOrder(paymentDetails, shippingAddress);
      
      // Navigate to confirmation or order history
      Alert.alert(
        'Order Placed!', 
        `Your order #${newOrder.id.slice(0, 8)} has been placed successfully.`,
        [
          { 
            text: 'View My Orders', 
            onPress: () => navigation.navigate('OrderHistory') 
          },
          { 
            text: 'Continue Shopping', 
            onPress: () => navigation.navigate('Home')
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'There was an error processing your order. Please try again.');
    }
  };

  const renderOrderSummary = () => (
    <View style={styles.orderSummaryContainer}>
      <Text style={styles.summaryTitle}>Order Summary</Text>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Subtotal:</Text>
        <Text style={styles.summaryValue}>${getSubtotal().toFixed(2)}</Text>
      </View>
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Shipping:</Text>
        <Text style={styles.summaryValue}>
          {getShippingCost() === 0 ? 'FREE' : `$${getShippingCost().toFixed(2)}`}
        </Text>
      </View>
      
      {getDiscount() > 0 && (
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Discount:</Text>
          <Text style={[styles.summaryValue, styles.discountValue]}>
            -${getDiscount().toFixed(2)}
          </Text>
        </View>
      )}
      
      <View style={[styles.summaryRow, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>${getTotal()}</Text>
      </View>
    </View>
  );

  const renderShippingForm = () => (
    <View style={styles.shippingFormContainer}>
      <Text style={styles.sectionTitle}>Shipping Information</Text>
      <FormItem
        label="Full Name"
        value={shippingAddress.fullName}
        onChangeText={(text) => setShippingAddress({...shippingAddress, fullName: text})}
      />
      <FormItem
        label="Address"
        value={shippingAddress.address}
        onChangeText={(text) => setShippingAddress({...shippingAddress, address: text})}
        multiline
      />
      <FormItem
        label="City"
        value={shippingAddress.city}
        onChangeText={(text) => setShippingAddress({...shippingAddress, city: text})}
      />
      <FormItem
        label="ZIP Code"
        value={shippingAddress.zipCode}
        onChangeText={(text) => setShippingAddress({...shippingAddress, zipCode: text})}
      />
      <FormItem
        label="Country"
        value={shippingAddress.country}
        onChangeText={(text) => setShippingAddress({...shippingAddress, country: text})}
      />
    </View>
  );

  const renderPaymentSection = () => (
    <View style={styles.paymentContainer}>
      <Text style={styles.sectionTitle}>Payment Method</Text>
      <Text style={styles.paymentNote}>
        For demonstration purposes, payment processing is simulated.
        In a real application, this would integrate with Stripe, PayPal, or another payment gateway.
      </Text>
      
      <Button 
        label="Place Order" 
        type="primary"
        onPress={handlePlaceOrder}
        style={styles.placeOrderButton}
      />
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.emptyCart}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Button
            label="Continue Shopping"
            type="secondary"
            onPress={() => navigation.navigate('Home')}
            style={styles.continueShopping}
          />
        </View>
        <BottomNav navigation={navigation} currentScreen="Cart" />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      {!isCheckingOut ? (
        <>
          <ScrollView style={styles.content}>
            <FlatList
              data={cartItems}
              renderItem={({ item }) => <CartItem item={item} />}
              keyExtractor={item => item.id}
              style={styles.list}
              scrollEnabled={false}
              nestedScrollEnabled={true}
            />
            
            <ShippingOptions />
            <PromoCodeInput />
            {renderOrderSummary()}

            <Button 
              label="Proceed to Checkout" 
              type="primary"
              onPress={handleCheckout}
              style={styles.checkoutButton}
            />
          </ScrollView>
        </>
      ) : (
        <ScrollView style={styles.content}>
          {renderShippingForm()}
          <ShippingOptions />
          <PromoCodeInput />
          {renderOrderSummary()}
          {renderPaymentSection()}
          
          <Button 
            label="Back to Cart" 
            type="secondary"
            onPress={() => setIsCheckingOut(false)}
            style={styles.backButton}
          />
        </ScrollView>
      )}
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
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: Fonts.size.normal,
    color: Colors.gray,
    fontFamily: Fonts.family.regular,
    marginBottom: 20,
  },
  continueShopping: {
    width: '80%',
  },
  orderSummaryContainer: {
    backgroundColor: Colors.white,
    padding: 16,
    marginVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  summaryTitle: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.bold,
    color: Colors.darkGray,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  summaryLabel: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.regular,
    color: Colors.gray,
  },
  summaryValue: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.bold,
    color: Colors.darkGray,
  },
  discountValue: {
    color: '#4CAF50',
  },
  totalRow: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: Fonts.size.large,
    fontFamily: Fonts.family.bold,
    color: Colors.darkGray,
  },
  totalValue: {
    fontSize: Fonts.size.large,
    fontFamily: Fonts.family.bold,
    color: Colors.darkGray,
  },
  checkoutButton: {
    marginVertical: 20,
  },
  shippingFormContainer: {
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  sectionTitle: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.bold,
    color: Colors.darkGray,
    marginBottom: 16,
  },
  paymentContainer: {
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  paymentNote: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.family.regular,
    color: Colors.gray,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  placeOrderButton: {
    marginTop: 16,
  },
  backButton: {
    marginVertical: 20,
  },
});
