import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import { useCart } from '../context/CartContext';
import Button from '../components/controls/Button';
import BottomNav from '../components/layout/BottomNav';

// Helper function to format date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const OrderStatusBadge = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'processing':
        return '#FFB74D'; // Orange
      case 'shipped':
        return '#42A5F5'; // Blue
      case 'delivered':
        return '#4CAF50'; // Green
      case 'cancelled':
        return '#F44336'; // Red
      default:
        return Colors.gray;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'processing':
        return 'Processing';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
      <Text style={styles.statusText}>{getStatusText()}</Text>
    </View>
  );
};

const OrderItem = ({ order, onPress }) => {
  return (
    <TouchableOpacity style={styles.orderItem} onPress={onPress}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderId}>Order #{order.id.slice(0, 8)}</Text>
          <Text style={styles.orderDate}>{formatDate(order.date)}</Text>
        </View>
        <OrderStatusBadge status={order.status} />
      </View>
      
      <View style={styles.orderDetails}>
        <Text style={styles.orderItemCount}>
          {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
        </Text>
        <Text style={styles.orderTotal}>${order.total}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function OrderHistory({ navigation }) {
  const { orderHistory } = useCart();

  const handleViewOrderDetails = (order) => {
    // In a full implementation, this would navigate to a detailed order view
    // For now, we'll just show the details in an alert
    alert(`Order Details for #${order.id.slice(0, 8)}\n\nItems: ${order.items.map(item => `${item.name} x${item.quantity}`).join(', ')}\nTotal: $${order.total}`);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.content}>
        <Text style={styles.title}>My Orders</Text>
        
        {orderHistory.length > 0 ? (
          <FlatList
            data={orderHistory}
            renderItem={({ item }) => (
              <OrderItem 
                order={item} 
                onPress={() => handleViewOrderDetails(item)}
              />
            )}
            keyExtractor={item => item.id}
            style={styles.list}
          />
        ) : (
          <View style={styles.emptyOrdersContainer}>
            <Text style={styles.emptyOrdersText}>
              You haven't placed any orders yet.
            </Text>
            <Button
              label="Browse Products"
              type="secondary"
              onPress={() => navigation.navigate('Home')}
              style={styles.browseButton}
            />
          </View>
        )}
      </View>
      <BottomNav navigation={navigation} currentScreen="Profile" />
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
  title: {
    fontSize: Fonts.size.large,
    fontFamily: Fonts.family.bold,
    color: Colors.darkGray,
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  orderItem: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.bold,
    color: Colors.darkGray,
  },
  orderDate: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.family.regular,
    color: Colors.gray,
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.family.bold,
    color: Colors.white,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  orderItemCount: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.regular,
    color: Colors.gray,
  },
  orderTotal: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.bold,
    color: Colors.darkGray,
  },
  emptyOrdersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyOrdersText: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.regular,
    color: Colors.gray,
    marginBottom: 20,
  },
  browseButton: {
    width: '80%',
  },
});