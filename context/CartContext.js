import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

// Define shipping options
export const SHIPPING_OPTIONS = [
  { id: 'standard', name: 'Standard Shipping', price: 5.99, deliveryDays: '5-7 business days' },
  { id: 'express', name: 'Express Shipping', price: 12.99, deliveryDays: '2-3 business days' },
  { id: 'nextDay', name: 'Next Day Delivery', price: 19.99, deliveryDays: '1 business day' }
];

// Promo codes collection (in a real app, these would be stored on a server)
export const PROMO_CODES = {
  'WELCOME10': { description: 'Welcome discount', discount: 0.1, type: 'percentage' },
  'FREE_SHIP': { description: 'Free shipping', discount: 0, type: 'free_shipping' },
  'SAVE20': { description: '$20 off your order', discount: 20, type: 'fixed' }
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(SHIPPING_OPTIONS[0]);
  const [promoCode, setPromoCode] = useState(null);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);

  // Load order history from AsyncStorage on startup
  useEffect(() => {
    const loadOrderHistory = async () => {
      try {
        const savedHistory = await AsyncStorage.getItem('orderHistory');
        if (savedHistory) {
          setOrderHistory(JSON.parse(savedHistory));
        }
      } catch (error) {
        console.error('Error loading order history:', error);
      }
    };
    loadOrderHistory();
  }, []);

  const addToCart = (product, quantity = 1) => {
    setCartItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...currentItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(currentItems => 
      currentItems.filter(item => item.id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
  };

  const getDiscount = () => {
    if (!appliedPromo) return 0;
    
    const subtotal = getSubtotal();
    
    if (appliedPromo.type === 'percentage') {
      return subtotal * appliedPromo.discount;
    } else if (appliedPromo.type === 'fixed') {
      return appliedPromo.discount;
    }
    
    return 0;
  };

  const getShippingCost = () => {
    if (appliedPromo && appliedPromo.type === 'free_shipping') {
      return 0;
    }
    return selectedShipping.price;
  };
  
  const getTotal = () => {
    const subtotal = getSubtotal();
    const discount = getDiscount();
    const shippingCost = getShippingCost();
    
    return (subtotal - discount + shippingCost).toFixed(2);
  };

  const applyPromoCode = (code) => {
    const promoDetails = PROMO_CODES[code];
    if (promoDetails) {
      setPromoCode(code);
      setAppliedPromo(promoDetails);
      return { success: true, message: `${promoDetails.description} applied!` };
    } else {
      return { success: false, message: 'Invalid promo code' };
    }
  };

  const removePromoCode = () => {
    setPromoCode(null);
    setAppliedPromo(null);
  };

  const placeOrder = async (paymentDetails, shippingAddress) => {
    // Create a new order
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: [...cartItems],
      subtotal: getSubtotal().toFixed(2),
      discount: getDiscount().toFixed(2),
      shipping: {
        method: selectedShipping,
        cost: getShippingCost().toFixed(2),
        address: shippingAddress
      },
      total: getTotal(),
      payment: paymentDetails,
      status: 'processing',
    };

    // Update order history
    const updatedHistory = [newOrder, ...orderHistory];
    setOrderHistory(updatedHistory);
    
    // Save to AsyncStorage
    try {
      await AsyncStorage.setItem('orderHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error saving order history:', error);
    }
    
    // Clear cart after successful order
    setCartItems([]);
    removePromoCode();
    
    return newOrder;
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      getSubtotal,
      getTotal,
      getDiscount,
      getShippingCost,
      selectedShipping,
      setSelectedShipping,
      promoCode,
      appliedPromo,
      applyPromoCode,
      removePromoCode,
      orderHistory,
      placeOrder,
      SHIPPING_OPTIONS
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
