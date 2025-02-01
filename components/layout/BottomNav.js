import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../controls/Button';
import Colors from '../../constants/Colors';

export default function BottomNav({ navigation, currentScreen }) {
  return (
    <View style={styles.bottomNav}>
      <Button 
        type={currentScreen === 'Home' ? 'primary' : 'secondary'}
        label="Home"
        onPress={() => navigation.navigate('Home')}
        style={styles.bottomButton}
      />
      <Button 
        type={currentScreen === 'Cart' ? 'primary' : 'secondary'}
        label="Cart"
        onPress={() => navigation.navigate('Cart')}
        style={styles.bottomButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
  },
  bottomButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});
